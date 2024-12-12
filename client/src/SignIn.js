import React, {useState} from 'react';

function SignIn(){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) =>{
        e.preventDefault(); // prevent the page from refreshing
        console.log('email:', email);
        console.log('Password:', password);
    };

    return (
        <div classname = "sign-in-container">
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