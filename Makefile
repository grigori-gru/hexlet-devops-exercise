start:
	docker-compose up

setup:
	npm install

lint:
	npm run lint

test-setup:
	docker-compose -f docker-compose.test.yaml up -d
	docker-compose -f docker-compose.test.yaml run app npm install

test-ci:
	$(MAKE) test-setup
	docker-compose -f docker-compose.test.yaml run app npm run test:migration
	docker-compose -f docker-compose.test.yaml run app npm run test

test-watch:
	docker-compose -f docker-compose.test.yaml run app npm run test:watch