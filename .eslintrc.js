/**
 * ESLint Configuration - Minimal Working Version
 * 
 * This configuration focuses on essential rules without conflicts
 */

module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true
  },
  
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react/recommended',
    'plugin:react-hooks/recommended'
  ],
  
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true
    },
    ecmaVersion: 12,
    sourceType: 'module'
  },
  
  plugins: [
    '@typescript-eslint',
    'react',
    'react-hooks'
  ],
  
  rules: {
    // TypeScript rules
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/consistent-type-imports': 'off',
    
    // React rules
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    'react/self-closing-comp': 'warn',
    
    // General rules
    'no-console': 'warn',
    'no-trailing-spaces': 'warn',
    'comma-dangle': 'off',
    'quotes': 'off',
    'semi': 'off',
    'indent': 'off',
    
    // Disable problematic rules
    'react-hooks/exhaustive-deps': 'off'
  },
  
  settings: {
    react: {
      version: 'detect'
    }
  }
};
