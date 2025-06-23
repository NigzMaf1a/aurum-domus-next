function Register() {
  return (
    <div className="register">
      <h1>Register</h1>
      <form>
        <label htmlFor="name1">Username:</label>
        <input type="text" id="name1" name="name1" required />
        <label htmlFor="name2">Full Name:</label>
        <input type="text" id="name2" name="name2" required placeholder="Please enter your full name" />
        <label htmlFor="phone">Phone Number:</label>
        <input type="tel" id="phone" name="phone" required placeholder="Please enter your phone number" />
        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" required placeholder="Please enter your email" />
        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" required placeholder="Please enter your password" />
        <label htmlFor="confirmPassword">Confirm Password:</label>
        <input type="password" id="confirmPassword" name="confirmPassword" required placeholder="Please confirm your password" />
        <label htmlFor="gender">Gender:</label>
        <select id="gender" name="gender" required>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
        <label htmlFor="registrationType">Registration Type:</label>
        <select id="registrationType" name="registrationType" required>
          <option value="owner">Owner</option>
          <option value="manager">Manager</option>
          <option value="customer">Customer</option>
          <option value="chef">Chef</option>
          <option value="waiter">Waiter</option>
          <option value="janitor">Janitor</option>
          <option value="supplier">Supplier</option>
          <option value="delivery">Delivery</option>
        </select>
        <button type="submit">Register</button>
        <p>Already have an account? <a href="/login">Login here</a></p>
        <p>By registering, you agree to our <a href="/terms">Terms of Service</a> and <a href="/privacy">Privacy Policy</a>.</p>
      </form>
    </div>
  );
}
export default Register;