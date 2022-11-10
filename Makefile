IMAGE_REPO_PREFIX ?= enhanced-preprints-
GITHASH:=$(shell git log -1 --pretty=format:"%H")
GITSHORTHASH:=$(shell git log -1 --pretty=format:"%H" | head -c 8)
DATETIME:=$(shell date -u '+%Y%m%d.%H%M')
GITBRANCH?=$(shell git branch --show-current)

.PHONY: start-dev start-prod build-storybook-and-push  build-preview test-preview push-preview build-prod test-prod push-prod

start-dev:
	docker-compose up

start-prod:
	docker-compose -f docker-compose.yaml -f docker-compose.prod.yaml up

build-storybook-and-push:
	docker buildx build \
		-t $(IMAGE_REPO_PREFIX)storybook:latest \
		-t $(IMAGE_REPO_PREFIX)storybook:$(GITHASH) \
		-t $(IMAGE_REPO_PREFIX)storybook:$(GITBRANCH)-$(GITSHORTHASH)-$(DATETIME) \
		 --platform linux/amd64,linux/arm64 --target storybook --push .

build-preview:
# only build preview images for native platform
	docker buildx build \
		-t $(IMAGE_REPO_PREFIX)client:preview-$(GITHASH) \
		--target prod --load .

test-preview: build-preview
	docker run $(IMAGE_REPO_PREFIX)client:preview-$(GITHASH) yarn lint
	docker run $(IMAGE_REPO_PREFIX)client:preview-$(GITHASH) yarn lint-sass
	docker run $(IMAGE_REPO_PREFIX)client:preview-$(GITHASH) yarn test --ci --watchAll=false

push-preview: build-preview
	docker buildx build \
		-t $(IMAGE_REPO_PREFIX)client:preview-$(GITHASH) \
		--target prod --push .

build-prod:
	docker buildx build \
		-t $(IMAGE_REPO_PREFIX)client:latest \
		-t $(IMAGE_REPO_PREFIX)client:$(GITHASH) \
		-t $(IMAGE_REPO_PREFIX)client:$(GITBRANCH)-$(GITSHORTHASH)-$(DATETIME) \
		 --platform linux/amd64,linux/arm64 --target prod --load .

test-prod: build-prod
	docker run $(IMAGE_REPO_PREFIX)client:$(GITHASH) yarn lint
	docker run $(IMAGE_REPO_PREFIX)client:$(GITHASH) yarn lint-sass
	docker run $(IMAGE_REPO_PREFIX)client:$(GITHASH) yarn test --ci --watchAll=false

push-prod: build-prod
	docker buildx build \
		-t $(IMAGE_REPO_PREFIX)client:latest \
		-t $(IMAGE_REPO_PREFIX)client:$(GITHASH) \
		-t $(IMAGE_REPO_PREFIX)client:$(GITBRANCH)-$(GITSHORTHASH)-$(DATETIME) \
		 --platform linux/amd64,linux/arm64 --target prod --push .
