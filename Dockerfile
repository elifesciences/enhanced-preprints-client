ARG node_version=18.18-alpine3.17@sha256:8cdc5ff72de424adca7217dfc9a6c4ab3f244673789243d0559a6204e0439a24
ARG bun_version=1.0.3-alpine@sha256:26ceedecb06836a118275a0ef3d8369aafe111020929cec762b02006ddf840de

FROM oven/bun:${bun_version} as builder
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY package.json package.json
RUN bun install

FROM node:${node_version} as base
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY --from=builder /opt/epp-client/node_modules /opt/epp-client/node_modules
COPY ./ ./

FROM base as dev
CMD [ "yarn", "start:dev" ]

FROM base as storybook
CMD [ "yarn", "storybook" ]

FROM base as prod
RUN yarn build
CMD [ "sh", "-c", "yarn build && yarn start" ]

FROM mcr.microsoft.com/playwright:focal as browser-tests
WORKDIR /opt/tests
COPY package.json package.json
COPY yarn.lock yarn.lock
COPY playwright.config.ts playwright.config.ts
RUN yarn
CMD ["yarn", "test:browser"]
