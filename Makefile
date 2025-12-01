install:
	npm run setup

build:
	npm run build

start-dev:
	docker compose up --scale=app=0 -d && \
	npm run start:dev

run-local: build
	npm run start::local

start-int: build
	source feature.env && \
	docker compose -f docker-compose-test.yml up -d && \
	npm run start-feature

test:
	npm run test

test-int:
	npm run int-test

stop:
	docker compose down
