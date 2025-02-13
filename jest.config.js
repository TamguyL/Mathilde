export default {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    setupFilesAfterEnv: ["<rootDir>/setupTests.ts"],
    transform: {
        "^.+\\.tsx?$": "ts-jest",  // transformation des fichiers TypeScript
        "^.+\\.css$": "jest-transform-stub",  // transformation des fichiers CSS
      },
      transformIgnorePatterns: [
        "/node_modules/(?!(your-module-name)/)",  // Si tu veux transformer des fichiers dans certains modules de node_modules
      ],
  };