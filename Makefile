DOCKER_REPO_PREFIX ?= enhanced-preprints-
GITHASH:=$(shell git log -1 --pretty=format:"%H")
GITSHORTHASH:=$(shell git log -1 --pretty=format:"%H" | head -c 8)
DATETIME:=$(shell date -u '+%Y%m%d.%H%M')
GITBRANCH:=$(shell git branch --show-current)

.PHONY: build

start:
	docker-compose up

build-client:
	docker buildx build -t $(DOCKER_REPO_PREFIX)client:dev    --load --target base .

build-storybook:
	docker buildx build -t $(DOCKER_REPO_PREFIX)storybook:dev --load --target storybook .

build-prod-and-push:
	docker buildx build \
		-t $(DOCKER_REPO_PREFIX)client:latest \
		-t $(DOCKER_REPO_PREFIX)client:$(GITHASH) \
		-t $(DOCKER_REPO_PREFIX)client:$(GITBRANCH)-$(GITSHORTHASH)-$(DATETIME) \
		 --platform linux/amd64,linux/arm64 --target prod --push .
