import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

export const config = {
  // Valid credentials array for parameterized tests
  validCredentials: [
    {
      username: process.env.STANDARD_USER || "standard_user",
      password: process.env.STANDARD_PASSWORD || "secret_sauce",
    },
    {
      username: process.env.PROBLEM_USER || "problem_user",
      password: process.env.PROBLEM_PASSWORD || "secret_sauce",
    },
    {
      username:
        process.env.PERFORMANCE_GLITCH_USER || "performance_glitch_user",
      password: process.env.PERFORMANCE_GLITCH_PASSWORD || "secret_sauce",
    },
  ],

  // Invalid credentials array for parameterized tests
  invalidCredentials: [
    {
      username: process.env.LOCKED_OUT_USER || "locked_out_user",
      password: process.env.LOCKED_OUT_PASSWORD || "secret_sauce",
    },
    {
      username: process.env.INVALID_USER || "invalid_user",
      password: process.env.INVALID_PASSWORD || "invalid_password",
    },
    {
      username: process.env.EMPTY_USER || "",
      password: process.env.EMPTY_PASSWORD || "",
    },
  ],
};
