# Web Coding Challenge

This repository contains a simple Angular app that follows the requirements:

• Build a single page app with a sign-up form.

• The form should allow users to enter first name, last name, email, and password.

• All fields are required.

• Password validation:

1. Should be a minimum of eight characters,

2. Should contain lower and uppercase letters,

3. Should not contain user’s first or last name.

• Email should be validated but there are various ways of accomplishing this. So, show us what
you consider as a proper email validation.

• The form should send a POST request to https://demo-api.now.sh/users. The request body
example:
`{
firstName: "Thomas",
lastName: "Shelby",
email: "thomas@shelby.co.uk"
}`


## Prerequisites

Before you begin, make sure you have the following tools installed on your machine:

Node.js: [Download and install Node.js](https://nodejs.org/en/)

When it's installed you should install Angular CLI as well (`npm install -g @angular/cli
`)

## Getting Started
1. Clone the repository to your local machine.
2. Install project dependencies using `npm install`

## Running the Project

Once you have installed the dependencies and the Angular CLI globally, you can run the project using the following steps:
1. Start the development server `ng serve`
2. Open your web browser and navigate to http://localhost:4200/. The app will automatically reload if you make any changes to the source files.

## Running unit tests
App is covered with Unit Tests.

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Build for Production
To build the project for production, use the following command: `ng build --prod
`

## Additional Information

This project was generated with [Angular CLI](https://angular.io/cli). Refer to the Angular CLI documentation for more commands and customization options.

Explore the src/ directory to find the source code of the application.
