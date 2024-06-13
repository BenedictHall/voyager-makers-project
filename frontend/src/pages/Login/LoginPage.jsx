import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { login } from "../../services/authentication";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const responseLogin = await login(email, password);
      localStorage.setItem("token", responseLogin.token);
      localStorage.setItem('userId', responseLogin.userId);
      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      setError('Invalid login');
      setError('Invalid login');
      navigate("/login");
    }
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={email}
          onChange={handleEmailChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
        <br />
        {error && <p role="error" className="error">{error}</p>}
        <input role="submit-button" id="submit" type="submit" value="Submit" />
      </form>
      <div>
      <span>Don&lsquo;t have an account? <a href="/signup">Sign up</a></span>
      </div>
      <div>
      <span>Don&lsquo;t have an account? <a href="/signup">Sign up</a></span>
      </div>
    </>
  );
};