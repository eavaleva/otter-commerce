module.exports = {
    env: {
        node: true,
        jest: true,
    },
    extends: ['airbnb-base'],
    rules: {
        'no-console': 'warn',
        'no-unused-vars': ['error', { argsIgnorePattern: 'next' }],
    },
};
