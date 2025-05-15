
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: '#00B8BF',
					light: '#E6F7F8',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				// New color palette based on Masttro Contro
				navy: {
					50: '#e6edf2',
					100: '#ccdbe6',
					200: '#99b7cc',
					300: '#6693b3',
					400: '#336f99',
					500: '#004b80',
					600: '#003c66',
					700: '#002d4d',
					800: '#001e33',
					900: '#000f1a',
					950: '#0A1F33',
				},
				teal: {
					50: '#e6f8fb',
					100: '#ccf1f7',
					200: '#99e4ef',
					300: '#66d6e7',
					400: '#33c9df',
					500: '#17A2B8',
					600: '#128293',
					700: '#0e616e',
					800: '#09414a',
					900: '#052025',
				},
				turquoise: {
					50: '#ecfbfa',
					100: '#d9f7f5',
					200: '#b3efec',
					300: '#8ee7e2',
					400: '#68dfd9',
					500: '#4ECDC4',
					600: '#3ea49d',
					700: '#2f7b76',
					800: '#1f524e',
					900: '#102927',
				},
				neutral: {
					900: '#1B1E2E',
					800: '#25293F',
					700: '#374151',
					200: '#E6E8EB',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in': {
					'0%': {
						transform: 'translateX(-100%)'
					},
					'100%': {
						transform: 'translateX(0)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.7s ease-out',
				'slide-in': 'slide-in 0.5s ease-out'
			},
			fontFamily: {
				serif: ['Merriweather', 'serif'],
				sans: ['Inter', 'sans-serif'],
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
