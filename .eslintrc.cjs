module.exports = {
	parser: '@typescript-eslint/parser',
	plugins: ['svelte3', '@typescript-eslint'],
	overrides: [
		{
			files: ['*.svelte'],
			processor: 'svelte3/svelte3',
		},
	],
	rules: {},
	settings: {
		'svelte3/typescript': () => require('typescript'),
	},
};
