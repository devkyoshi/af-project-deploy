# Frontend Testing Guide

This document provides instructions for running tests, generating coverage reports, and performing performance testing for the Vite-based frontend application.

## Setup

The testing infrastructure uses the following tools:

- **Vitest**: A Vite-native testing framework for unit and component testing
- **React Testing Library**: For testing React components
- **jsdom**: For simulating a DOM environment in tests
- **@vitest/coverage-c8**: For generating code coverage reports
- **Lighthouse CI**: For performance testing

## Running Tests

### Unit and Component Tests

To run all tests:

```bash
npm test
```

To run tests in watch mode (useful during development):

```bash
npm test -- --watch
```

To run tests with the UI interface:

```bash
npm run test:ui
```

### Coverage Testing

To generate a coverage report:

```bash
npm run test:coverage
```

This will:
1. Run all tests
2. Generate a coverage report in the `coverage` directory
3. Display a summary in the terminal

The coverage report includes:
- Line coverage
- Function coverage
- Branch coverage
- Statement coverage

Coverage thresholds are set to 70% for all metrics. You can view the detailed HTML report by opening `coverage/index.html` in your browser.

### Performance Testing

To run performance tests:

```bash
# First build the application
npm run build

# Then run Lighthouse CI
npm run test:performance
```

This will:
1. Run Lighthouse on the built application
2. Generate performance reports
3. Check against the defined thresholds in `lighthouserc.js`
4. Upload the results to temporary public storage

## Writing Tests

### Component Tests

Component tests should be placed next to the component they test with a `.test.jsx` or `.test.tsx` extension. For example:

- `src/components/Button.jsx` → `src/components/Button.test.jsx`

Example component test:

```jsx
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('renders with the correct text', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

### Unit Tests

Unit tests for utilities, hooks, and other non-component code should follow the same pattern:

- `src/utils/format.js` → `src/utils/format.test.js`

Example unit test:

```js
import { describe, it, expect } from 'vitest';
import { formatDate } from './format';

describe('formatDate', () => {
  it('formats a date correctly', () => {
    const date = new Date('2023-01-01');
    expect(formatDate(date)).toBe('01/01/2023');
  });
});
```

## Best Practices

1. **Test Behavior, Not Implementation**: Focus on testing what the component does, not how it does it.
2. **Use Data Testids Sparingly**: Prefer using accessible queries like `getByRole`, `getByText`, etc.
3. **Mock External Dependencies**: Use Vitest's mocking capabilities to isolate the code being tested.
4. **Keep Tests Fast**: Avoid unnecessary setup and teardown.
5. **Test Edge Cases**: Include tests for error states, loading states, and boundary conditions.