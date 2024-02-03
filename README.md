# Context
This is a simple html app with some basic "TODO list" functionality.

![user interface of the app](./readme/user-interface.png)

## Run the app (frontend)
- Navigate to the `src/webapp` folder
- `npm install`
- `npm run start-webapp`

Then you'll be able to navigate to the `http://localhost:8080` in your browser and use the app.

> Note that there are two different versions of the app: `todo.html` and `todo-components.html`. Both achieving the same outcome. One is plain html, another has an html built from custom elements (components) 

## Run the API (backend)
- Navigate to the `src/api` folder
- `npm install`
- `npm run start-api`

## Database
TODO: provide instructions here on what needs to be done (technology, connecting to it, etc.)

## Running tests
TODO: this is not up-to-date

### Unit tests (Jest)
- Navigate to the `src/webapp/api` folder
- `npm install`
- `npm run test`

### E2E tests (Cypress)
- Navigate to the `e2e/` folder
- `npm install`
- `npm run test`

Alternatively you could run `npm run open` to open Cypress UI and start the tests from there.
> Note that the tests would fail if you are NOT running the todo app, see the instructions above ⬆️ 