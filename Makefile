.PHONY: storybook
storybook:
	yarn storybook

.PHONY: dev
dev:
	docker compose up --wait
	@echo 'Visit http://localhost:3001 for dev server'

node_modules: package.json yarn.lock
	yarn install
	touch node_modules

.PHONY: check
check: node_modules
	yarn test
	yarn lint
	yarn lint-sass
	yarn tsc --noEmit
