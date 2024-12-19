// Import React and necessary hooks, along with axios for HTTP requests
import React, { useState } from 'react';
import axios from 'axios';

function SignUp() {
    // State hooks for email, password, confirm password, message, and password errors
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [passworderrors, setPasswordErrors] = useState([]);

    // Function to validate password requirements (length, letters, special chars)
    const validatePassword = () => {
        const errors = [];
        if (password.length < 8) errors.push('Password must be at least 8 characters long.');
        if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter.');
        if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter.');
        if (!/\d/.test(password)) errors.push('Password must contain at least one number.');
        if (!/[!@#$%^&*]/.test(password)) errors.push('Password must contain at least one special character (!, @, #, $, %, etc.).');
        return errors; // Return an array of password validation errors
    }

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent page refresh on form submit

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // regex to validate email format
        if (!emailRegex.test(email)) {
            alert("Email must be valid");
            return; // Stop if email is invalid
        }

        // Validate password according to the rules
        const errors = validatePassword();
        if (errors.length > 0) {
            setPasswordErrors(errors); // Show password errors
            alert("Please fix password issues before submitting.");
            return; // Stop if password is invalid
        }

        // Check if passwords match
        if (password !== confirmpassword) {
            alert("Passwords must match");
            return; // Stop if passwords don't match
        }

        setPasswordErrors([]); // Clear password errors if everything is valid
        console.log('email:', email); // Log email value for debugging
        console.log('password:', password); // Log password value for debugging

        try {
            // Send a POST request to the backend API with the email and password
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
            });
            setMessage(response.data.message); // Set the response message from the server
            console.log('Sign-Up Successful:', response.data); // Log the success message
        } catch (e) {
            console.error('Sign-Up Failed:', e.response?.data || e.message); // Log any errors
        }
    };

    return (
        <div className="SignUp-Container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                {/* Email input field */}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        placeholder="Enter your email"
                        value={email}
                    />
                </div>
                {/* Password input field */}
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value); // Update password state on change
                        }}
                        placeholder="Enter your password"
                    />
                </div>
                {/* Confirm password input field */}
                <div>
                    <label>Confirm Password</label>
                    <input
                        type="password"
                        value={confirmpassword}
                        onChange={(e) => {
                            setConfirmPassword(e.target.value); // Update confirm password state on change
                        }}
                        placeholder="Re-enter Password"
                    />
                </div>
                <div>
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            {/* Link to the Sign In page if the user already has an account */}
            <p>Already have an account? Sign In</p>
            <a href="/signin"><button type="sign-in-link"> Sign In</button></a>
            
            {/* Display password validation errors */}
            {passworderrors.map((error, index) => (
                <p key={index} style={{ color: 'red', margin: 0 }}>{error}</p>
            ))}
        </div>
    );
}

export default SignUp;
