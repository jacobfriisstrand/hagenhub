import { expect, test } from "vitest";
import { signUpAction } from "./sign-up";
import { SignUpActionState } from "@/lib/schemas/signup-schema";

test("signUpAction should successfully process valid data", async () => {
  const formData = new FormData();
  formData.append("email", "john.doe@example.com");
  formData.append("password", "Password123!");

  const prevState: SignUpActionState = {};
  const result = await signUpAction(prevState, formData);

  // Assertions
  expect(result.form).toEqual({
    email: "john.doe@example.com",
    password: "Password123!",
  });
  expect(result.errors).toEqual({});
});

test("signUpAction should return validation errors for invalid data", async () => {
  const formData = new FormData();
  formData.append("email", "john.doe@example.com");
  formData.append("password", "weak");

  const prevState: SignUpActionState = {};
  const result = await signUpAction(prevState, formData);

  // Assertions
  expect(result.errors).toBeDefined();
  expect(result.errors?.password).toBeDefined(); // Only check password error since email is valid
});

test("signUpAction should handle malformed data (bypassing client validation)", async () => {
  const formData = new FormData();
  formData.append("email", "not-an-email"); // Intentionally invalid email
  formData.append("password", ""); // Empty password

  const prevState: SignUpActionState = {};
  const result = await signUpAction(prevState, formData);

  // Assertions
  expect(result.errors).toBeDefined();
  expect(result.errors?.email).toContain("Please enter a valid email.");
  expect(result.errors?.password).toBeDefined();
});

test("signUpAction should handle missing fields (bypassing client validation)", async () => {
  const formData = new FormData();
  // Intentionally not adding any fields

  const prevState: SignUpActionState = {};
  const result = await signUpAction(prevState, formData);

  // Assertions
  expect(result.errors).toBeDefined();
  expect(result.errors?.email).toBeDefined();
  expect(result.errors?.password).toBeDefined();
});

test("signUpAction should handle SQL injection attempts", async () => {
  const formData = new FormData();
  formData.append("email", "'; DROP TABLE users; --");
  formData.append("password", "' OR '1'='1");

  const prevState: SignUpActionState = {};
  const result = await signUpAction(prevState, formData);

  // Assertions
  expect(result.errors).toBeDefined();
  expect(result.errors?.email).toContain("Please enter a valid email.");
  // Check that there are validation errors, but don't assume specific structure
  expect(Object.keys(result.errors || {}).length).toBeGreaterThan(0);
});
