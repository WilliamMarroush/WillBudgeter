import React, {useState} from 'react';
import axios from 'axios';

function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message,setMessage] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault(); // prevent the page from refreshing
        console.log('email:', email);
        console.log('Password:', password);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signin', {
                email,
                password,
            });
            setMessage(response.data.message);
            console.log('Sign-Up Successful:', response.data);}
        catch (e){
            console.error('Sign-Up Failed:', e.response?.data || e.message);
        }
    };

    return (
        <div className = "sign-in-container">
            <h2>Sign In</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>Email</label>
                    <input 
                    type = "email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder="Enter your email" />
                </div>
                <div>
                    <label>Password</label>
                    <input 
                    type = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder="Enter your password" />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <p>Don't have an account? Sign up!</p>
            <button type = "sign-up"> Sign Up</button>
        </div>
    );

};
export default SignIn;