/** @type {import('jest').Config} */
const config = {
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "<rootDir>/node_modules/babel-jest"
  },
  verbose: false,
};

export default config