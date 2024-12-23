# Saucedemo E2E Testing Project

This project is an end-to-end testing suite for Saucedemo(https://www.saucedemo.com) using Cypress and Javascript. It is designed to automate the testing of various functionalities of the Saucedemo web application.

## Table of Contents

- [Project Overview](#project-overview)
- [Technologies Used](#technologies-used)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Running Tests](#running-tests)

## Project Overview

This project aims to provide a comprehensive suite of automated tests for the Saucedemo web application. The tests cover various scenarios, including user authentication, navigation, and interactions with different pages.

## Technologies Used

- **Cypress**: A versatile library tailored for browser automation with a focus on reliability.
- **Javascript**: A structured, high-level scripting language.
- **npm**: The package manager for JavaScript.

## Project Structure

The project adopts a structured approach to maintainability and scalability. Here's an overview of the project's directory structure:

```
cypress/
├── e2e/
│   ├── error/
│   │   ├── checkout/
│   │   ├── navigation/
│   │   ├── products/
│   │   ├── update/
│   ├── problem/
│   │   ├── checkout/
│   │   ├── navigation/
│   │   ├── products/
│   │   ├── update/
│   ├── standard/
│   │   ├── checkout/
│   │   ├── login/
│   │   ├── navigation/
│   │   ├── products/
│   │   ├── update/
└── ...
```

## Installation

To set up the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone https://github.com/BryanLoops/saucedemo-test.git
   cd saucedemo-test
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

## Running Tests

To execute the tests, use the following commands:

```bash
npx cypress open
```
This will open Cypress visual mode where you can visualize all tests and select each spec that you want to run.

```bash
npm run headless-standard
```
This will run all the tests created to define if the application is working correctly using the standard user by definition and testing for the expected sucess and errors. Use this to check if the project is working as intended.

```bash
npm run headless-problem
```
and
```bash
npm run headless-error
```
Runs the same tests of the standard, except by login spec, and simulate some errors by using a broken version of Saucedemo.

## GitHub Actions Workflow
The repository is set up to run the standard e2e tests using Cypress automatically via GitHub Actions on every push or pull request. The workflow file (.github/workflows/cypress-tests.yml) defines the CI pipeline.

# The test results can be found in '/cypress/results/'.
