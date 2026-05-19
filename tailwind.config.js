module.exports ={
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            screens: {
                "3xl": "1920px",
            },
            animation: {
                "fade-up": "fadeUp 0.22s ease-out",
            },
            keyframes: {
                fadeUp: {
                    "0%":   { opacity: "0", transform: "translateY(8px)" },
                    "100%": { opacity: "1", transform: "translateY(0)"   },
                },
            },
        },
    },
    plugins: [],
};