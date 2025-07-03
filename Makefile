install:
	npm install

start-dev:
	docker compose up --scale=app=0 -d && \
	npm run start:dev

start-int:
	docker compose -f docker-compose-test.yml up -d && \
	npm run start-feature

test-int:
	npm run int-test

stop:
	docker compose down
