# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
# Run all tests
npx playwright test

# Run a single test file
npx playwright test tests/login.spec.ts

# Run with visible browser
npx playwright test --headed

# Run with step-by-step debugger
npx playwright test --headed --debug

# Generate locators interactively
npx playwright codegen https://automationexercise.com

# Install browsers (required after fresh install)
npx playwright install
```

## Architecture

This is a Playwright + TypeScript test suite for [automationexercise.com](https://automationexercise.com), structured with Page Object Model (POM).

**Test flow for registration:**
`registration.spec.ts` → calls `generateNextUser()` (creates unique user, saves to `lastUser.json`) → runs test → deletes account.

**Test flow for login:**
`login.spec.ts` → calls `readLastUser()` (reads from `lastUser.json`) → logs in with that user. Login test depends on registration test having run first.

### Key files

- `playwright.config.ts` — `baseURL` is `https://automationexercise.com`, `headless: false`, `slowMo: 1500ms`
- `config.json` — site URL and a persistent test user (`georgitest1`) that is never deleted
- `utils/userGenerator.ts` — generates sequential users (`georgitest1`, `georgitest2`...), counter stored in `utils/user.counter.txt`, saves last user to `utils/lastUser.json`
- `utils/saveLastUser.ts` — `saveLastUser()` / `readLastUser()` for persisting user data between test runs
- `pages/` — Page Object Model classes (locators + methods per page)

### Page Object Model convention

Each page class in `pages/` follows this pattern:
```typescript
export class SomePage {
  private locatorName: Locator;

  constructor(private page: Page) {
    this.locatorName = page.locator('[data-qa="..."]');
  }

  async someAction() {
    await this.locatorName.click();
  }
}
```

Locator priority: `data-qa` > `#id` > `getByRole()` > `text=` > avoid `class`.

### User generation

- `generateNextUser()` auto-increments counter and returns `{ username, email }` — password is always `Test12#$`
- `readLastUser()` returns `{ username, email, password }` from last registration
- `georgitest1@example.com` is a persistent user that must exist in the site (never delete it)
