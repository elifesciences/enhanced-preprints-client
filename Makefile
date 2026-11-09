.PHONY: storybook
storybook:
	pnpm storybook

.PHONY: install-playwright
install-playwright:
	pnpm exec playwright install

.PHONY: test-storybook
test-storybook: install-playwright
	STORYBOOK_PORT=6106; pnpm exec storybook dev -p $$STORYBOOK_PORT --no-open & pnpm exec wait-on http://localhost:$$STORYBOOK_PORT && pnpm test-storybook --url http://localhost:$$STORYBOOK_PORT; TEST_EXIT_CODE=$$?; lsof -ti :$$STORYBOOK_PORT | xargs kill -9; exit $$TEST_EXIT_CODE

.PHONY: test-browser
test-browser: node_modules install-playwright
	docker compose up --build --wait
	pnpm exec playwright test

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
	docker compose down
	pnpm build
	NEXT_PUBLIC_SITE_NAME=elife NEXT_PUBLIC_FILES_API_PATH=https://prod--epp.elifesciences.org/api/files API_SERVER=https://prod--epp.elifesciences.org IIIF_SERVER=https://prod--epp.elifesciences.org/iiif NEXT_PUBLIC_IIIF_URL=https://prod--epp.elifesciences.org/iiif pnpm start

node_modules: package.json pnpm-lock.yaml
	pnpm install
	touch node_modules

.PHONY: clean
clean:
	rm -rf ./node_modules ./.next
	docker compose down --volumes --remove-orphans --rmi=all

.PHONY: compile-typescript
compile-typescript:
	pnpm exec tsc --noEmit

.PHONY: watch-typescript
watch-typescript:
	pnpm exec tsc --watch --noEmit 

.PHONY: check-unused-exports
check-unused-exports: node_modules
	pnpm exec ts-unused-exports tsconfig.json --excludePathsFromReport=\\.stories\\. --silent

.PHONY: check-circular-dependencies
check-circular-dependencies: node_modules
	pnpm exec madge --circular --extensions ts,tsx src/

.PHONY: lint
lint: node_modules check-unused-exports
	pnpm lint
	pnpm lint-sass

.PHONY: lint-fix
lint-fix: node_modules
	pnpm lint --fix
	pnpm lint-sass --fix

.PHONY: test
test: node_modules
	pnpm test ${TEST}

.PHONY: watch
watch: node_modules
	pnpm test --watch ${TEST}

.PHONY: check
check: node_modules check-circular-dependencies lint
	pnpm exec tsc --noEmit
	pnpm test --reporters=jest-wip-reporter
