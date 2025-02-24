import { expect, test } from "vitest";
import { createUser } from "./createUser"; // Import the action we want to test

// Test the createUser action
test("createUser should successfully create a user when valid data is provided", async () => {
  const userData = { name: "John Doe", email: "john.doe@example.com" };

  // Run the action with the sample data
  const result = await createUser(userData);

  // Assertions
  expect(result).toHaveProperty("id"); // Ensure that the returned object has an "id"
  expect(result.name).toBe(userData.name); // Ensure the name is correct
  expect(result.email).toBe(userData.email); // Ensure the email is correct
});

test("createUser should throw an error if name or email is missing", async () => {
  const invalidUserData = { name: "", email: "invalid@example.com" };

  // Test that an error is thrown for invalid input
  await expect(createUser(invalidUserData)).rejects.toThrow("Name and email are required");
});
