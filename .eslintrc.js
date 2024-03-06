module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
  ],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'no-shadow': 'off',
    'validateLineBreaks': 'LF',
  },
};
