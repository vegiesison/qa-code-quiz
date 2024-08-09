import { defineConfig } from 'cypress';

export default defineConfig({
    e2e: {
        setupNodeEvents(on, config) {
            // implement node event listeners here if needed
        },
        baseUrl: 'http://localhost:8080', // Replace with your app's URL
        specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}', // The location of your test files
    },
    // You can also configure other settings like viewport, retries, etc.
});