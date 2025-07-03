install:
	npm install

start-dev:
	docker compose up --scale=app=0 -d && \
	npm run start:dev

stop-dev:
	docker compose down