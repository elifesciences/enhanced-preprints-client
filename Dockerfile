ARG node_version=20.19-alpine3.19

FROM --platform=$BUILDPLATFORM node:${node_version} AS build
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY .yarn/releases .yarn/releases
COPY package.json yarn.lock .yarnrc.yml .env.yarn ./
RUN yarn

FROM --platform=$BUILDPLATFORM build AS production_build
COPY . .
RUN yarn build

FROM --platform=$TARGETPLATFORM node:${node_version} AS platform_deps
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=build /opt/epp-client/.yarn/releases .yarn/releases
COPY --from=build /opt/epp-client/.yarn/cache .yarn/cache
COPY --from=build /opt/epp-client/.yarnrc.yml .yarnrc.yml
COPY --from=build /opt/epp-client/.env.yarn .env.yarn
COPY --from=build /opt/epp-client/.yarn/releases .yarn/releases
COPY --from=build /opt/epp-client/package.json package.json
COPY --from=build /opt/epp-client/yarn.lock yarn.lock
RUN yarn

FROM --platform=$TARGETPLATFORM node:${node_version} AS production_deps
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=build /opt/epp-client/.yarn/releases .yarn/releases
COPY --from=build /opt/epp-client/.yarn/cache .yarn/cache
COPY --from=build /opt/epp-client/.yarnrc.yml .yarnrc.yml
COPY --from=build /opt/epp-client/.env.yarn .env.yarn
COPY --from=build /opt/epp-client/.yarn/releases .yarn/releases
COPY --from=build /opt/epp-client/package.json package.json
COPY --from=build /opt/epp-client/yarn.lock yarn.lock
# RUN yarn
RUN yarn workspaces focus --production


FROM platform_deps AS dev
COPY ./ ./
CMD [ "yarn", "start:dev" ]

FROM --platform=$TARGETPLATFORM node:${node_version} AS prod
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=production_deps /opt/epp-client/node_modules /opt/epp-client/node_modules
COPY --from=production_deps /opt/epp-client/package.json /opt/epp-client/package.json
COPY --from=production_build /opt/epp-client/.next /opt/epp-client/.next
COPY --from=production_build /opt/epp-client/next.config.js /opt/epp-client/next.config.js
CMD [ "./node_modules/.bin/next", "start" ]
