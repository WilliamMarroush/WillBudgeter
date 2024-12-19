// Import React and necessary hooks, as well as axios for HTTP requests
import React, { useState } from 'react';
import axios from 'axios';

function SignIn() {
    // State hooks for email, password, and message
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault(); // prevent the page from refreshing

        // Check if both email and password fields are filled out
        if (!email || !password) {
            alert('Both email and password are required.');
            return; // Stop function if fields are empty
        }

        console.log('email:', email); // Log email value for debugging
        console.log('Password:', password); // Log password value for debugging

        try {
            // Send a POST request to the backend API with the email and password
            const response = await axios.post('http://localhost:5000/api/auth/signin', {
                email,
                password,
            });
            setMessage(response.data.message); // Set the success message from the backend response
            console.log('Sign-Up Successful:', response.data); // Log the successful response
        } catch (e) {
            console.error('Sign-Up Failed:', e.response?.data || e.message); // Log any errors
        }
    };

    return (
        <div className="sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit={handleSubmit}>
                {/* Email input field */}
                <div>
                    <label>Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)} // Update email state on change
                        placeholder="Enter your email"
                    />
                </div>
                {/* Password input field */}
                <div>
                    <label>Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)} // Update password state on change
                        placeholder="Enter your password"
                    />
                </div>
                <button type="submit">Sign In</button>
            </form>
            {/* Link to the Sign Up page if the user doesn't have an account */}
            <p>Don't have an account? Sign up!</p>
            <a href="/signup"><button type="sign-up-link"> Sign Up</button></a>
        </div>
    );
};

export default SignIn;
