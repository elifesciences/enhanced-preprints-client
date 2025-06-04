.PHONY: storybook
storybook:
	yarn storybook

.PHONY: install-playwright
install-playwright:
	yarn playwright install

.PHONY: test-storybook
test-storybook: install-playwright
	STORYBOOK_PORT=6106; yarn storybook dev -p $$STORYBOOK_PORT & yarn wait-on http://localhost:$$STORYBOOK_PORT && yarn test-storybook --url http://localhost:$$STORYBOOK_PORT; TEST_EXIT_CODE=$$?; lsof -ti :$$STORYBOOK_PORT | xargs kill -9; exit $$TEST_EXIT_CODE

.PHONY: dev
dev:
	docker compose up --wait
	@echo 'Visit http://localhost:3001 for dev server'

node_modules: package.json yarn.lock
	yarn install
	touch node_modules

.PHONY: lint
lint: node_modules
	yarn lint
	yarn lint-sass

.PHONY: lint-fix
lint-fix: node_modules
	yarn lint --fix
	yarn lint-sass --fix

.PHONY: test
test: node_modules
	yarn test ${TEST}

.PHONY: check
check: node_modules lint
	yarn test --reporters=jest-wip-reporter
	yarn tsc --noEmit
