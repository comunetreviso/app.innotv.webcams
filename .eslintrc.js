module.exports = {
    "env": {
        "browser": true,
        "node": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:@typescript-eslint/eslint-recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:@typescript-eslint/recommended-requiring-type-checking"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "project": "tsconfig.json",
        "sourceType": "module"
    },
    "plugins": [
        "@typescript-eslint",
        "@angular-eslint"
    ],
    "ignorePatterns": ["**/*.spec.ts"],
    "rules": {
        "@angular-eslint/component-class-suffix": "error",
        "@angular-eslint/component-selector": "error",
        "@angular-eslint/directive-class-suffix": "error",
        "@angular-eslint/directive-selector": "error",
        "@angular-eslint/no-forward-ref": "error",
        "@angular-eslint/no-host-metadata-property": "error",
        "@angular-eslint/no-input-rename": "error",
        "@angular-eslint/no-inputs-metadata-property": "error",
        "@angular-eslint/no-output-rename": "error",
        "@angular-eslint/no-outputs-metadata-property": "error",
        "@angular-eslint/use-lifecycle-interface": "error",
        "@angular-eslint/use-pipe-transform-interface": "error",
        "@typescript-eslint/no-explicit-any": [
            "error",
            {
                "fixToUnknown": true,
                "ignoreRestArgs": true
            }
        ],
        "@typescript-eslint/explicit-function-return-type": "off",
        "@typescript-eslint/consistent-type-definitions": ["error", "interface"],
        "@typescript-eslint/unbound-method": "off",
        "@typescript-eslint/array-type": "error",
        "@typescript-eslint/indent": "error",
        "@typescript-eslint/interface-name-prefix": "off",
        "@typescript-eslint/member-delimiter-style": [
            "off",
            {
                "multiline": {
                    "delimiter": "none",
                    "requireLast": true
                },
                "singleline": {
                    "delimiter": "semi",
                    "requireLast": false
                }
            }
        ],
        "@typescript-eslint/no-parameter-properties": "off",
        "@typescript-eslint/no-use-before-define": "error",
        "@typescript-eslint/prefer-for-of": "error",
        "@typescript-eslint/prefer-function-type": "error",
        "@typescript-eslint/quotes": [
            "error",
            "double"
        ],
        "@typescript-eslint/semi": [
            "off",
            null
        ],
        "@typescript-eslint/type-annotation-spacing": "off",
        "@typescript-eslint/unified-signatures": "error",
        "no-prototype-builtins": "off",
        "arrow-parens": ["error", "always"],
        "camelcase": "error",
        "comma-dangle": "error",
        "complexity": "off",
        "constructor-super": "error",
        "dot-notation": "error",
        "eol-last": "off",
        "eqeqeq": [
            "error",
            "smart"
        ],
        "guard-for-in": "error",
        "id-match": "error",
        "import/order": "off",
        "linebreak-style": "off",
        "max-classes-per-file": [
            "error",
            1
        ],
        "max-len": [
            "error",
            {
                "code": 120
            }
        ],
        "new-parens": "off",
        "newline-per-chained-call": "off",
        "no-bitwise": "error",
        "no-caller": "error",
        "no-cond-assign": "error",
        "no-console": "error",
        "no-debugger": "error",
        "no-empty": [
            "error",
            {
                "allowEmptyCatch": true
            }
        ],
        "no-eval": "error",
        "no-extra-semi": "error",
        "semi": ["error", "always"],
        "semi-spacing": ["error", {"before": false, "after": true}],
        "no-fallthrough": "off",
        "no-invalid-this": "off",
        "no-irregular-whitespace": "off",
        "no-multiple-empty-lines": ["error", { "max": 1 }],
        "no-new-wrappers": "error",
        "no-shadow": [
            "error",
            {
                "hoist": "all"
            }
        ],
        "no-throw-literal": "error",
        "no-trailing-spaces": "error",
        "no-undef-init": "error",
        "no-underscore-dangle": "off",
        "no-unsafe-finally": "error",
        "no-unused-expressions": "error",
        "no-unused-labels": "error",
        "no-unused-vars": ["error", { "argsIgnorePattern": "^_" }],
        "object-shorthand": "error",
        "one-var": [
            "error",
            "never"
        ],
        "prefer-arrow/prefer-arrow-functions": "off",
        "quote-props": "off",
        "radix": "error",
        "space-before-function-paren": ["error", "never"],
        "space-in-parens": ["error", "never"],
        "spaced-comment": "error",
        "use-isnan": "error",
        "valid-typeof": "off",
        "brace-style": "error",
        "array-bracket-newline": ["error", { "minItems": 1 }],
        "no-unreachable": "error",
        "no-self-assign": "error",
        "vars-on-top": "error",
        "array-bracket-spacing": ["error", "never"],
        "comma-spacing": ["error", { "before": false, "after": true }],
        "comma-style": ["error", "last"],
        "lines-between-class-members": ["error", "always", { exceptAfterSingleLine: true }],
        "no-whitespace-before-property": "error",
        "object-curly-spacing": ["error", "always"],
        "space-before-blocks": "error",
        "space-infix-ops": "error",
        "no-multi-spaces": "error",
        "no-var": "error",
        "no-duplicate-imports": "error",
        "no-dupe-class-members": "error"
    },
    "overrides": [
        {
            "files": [
                "src/app/datastore/entities/**/*.ts"
            ],
            "rules": {
                "dot-notation": "off",
                "@typescript-eslint/no-unsafe-assignment": "off",
                "@typescript-eslint/no-unsafe-member-access": "off",
                "@typescript-eslint/no-unsafe-call": "off"
            }
        }
    ]
};
