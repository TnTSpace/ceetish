import { fontFamily } from "tailwindcss/defaultTheme";
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		container: {
			center: true,
			padding: "2rem",
			screens: {
				"2xl": "1400px"
			}
		},
		extend: {
			colors: {
				pri: '#e773c8',
				font: '#282828',
				border: "hsl(var(--border) / <alpha-value>)",
				input: "hsl(var(--input) / <alpha-value>)",
				ring: "hsl(var(--ring) / <alpha-value>)",
				background: "hsl(var(--background) / <alpha-value>)",
				foreground: "hsl(var(--foreground) / <alpha-value>)",
				primary: {
					DEFAULT: "hsl(var(--primary) / <alpha-value>)",
					foreground: "hsl(var(--primary-foreground) / <alpha-value>)"
				},
				secondary: {
					DEFAULT: "hsl(var(--secondary) / <alpha-value>)",
					foreground: "hsl(var(--secondary-foreground) / <alpha-value>)"
				},
				destructive: {
					DEFAULT: "hsl(var(--destructive) / <alpha-value>)",
					foreground: "hsl(var(--destructive-foreground) / <alpha-value>)"
				},
				muted: {
					DEFAULT: "hsl(var(--muted) / <alpha-value>)",
					foreground: "hsl(var(--muted-foreground) / <alpha-value>)"
				},
				accent: {
					DEFAULT: "hsl(var(--accent) / <alpha-value>)",
					foreground: "hsl(var(--accent-foreground) / <alpha-value>)"
				},
				popover: {
					DEFAULT: "hsl(var(--popover) / <alpha-value>)",
					foreground: "hsl(var(--popover-foreground) / <alpha-value>)"
				},
				card: {
					DEFAULT: "hsl(var(--card) / <alpha-value>)",
					foreground: "hsl(var(--card-foreground) / <alpha-value>)"
				}
			},
			borderRadius: {
				lg: "var(--radius)",
				md: "calc(var(--radius) - 2px)",
				sm: "calc(var(--radius) - 4px)"
			},
			fontFamily: {
				sans: [...fontFamily.sans]
			},
			fontSize: {
				"xxs": "10px"
			},
			boxShadow: {
				"custom": "0 2px 5px rgba(0,0,0,0.2)",
			},
			padding: {
				'amazonchip': '0 10px 0 11px !important'
			},
			borderWidth: {
				'amazonchip': '1px !important'
			},
			borderColor: {
				'amazonchip': '#d5d9d9'
			},
		}
	},
	plugins: [
		function({ addUtilities }) {
			const newUtilities = {
				'.center': {
					width: '100%',
					maxWidth: '1290px',
					marginLeft: 'auto',
					marginRight: 'auto',
					paddingLeft: '16px',
					paddingRight: '16px'
				},
				'.amazonchip': {
					backgroundColor: 'transparent',
					borderRadius: '50px',
					fontSize: '13px',
					border: '1px solid #d5d9d9',
					boxShadow: '0 2px 5px rgba(0,0,0,0.1)'
				},
				'.clip': {
					clipPath: 'polygon(30% 0, 100% 0%, 100% 100%, 0% 100%)'
				}
			}
			addUtilities(newUtilities, ['responsive', 'hover'])
		},
		require('@tailwindcss/typography')
	]
};

export default config;
