/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{html,js,svelte,ts}',
		'./node_modules/flowbite-svelte/**/*.{html,js,svelte,ts}'
	],
	theme: {
		extend: {
			colors: {
				happy: {
					background: '#eff0f3',
					headline: '#0d0d0d',
					paragraph: '#2a2a2a',
					button: '#ff8e3c',
					buttonText: '#0d0d0d',
					stroke: '#0d0d0d',
					main: '#eff0f3',
					highlight: '#ff8e3c',
					secondary: '#ffffff',
					tertiary: '#d9376e'
				}
			}
		}
	},
	plugins: [require('flowbite/plugin')]
};
