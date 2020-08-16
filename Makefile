install: install-deps install-flow-typed

start:
	npm start

dev:
	npm run dev

install-deps:
	npm install

build:
	npm run build

test:
	npm test

test-coverage:
	npm test -- --coverage

lint:
	npx eslint . --ext js,jsx

publish:
	npm publish