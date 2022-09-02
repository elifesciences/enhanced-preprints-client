ARG node_version=16.17-alpine3.15

FROM node:${node_version} as base
RUN mkdir /opt/epp-client
WORKDIR /opt/epp-client
COPY ./ ./
RUN yarn
CMD [ "yarn", "start" ]

FROM base as storybook
CMD [ "yarn", "storybook" ]

FROM base as build
RUN yarn build

FROM nginx:1.21.1 as prod
COPY --from=build /opt/epp-client/build/ /usr/share/nginx/html/
