# FE Angular Rampup Assignment

## Getting Started

### Prerequisites

- **Node.js**: Version 20+. You can download and install it from https://nodejs.org/en
- **npm**: Node.js package manager, which comes bundled with Node.js.

### Installing

To set up the project on your local environment, follow these steps:

1. **Clone the Repository**

   First, you need to clone the repository:
   - **HTTPS:** `https://github.com/jtg-inductions-fe/FE-Angular-Rampup-Palak-Sehgal-UID00821-2026.git`
   - **SSH:** `git@github.com:jtg-inductions-fe/FE-Angular-Rampup-Palak-Sehgal-UID00821-2026.git`

2. **nvm (Node Version Manager)**: If the required Node version 20+ is already installed and active, you can skip this step else you can use nvm (Node Version Manager). Here's how to use it:

   - **Switch Node Version**: If the required Node version is already installed, run:

     ```bash
     nvm use
     ```

   - **Install Node Version**: If the required Node version isn’t installed, you can install it by running:
     ```bash
     nvm install
     ```

   > **_Tip:_** If you don't have nvm installed, you can install it by following the instructions on [nvm-sh/nvm](https://github.com/nvm-sh/nvm).

   Alternatively, you can update Node.js directly by downloading the latest version from the official website: nodejs.org.

3. **Install the necessary dependencies using npm**

   For deterministic enterprise builds, use `npm ci`:

   ```bash
   npm ci
   ```

   Alternatively, you can run npm install

4. Run the Development Server

   ```bash
   npm start
   ```

   The app will typically be available at http://localhost:4200, but check the terminal output for the exact URL.

   NOTE: The preferred way to change the development server's port number is by running:

   ```bash
   ng serve --port <New Port>
   ```

   Alternatively, you can modify the default port directly under architect.serve.options.port in angular.json at the root level of the project.

5. Build the Project

   ```bash
   npm run build
   ```

   This command will generate the optimized production files in the dist/ directory.

6. Lint the Code

```bash
npm run lint
```

This command will scan the project and check for any lint errors using ESLint.

7. Fix Linting Errors

   ```bash
   npm run lint:fix
   ```

   This command will automatically fix ESLint errors across the project.

8. Code Formatting (Prettier)

   ```bash
   npm run format
   ```

   This command will automatically format all files using Prettier.

9. Run Unit Tests

   ```bash
   npm test
   ```

   This command will execute unit tests using the configured test runner.

10. Run Production Server with SSR (Server-Side Rendering)

```bash
npm run serve:ssr:angular-rampup-assignment
```

This command starts a Node.js Express server that pre-renders the Angular application into static HTML before sending it to the client. This improves SEO and initial load performance.

**Note:** You must build the project (`npm run build`) before running this command.

## Environments

This project uses Angular environments configured in the `src/environments/` directory:

- `environment.ts`: Used for production builds.
- `environment.development.ts`: Used for local development (`npm start`).

**Important Security Note:**
Do NOT place sensitive passwords or secret keys in these environment files! These files are bundled and sent to the browser, so everything inside them is publicly visible. They are only meant for public configuration (like backend API URLs or feature flags) and are safely committed to Git.
