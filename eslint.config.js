import js from "@eslint/js";
import solid from "eslint-plugin-solid/configs/typescript";

/**
 * ESLint config for SolidJS-specific rules
 * Use alongside oxlint for fast linting + SolidJS-specific rules
 */
export default [
	js.configs.recommended,
	solid,
	{
		rules: {
			// SolidJS-specific: warn about potential reactivity issues
			"solid/reactivity": "warn",
			"solid/components-return-once": "warn",
		},
	},
];
