ARG node_version=20.13-alpine3.19

FROM --platform=$BUILDPLATFORM node:${node_version} as build
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY .yarnrc.yml .yarnrc.yml
COPY .env.yarn .env.yarn
COPY .yarn/releases .yarn/releases
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY ./ ./
RUN yarn
RUN yarn build

FROM --platform=$TARGETPLATFORM node:${node_version} as platform_deps
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

FROM --platform=$TARGETPLATFORM node:${node_version} as production_deps
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


FROM --platform=$TARGETPLATFORM node:${node_version} as base
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=platform_deps /opt/epp-client/node_modules /opt/epp-client/node_modules
COPY --from=build /opt/epp-client/.next /opt/epp-client/.next
COPY ./ ./

FROM base as dev
CMD [ "yarn", "start:dev" ]

FROM base as storybook
CMD [ "yarn", "storybook" ]

FROM --platform=$TARGETPLATFORM node:${node_version} as prod
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=production_deps /opt/epp-client/node_modules /opt/epp-client/node_modules
COPY --from=production_deps /opt/epp-client/package.json /opt/epp-client/package.json
COPY --from=build /opt/epp-client/.next /opt/epp-client/.next
CMD [ "yarn", "start" ]

FROM mcr.microsoft.com/playwright:focal as browser-tests
WORKDIR /opt/tests
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY playwright.config.ts playwright.config.ts
RUN yarn
CMD ["yarn", "test:browser"]
