import { Configuration } from "webpack";
import tailwind from "../../tailwind.config";

export default {
    module: {
        rules: [
            {
                test: /\.scss$/,
                loader: "postcss-loader",
                options: {
                    postcssOptions: {
                        ident: "postcss",
                        syntax: "postcss-scss",
                        plugins: [
                            require("postcss-import"),
                            require("tailwindcss")(tailwind),
                            require("autoprefixer")
                        ]
                    }
                }
            }
        ]
    },
    plugins: []
} as Configuration;