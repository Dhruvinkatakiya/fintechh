/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Surface colors - Realistic depth and materiality
        surface: {
          primary: '#F5F5F7',
          secondary: '#E8E8ED',
          tertiary: '#FAFAFA',
        },
        
        // Shadows - Depth and dimensionality
        'shadow-dark': '#D1D1D6',
        'shadow-light': '#FFFFFF',
        'shadow-soft': 'rgba(0, 0, 0, 0.15)',
        
        // Brand colors - With realistic depth variants
        brand: {
          blue: {
            light: '#5AC8FA',
            DEFAULT: '#007AFF',
            dark: '#0051D5',
          },
          green: {
            light: '#63E584',
            DEFAULT: '#34C759',
            dark: '#248A3D',
          },
          orange: {
            light: '#FFB340',
            DEFAULT: '#FF9500',
            dark: '#C87400',
          },
          red: {
            light: '#FF6961',
            DEFAULT: '#FF3B30',
            dark: '#D62518',
          },
          pink: {
            light: '#FF6482',
            DEFAULT: '#FF2D55',
            dark: '#D41043',
          },
          purple: {
            light: '#7D7BE8',
            DEFAULT: '#5856D6',
            dark: '#3634A3',
          },
          violet: {
            light: '#C77EE8',
            DEFAULT: '#AF52DE',
            dark: '#8944AB',
          },
        },
        
        // Text colors - Realistic hierarchy
        text: {
          primary: '#1D1D1F',
          secondary: '#86868B',
          tertiary: '#C7C7CC',
          inverted: '#FFFFFF',
        },
        
        // Category colors - Spending breakdown
        category: {
          shopping: '#FF2D55',
          food: '#FF9500',
          bills: '#5856D6',
          entertainment: '#AF52DE',
          transport: '#007AFF',
          other: '#8E8E93',
        },
      },
      boxShadow: {
        // Skeuomorphic shadows
        'skeu-sm': '4px 4px 8px #D1D1D6, -4px -4px 8px #FFFFFF',
        'skeu-md': '8px 8px 16px #D1D1D6, -8px -8px 16px #FFFFFF',
        'skeu-lg': '12px 12px 24px #D1D1D6, -12px -12px 24px #FFFFFF',
        'skeu-inset-sm': 'inset 2px 2px 4px #D1D1D6, inset -2px -2px 4px #FFFFFF',
        'skeu-inset-md': 'inset 4px 4px 8px #D1D1D6, inset -4px -4px 8px #FFFFFF',
        
        // Button shadows
        'btn-3d': '0 4px 12px rgba(0, 0, 0, 0.15), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
        'btn-3d-pressed': 'inset 0 2px 4px rgba(0, 0, 0, 0.2), 0 1px 2px rgba(0, 0, 0, 0.1)',
        
        // Depth shadows
        'depth-sm': '0 2px 4px rgba(0, 0, 0, 0.1)',
        'depth-md': '0 4px 12px rgba(0, 0, 0, 0.15)',
        'depth-lg': '0 8px 20px rgba(0, 0, 0, 0.15)',
      },
      backgroundImage: {
        // Gradients
        'gradient-button': 'linear-gradient(180deg, #FFFFFF 0%, #E8E8ED 100%)',
        'gradient-button-pressed': 'linear-gradient(180deg, #D1D1D6 0%, #C7C7CC 100%)',
        'gradient-income': 'linear-gradient(180deg, #34C759 0%, #63E584 100%)',
        'gradient-expense': 'linear-gradient(180deg, #FF3B30 0%, #FF6961 100%)',
        'gradient-card': 'linear-gradient(145deg, #FFFFFF, #F5F5F7)',
        'gradient-card-inset': 'linear-gradient(145deg, #E8E8ED, #FAFAFA)',
      },
      borderRadius: {
        'skeu': '12px',
        'skeu-lg': '20px',
        'skeu-xl': '28px',
      },
    },
  },
  plugins: [],
};
