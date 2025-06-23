export default function validateFields(
  name1: string,
  name2: string,
  phone: string,
  email: string,
  password: string,
  confirmPassword: string,
  gender: string,
  regType: string
): {
  name1: string;
  name2: string;
  phone: string;
  email: string;
  password: string;
  gender: string;
  regType: string;
} {
  if (!name1 || !name2 || !phone || !email || !password || !confirmPassword || !gender || !regType) {
    throw new Error("All fields are required");
  }

  if (password !== confirmPassword) {
    throw new Error("Passwords do not match");
  }

  if (!/^[a-zA-Z]+$/.test(name1) || !/^[a-zA-Z]+$/.test(name2)) {
    throw new Error("Name fields must contain only letters");
  }

  if (!/^\d{10}$/.test(phone)) {
    throw new Error("Phone number must be 10 digits");
  }

  if (!/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/.test(email)) {
    throw new Error("Invalid email format");
  }

  if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/.test(password)) {
    throw new Error("Password must be at least 8 characters long and contain both letters and numbers");
  }

  return {
    name1,
    name2,
    phone,
    email,
    password,
    gender,
    regType,
  };
}
