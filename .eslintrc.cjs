module.exports = {
    env: {
        browser: true,
        es2020: true,
        node: true,
    },
    extends: [
        'airbnb',
        'airbnb-typescript',
        'airbnb/hooks',
        'plugin:react/recommended',
        'plugin:@typescript-eslint/recommended',
        'plugin:prettier/recommended',
        'plugin:jest/recommended',
        'plugin:testing-library/react',
    ],
    overrides: [],
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        project: './tsconfig.json',
    },
    ignorePatterns: ['.eslintrc.cjs', 'vite.config.ts', 'jest.polyfills.js'],
    plugins: ['react', '@typescript-eslint', 'prettier', 'unused-imports'],
    rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        'react/react-in-jsx-scope': 0,
        'import/no-extraneous-dependencies': ['error', { devDependencies: true, }],
        'no-param-reassign': ['error', { props: false }],
        'import/prefer-default-export': 0,
        'react/require-default-props': 0,
        'react/jsx-props-no-spreading': 0,
        'react-hooks/exhaustive-deps': 0,
        'prettier/prettier': [
            'error',
            {
                endOfLine: 'auto',
            },
        ],
        'jsx-a11y/label-has-associated-control': [
            2,
            {
                assert: 'either',
            },
        ],
        'import/extensions': [
            'error',
            'ignorePackages',
            {
                '': 'never',
                'js': 'never',
                'jsx': 'never',
                'ts': 'never',
                'tsx': 'never'
            }
        ],
        'unused-imports/no-unused-imports': 'error',
        'no-console': 'error',
        'import/no-cycle': 1,
        'no-underscore-dangle': ['error', { allow: ['_place'] }],
    },
};