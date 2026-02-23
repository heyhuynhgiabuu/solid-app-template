import { defineConfig } from "oxlint";

/**
 * Oxlint configuration for SolidJS
 * Based on @nkzw/oxlint-config principles:
 * - Error, Never Warn
 * - Strict, Consistent
 * - Prevent Bugs
 * - Fast (avoid slow rules)
 * - Don't get in the way (autofixable preferred)
 */
export default defineConfig({
	$schema: "./node_modules/oxlint/configuration_schema.json",
	plugins: ["import", "typescript", "unicorn"],
	env: {
		browser: true,
		es2022: true,
	},
	rules: {
		// SolidJS/jsx is natively supported by oxlint
		// Error, Never Warn - convert warnings to errors
		"eslint/no-unused-vars": "error",
		"typescript/no-unused-vars": "error",
		"no-unused-vars": "off", // Disable base rule, use typescript version

		// Formatting (oxfmt handles this, but enforce for consistency)
		formatter: {
			indent: "tab",
			lineWidth: 100,
			quoteStyle: "single",
			semi: true,
		},
	},
	ignorePatterns: ["dist/", "node_modules/", "*.config.ts.timestamp-*"],
});
