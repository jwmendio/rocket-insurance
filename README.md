# Spaceway Insurance
Providing rocket owners comprehensive coverage options to let them fly through space worry-free.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Heroku Link
[https://spaceway.herokuapp.com/rating-information](https://spaceway.herokuapp.com/rating-information)

## GitHub
[https://github.com/jwmendio/rocket-insurance](https://github.com/jwmendio/rocket-insurance)

## Onboarding

1. `$ git clone https://github.com/jwmendio/rocket-insurance.git`

2. `$ yarn install`

3. `$ yarn dev`

4. Happy Hacking! 🤓

## Scripts

In the project directory, you can run:

### `yarn install`

Install dependencies.

### `yarn dev`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn lint`

Runs ESlint.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

## Notes

- On the Notion instructions, only first and last name are required. However, when making an API call, it requires the address be included. Thus, I made the form require the user enter a first name, last name, and address (line 1, city, region, postal).

- The instructions seem to imply that the two screens be on two separate endpoints. However, I personally think it'd be better if the two forms be combined into a two-step form living under one endpoint since there is no GET endpoint to fetch the data for the second form. Without a GET endpoint, if the user refreshes the page while on the second form, the data cannot be rehydrated.
