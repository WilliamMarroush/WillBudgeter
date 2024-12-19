import React, {useState} from 'react';
import axios from 'axios';

function SignUp(){
    const [email,setEmail] = useState('');
    const [password, setPassword] = useState ('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');
    const [passworderrors, setPasswordErrors] = useState([]);

    const validatePassword = ()=>{
        const errors = [];
        if (password.length < 8) errors.push('Password must be at least 8 characters long.');
        if (!/[a-z]/.test(password)) errors.push('Password must contain at least one lowercase letter.');
        if (!/[A-Z]/.test(password)) errors.push('Password must contain at least one uppercase letter.');
        if (!/\d/.test(password)) errors.push('Password must contain at least one number.');
        if (!/[!@#$%^&*]/.test(password)) errors.push('Password must contain at least one special character (!, @, #, $, %, etc.).');
        return errors;
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)){
            alert("Email must be valid");
            return;
        }

        const errors = validatePassword();
        if (errors.length > 0) {
            setPasswordErrors(errors);
            alert("Please fix password issues before submitting.");
            return;
        }

        if (password !== confirmpassword){
            alert("Passwords must match");
            return;
        }

        setPasswordErrors([]);
        console.log('email:', email);
        console.log('password:', password);

        try {
            const response = await axios.post('http://localhost:5000/api/auth/signup', {
                email,
                password,
            });
            setMessage(response.data.message);
            console.log('Sign-Up Successful:', response.data);}
        catch (e){
            console.error('Sign-Up Failed:', e.response?.data || e.message);
        }
        
    };
    return(
        <div className = "SignUp-Container">
            <h2>Sign Up</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                    type = "email"
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder = "Enter your email"
                    value = {email} />
                </div>
                <div>
                    <label>Password</label>
                    <input
                    type = "password"
                    value = {password}
                    onChange = {(e) => {
                        setPassword(e.target.value);
                    }
                    }
                    placeholder = "Enter your password" />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                    type = "password"
                    value = {confirmpassword}
                    onChange = {(e) => {
                        setConfirmPassword(e.target.value)
                    }}
                    placeholder = "Re-enter Password" />
                </div>
                <div>
                    <button type = "submit">Sign Up</button>
                </div>
            </form>
            <p>Already have an account? Sign In</p>
            <a href="/signin"><button type = "sign-in-link"> Sign In</button></a>
            {passworderrors.map((error, index) => (
                    <p key={index} style={{ color: 'red', margin: 0 }}>{error}</p>
                    ))}
        </div>
    );

}
export default SignUp;