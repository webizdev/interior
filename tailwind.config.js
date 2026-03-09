/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                sage: {
                    DEFAULT: '#8F9779',
                    50: '#F0F2EB',
                    100: '#E4E7D9',
                },
                beige: {
                    DEFAULT: '#F5F5DC',
                },
                'soft-white': '#FBFBFB',
                'deep-earth': '#4A4A4A',
            },
            fontFamily: {
                sans: ['Poppins', 'sans-serif'],
                serif: ['Playfair Display', 'serif'],
            }
        },
    },
    plugins: [],
}
