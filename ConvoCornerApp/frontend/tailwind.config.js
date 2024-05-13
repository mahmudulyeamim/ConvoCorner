/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["media"],
  content: [
    './pages/**/*.{js,jsx}',
    './components/**/*.{js,jsx}',
    './app/**/*.{js,jsx}',
    './src/**/*.{js,jsx}',
  ],
  prefix: "",
  theme: {
    screens : {
      '3xl': '1921px',
      'sm' : '790px',
      'md' : '1081px',
      'xs' : '420px',
      'xl' : '1370px'
    },
    container: {
      center: true,
      padding: "2rem"
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'radial-gradient': 'radial-gradient(169.40% 89.55% at 5.24% 6.29%, rgba(216, 216, 216, 0.7) 0%, #216A70 100%)',
        'radial-gradient-2': 'radial-gradient(169.40% 189.55% at 50.24% 36.29%, #041F21 5%, #216A70 100%)',
        'radial-gradient-3': 'radial-gradient(69.40% 89.55% at 30.24% 36.29%, #A8A8D8 5%, #775EFF 200%)',

      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("daisyui")],
}