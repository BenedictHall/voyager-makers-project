import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { isEmail, isStrongPassword } from "validator";
import { signup } from "../../services/authentication";

export const SignupPage = () => {
    const [firstname, setFirstname] = useState("");
    const [lastname, setLastname] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    
    const [error, setError] = useState("");

    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (firstname.length < 1) {
            setError('Please enter your first name.');
            return;
        }

        if (lastname.length < 1) {
            setError('Please enter your last name.');
            return;
        }
        if (username.length < 5){
            setError("Username must be at least 5 characters.");
            return;
        }

        if (!isEmail(email)){
            setError("Please enter a valid email address.");
            return;
        }

        if (!isStrongPassword(password)){
            setError("Password must be at least 8 characters, with at least one special character, one uppercase and one lower case.")
            return; 
        }
        try {
            await signup(firstname, lastname, username, email, password,  );
            console.log("redirecting...:");
            navigate("/login");
        } catch (err) {
            console.error(err);
            console.log("Error: !!!!: ", err.message);
            if (err.message === "Username already exists") {
                setError("Username already exists. Please enter a valid username.");
            }else if (err.message === "Email already exists") {
                setError("Email already exists. Please enter a valid email address.");
            } else {
                setError("An error occurred. Please try again later.");
            }
            navigate("/signup");
        }
    };

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handleFirstnameChange = (event) => {
        setFirstname(event.target.value);
    };

    const handleLastnameChange = (event) => {
        setLastname(event.target.value);
    };

    return (
        <>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
            <label htmlFor="firstname">Firstname:</label>
            <input
                placeholder="Firstname"
                id="firstname"
                type="firstname"
                value={firstname}
                onChange={handleFirstnameChange}
            />
            <br />
            <label htmlFor="lastname">Lastname:</label>
            <input
                placeholder="Lastname"
                id="lastname"
                type="lastname"
                value={lastname}
                onChange={handleLastnameChange}
            />
            <br />
            <label htmlFor="username">Username:</label>
            <input
                placeholder="Username"
                id="username"
                type="username"
                value={username}
                onChange={handleUsernameChange}
            />
            <br />
            <label htmlFor="email">Email:</label>
            <input
                id="email"
                type="text"
                value={email}
                onChange={handleEmailChange}
            />
            <br />
            <label htmlFor="password">Password:</label>
            <input
                placeholder="Password"
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
            <span>Already have an account? <a href="/login">Log in</a></span>
        </div>
        </>
    );
};