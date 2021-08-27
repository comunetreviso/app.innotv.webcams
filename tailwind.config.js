/* eslint-disable @typescript-eslint/no-unsafe-assignment */

module.exports = (isProd) => ({
    prefix: "",
    purge: {
        enabled: false,
        content: [
            "**/*.html", "**/*.ts"
        ],
        options: {
            safelist: [
                "type" // [type='checkbox']
            ]
        },
        preserveHtmlElements: true
    },
    darkMode: false, // or 'media' or 'class'
    theme: {
        extend: {
            padding: {
                "9/16": "56.25%"
            },
            fontFamily: {
                "nunito": [
                    "NunitoSans", "sans-serif"
                ]
            },
            height: {
                "screen-80": "80vh"
            },
            transitionProperty: {
                "width": "width"
            }
        },
        colors: {
            "gray-dark": "#444444",
            "white-dark" : "#f2f2f2"
        }
    },
    variants: {
        extend: {}
    },
    plugins: [
        require("@tailwindcss/forms"),
        require("@tailwindcss/line-clamp")
    ]
});
