import bcrypt from 'bcryptjs';

export default async function hashPassword(plainPassword: string): Promise<string> {
  try {

    const passwordStr = String(plainPassword);

    // Generate a salt with 10 rounds (standard)
    const salt = await bcrypt.genSalt(10);

    // Hash the password with the salt
    const hashed = await bcrypt.hash(passwordStr, salt);

    return hashed;
  } catch (err) {
    console.error('Error hashing password:', err);
    throw err;
  }
}