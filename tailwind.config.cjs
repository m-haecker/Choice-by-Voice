const defaultTheme = require('tailwindcss/defaultTheme');

const config = {
	content: ['./src/**/*.{html,js,svelte,ts}'],

	theme: {
		extend: {},
		fontFamily: {
			numbers: ['"Tourney"', ...defaultTheme.fontFamily.sans],
			sans: ['"Martel Sans"', ...defaultTheme.fontFamily.sans],
			serif: ['"Frank Ruhl Libre"', ...defaultTheme.fontFamily.serif],
			mono: ['"Ubuntu Mono"', ...defaultTheme.fontFamily.mono],
		},
	},

	plugins: [require('@tailwindcss/typography'), require('daisyui')],

	daisyui: {
		themes: [
			'light',
			'dark',
			'cupcake',
			'bumblebee',
			'emerald',
			'corporate',
			'synthwave',
			'retro',
			'cyberpunk',
			'valentine',
			'halloween',
			'garden',
			'forest',
			'aqua',
			'lofi',
			'pastel',
			'fantasy',
			'wireframe',
			'black',
			'luxury',
			'dracula',
			'cmyk',
			'autumn',
			'business',
			'acid',
			'lemonade',
			'night',
			'coffee',
			'winter',
		],
	},
};

module.exports = config;
