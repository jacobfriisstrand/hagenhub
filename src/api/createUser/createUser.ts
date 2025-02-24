// Mock server action that handles creating a new user
export const createUser = async (userData: { name: string; email: string }) => {
  // Simulate user creation (In a real-world scenario, this would be saved to a database)
  if (!userData.name || !userData.email) {
    throw new Error("Name and email are required");
  }

  const newUser = {
    id: 1,
    ...userData,
  };

  return newUser;
};
