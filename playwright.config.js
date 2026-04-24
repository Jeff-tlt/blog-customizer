// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
	use: {
		browserName: 'chromium',
		launchOptions: {
			executablePath: '/usr/bin/google-chrome',
		},
	},
});
