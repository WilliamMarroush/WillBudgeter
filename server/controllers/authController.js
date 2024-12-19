// signUp function to handle user registration
const signUp = (req, res) => {
    const { email, password } = req.body; // Destructure email and password from the request body
    
    // Check if both email and password are provided, if not send an error response
    if (!email || !password) {
        return res.status(400).json({ message: `Please provide email and password` });
    }

    // Log the received email and password for debugging
    console.log(`Sign-Up request received: `, { email, password });
    
    // Send a success response indicating the user was created
    res.status(201).json({ message: `User created successfully!` });
};

// signIn function to handle user login
const signIn = (req, res) => {
    const { email, password } = req.body; // Destructure email and password from the request body

    // Check if both email and password are provided, if not send an error response
    if (!email || !password) {
        return res.status(400).json({ message: `Please provide email and password` });
    }

    // Log the received email and password for debugging
    console.log(`Sign-In request received: `, { email, password });
    
    // Send a success response indicating the user logged in successfully
    res.status(200).json({ message: `User logged in successfully!` });
};

// Export the functions so they can be used in other files (e.g., routes)
module.exports = { signUp, signIn };
