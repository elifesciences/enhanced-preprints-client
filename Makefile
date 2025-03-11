.PHONY: dev
dev:
	docker compose up --wait
	@echo 'Visit http://localhost:3001 for dev server and http://localhost:6006 for Storybook'
