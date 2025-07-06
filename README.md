# Playwright SauceDemo Testing Suite

This repository provides an automated testing suite for [SauceDemo](https://www.saucedemo.com/v1/) utilizing Playwright. The documentation below details the procedures for executing the test suite, as well as the overall structure and scope of the project. Refer to the following sections for setup instructions, test execution commands, and a comprehensive overview of the implemented test cases.

## Prerequisites

- **node.js**
- **npm** (comes with node.js) 
- **git**

## Installation

1. **Clone repository**
```bash
git clone https://github.com/ErickBGomez/playwright-saucedemo.git
cd playwright-saucedemo
```

2. **Install dependencies**
```bash
npm install
```

or 

```bash
npm i
```

3. **Install Playwright browsers**
```bash
npx playwright install
```

4. **Set up environment variables**
```bash
# Copy current content of .env.example file into .env file
cp .env.example .env
```
Edit the `.env` file with your preferred configuration with:
   
```bash
# Edit .env file using nano text editor
nano .env
```

or:

```bash
# Edit .env file using Visual Studio Code:
code .env
```

## How to run tests

### Tests commands

```bash
# Run all tests
npx playwright test

# Run specific test file
npx playwright test login.spec.ts
```

### View reports

```bash
npx playwright show-report
```

## Tests defined

### 1. UI tests

#### **Login tests** (`login.spec.ts`)
- **Successful login**: Tests with valid credentials (standard_user, problem_user, performance_glitch_user)
- **Failed login**: Tests with invalid credentials (locked_out_user, invalid_user, empty credentials)
- **Log out**: Tests successful logout functionality

#### **Inventory and Cart tests** (`cart.spec.ts`)
- **Add items**: Adding products to shopping cart
- **Remove items**: Removing products from cart
- **Cart counter**: Validating cart badge updates
- **Cart navigation**: Navigating to cart page

#### **Checkout tests** (`checkout.spec.ts`)
- **Complete flow**: Full checkout process from login to completion
- **Form validation**: Testing checkout form with valid/invalid data
- **Navigation**: Moving between checkout steps
- **Order Completion**: Verifying successful order placement

### 2. API Tests

#### **API Tests** (`api.spec.ts`)
Tests RESTful API operations using JSONPlaceholder:

Each tests validates status code, content and response time.

Also each test is grouped by each request method listed here with their respective actions:

- **GET Requests**: 
  - Retrieve single post
  - List all posts
  - Filter posts by userId
  - Get nested comments

- **POST Requests**:
  - Create new posts
  - Handle invalid data

- **PUT Requests**:
  - Complete resource updates

- **PATCH Requests**:
  - Update some resource fields
  - Multiple field updates

- **DELETE Requests**:
  - Delete existing resources