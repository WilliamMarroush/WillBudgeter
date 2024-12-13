import React, {useState} from 'react';

function SignUp(){
    const [email,setEmail] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState ('');

    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log('email:', email);
        console.log('username:', username);
        console.log('password:', password);
    }
    return(
        <div>
            <h2>Sign Up</h2>
            <form onSubmit = {handleSubmit}>
                <div>
                    <label>Email</label>
                    <input
                    type = "email"
                    value = {email}
                    onChange = {(e) => setEmail(e.target.value)}
                    placeholder = "Enter your email" />
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
                    value = {password}
                    onSubmit = {(e) => {
                        if (password === e.target.value){
                            setPassword(e.target.value);
                        }
                        else{
                            alert('Passwords do not match');
                        }
                    }}
                    placeholder = "Re-enter Password" />
                </div>
                <div>
                    <button type = "submit">Sign Up</button>
                </div>
            </form>
        </div>
    );

}
export default SignUp;