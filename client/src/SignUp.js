import React, {useState} from 'react';
import axios from 'axios';

function SignUp(){
    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState ('');
    const [confirmpassword,setConfirmPassword] = useState('');
    const [message,setMessage] = useState('');

    const handleSubmit = async (e) =>{
        e.preventDefault();
        console.log('email:', email);
        console.log('username:', username);
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
                    <label>Username</label>
                    <input
                    type = "username"
                    value = {username}
                    onChange = {(e) => setUsername(e.target.value)}
                    placeholder = "Enter your username" />
                </div>
                <div>
                    <label>Password</label>
                    <input
                    type = "password"
                    value = {password}
                    onChange = {(e) => setPassword(e.target.value)}
                    placeholder = "Enter your password" />
                </div>
                <div>
                    <label>Confirm Password</label>
                    <input
                    type = "password"
                    value = {confirmpassword}
                    onSubmit = {(e) => {
                        if (password === e.target.value){
                            setPassword(e.target.value);
                        }
                        else{
                            alert('Passwords do not match');
                        }
                    }}
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
        </div>
    );

}
export default SignUp;