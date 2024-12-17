const signUp = (req,res) =>{
    const {email, password} = req.body;
    
    if (!email || !password){
        return res.status(400).json({message: `Please provide email and password`});
    }

    console.log(`Sign-Up request received: `, {email, password});
    res.status(201).json({message: `User created successfully!`});
};

const signIn = (req,res) =>{
    const {email, password} = req.body;

    if (!email || !password){
        return res.status(400).json({message: `Please provide email and password`});
    }

    console.log(`Sign-In request received: `, {email, password});
    res.status(200).json({message: `User logged in successfully!`});
};

module.exports = {signUp, signIn};