.PHONY: storybook
storybook:
	yarn storybook

.PHONY: install-playwright
install-playwright:
	yarn playwright install

.PHONY: test-storybook
test-storybook: install-playwright
	STORYBOOK_PORT=6106; yarn storybook dev -p $$STORYBOOK_PORT & yarn wait-on http://localhost:$$STORYBOOK_PORT && yarn test-storybook --url http://localhost:$$STORYBOOK_PORT; TEST_EXIT_CODE=$$?; lsof -ti :$$STORYBOOK_PORT | xargs kill -9; exit $$TEST_EXIT_CODE

.PHONY: test-browser
test-browser: node_modules install-playwright
	docker compose up --build --wait
	yarn playwright test

.PHONY: dev
dev: node_modules
	docker compose up --build --wait
	@echo ""
	@echo "Visit: "
	@echo "- http://localhost:8080 - externally routed setup"
	@echo "- http://localhost:3001 - for accessing client directly, including it's internal API"

.PHONY: dev-logs
dev-logs:
	docker compose logs -f app

.PHONY: prod
prod: node_modules
	yarn build
	NEXT_PUBLIC_SITE_NAME=elife NEXT_PUBLIC_FILES_API_PATH=https://prod--epp.elifesciences.org/api/files API_SERVER=https://prod--epp.elifesciences.org IIIF_SERVER=https://prod--epp.elifesciences.org/iiif yarn start

node_modules: package.json yarn.lock
	yarn install
	touch node_modules

.PHONY: clean
clean:
	rm -rf ./node_modules ./.next
	docker compose down --volumes --remove-orphans --rmi=all

.PHONY: compile-typescript
compile-typescript:
	yarn tsc --noEmit

.PHONY: watch-typescript
watch-typescript:
	yarn tsc --watch --noEmit 

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

.PHONY: watch
watch: node_modules
	yarn test --watch ${TEST}

.PHONY: check
check: node_modules lint
	yarn tsc --noEmit
	yarn test --reporters=jest-wip-reporter
