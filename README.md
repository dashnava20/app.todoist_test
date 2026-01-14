# Todoist E2E Automation

Automated end-to-end (E2E) tests for [Todoist Web App](https://www.todoist.com/es) using Playwright, designed with clean architecture and real-world QA best practices.

This project focuses on validating task management workflows while demonstrating scalability, maintainability, and ownership of the QA process.

## Project Structure

```
Todoist/
├── fixtures/
│   └── authenticatedPage.js
│       # Controlled login fixture to ensure authenticated state per test
│
├── pages/
│   ├── BasePage.js
│   │   # Base abstraction for shared actions, waits, and UI utilities
│   ├── LoginPage.js
│   │   # Login interactions and authentication logic
│   ├── SidebarPage.js
│   │   # Sidebar interactions (navigation & task editor access)
│   └── TasksPage.js
│       # Inbox task management (create, validate, delete)
│
├── tests/e2e/
│   ├── sidebar.spec.js
│   └── tasks.spec.js
│
├── utils/
│   ├── env.js
│   │   # Environment variable validation (CI/CD ready)
│   └── testData.js
│       # Dynamic test data generation using timestamps
│
├── .env.example
│   # Example environment variables
│
├── package.json
│   # Project dependencies and scripts
│
├── storageState.json
│   # Stored session (not used due to Todoist token restrictions)
│
├── playwright.config.js
│   # Playwright configuration with additional stability settings
│
└── README.md
```
## Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Configure environment variables:**
   - This project uses dotenvx to manage and validate environment variables.
   - Create a `.env` file based on `.env.example`:
   ```bash
    TODOIST_EMAIL=your_email
    TODOIST_PASSWORD=your_password
   ```
    ⚠️ A Todoist account is required to execute the tests.
    A free 7-day trial account is sufficient.

3. **Run all tests:**
   ```bash
   npx playwright test
   ```

4. **Run tests in headed + debug mode:**
   ```bash
   npx playwright test --headed --debug
   ```
5. **View test reports:**
   - After execution, open `playwright-report/index.html` in your browser.

## Key Concepts & Design Decisions

**Page Object Model (POM)**
This project implements a clean and stabilized **Page Object Model (POM)** to:
- Separate test logic from UI interactions
- Improve readability and reuse
- Enable scalability as new features are added
- Reduce flakiness caused by UI changes

Each page encapsulates its own responsibilities, following the Single Responsibility Principle.

**Authentication Strategy**
Although Playwright supports session reuse via `storageState`, **Todoist frequently refreshes and invalidates authentication tokens**, making stored sessions unreliable.

For this reason:
- A custom `authenticatedPage` fixture is used
- Login is controlled and isolated per test scope
- Tests behave closer to real user sessions
This approach is more stable and production-oriented.

**Environment Validation with `dotenvx`**
`dotenvx` is included as a dependency and used to validate required variables at runtime.

**Test Data Strategy (`testData.js`)**

Task names are generated dynamically using timestamps, for example:
```bash
   E2E Task desde Sidebar - 2026-01-14T13-57-04-036Z
```

This guarantees:
- No duplicated task names
- Stable assertions across multiple runs
- Safe repeated or parallel executions

**Playwright Configuration**

The `playwright.config.js` includes additional configuration to ensure stability, such as:
- Explicit timeouts
- Strict locator handling
- Headed/headless compatibility
- Execution settings aligned with real-world conditions

These settings reflect production constraints rather than ideal demo scenarios.

**Continuous Improvement**

This repository represents a foundational automation framework, not a finished product.

Planned improvements include:
- Additional assertions and edge cases
- API + UI hybrid testing
- Improved test data lifecycle management
- Reporting and quality metrics
- Performance and accessibility checks

These enhancements would be introduced progressively in a real project lifecycle.

**Final Notes**

This project was built to demonstrate:
- Strategic QA thinking
- Ownership of the QA process
- Clean automation architecture
- Fast adaptation and continuous improvement

It reflects how automation should be **designed, evolved, and maintained in real production environments**, not just to make tests pass, but to provide condifence, visibility, and long-term value to the business.
