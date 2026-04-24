const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
	use: {
		browserName: 'chromium',
	},
	projects: [
		{
			name: 'chromium',
			use: {
				channel: 'chromium', // 🔥 ВАЖНО
			},
		},
	],
});
