ARG node_version=24.22-alpine3.22

FROM --platform=$BUILDPLATFORM node:${node_version} AS build
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
# Install the pnpm version pinned by packageManager in package.json.
RUN npm install --global "$(node -p "require('./package.json').packageManager")"
RUN pnpm install --frozen-lockfile --store-dir /pnpm-store

FROM --platform=$BUILDPLATFORM build AS production_build
COPY . .
RUN pnpm build

FROM --platform=$TARGETPLATFORM node:${node_version} AS platform_deps
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=build /pnpm-store /pnpm-store
COPY --from=build /opt/epp-client/package.json /opt/epp-client/pnpm-lock.yaml /opt/epp-client/pnpm-workspace.yaml ./
RUN npm install --global "$(node -p "require('./package.json').packageManager")"
RUN pnpm install --frozen-lockfile --prefer-offline --store-dir /pnpm-store

FROM --platform=$TARGETPLATFORM node:${node_version} AS production_deps
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=build /pnpm-store /pnpm-store
COPY --from=build /opt/epp-client/package.json /opt/epp-client/pnpm-lock.yaml /opt/epp-client/pnpm-workspace.yaml ./
RUN npm install --global "$(node -p "require('./package.json').packageManager")"
RUN pnpm install --frozen-lockfile --prod --prefer-offline --store-dir /pnpm-store


FROM platform_deps AS dev
COPY ./ ./
CMD [ "pnpm", "start:dev" ]

FROM --platform=$TARGETPLATFORM node:${node_version} AS prod
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=production_deps /opt/epp-client/node_modules /opt/epp-client/node_modules
COPY --from=production_deps /opt/epp-client/package.json /opt/epp-client/package.json
COPY --from=production_build /opt/epp-client/.next /opt/epp-client/.next
COPY --from=production_build /opt/epp-client/next.config.js /opt/epp-client/next.config.js
CMD [ "./node_modules/.bin/next", "start" ]
