const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 5000;

const authRoutes = require('./routes/authRoutes');


app.use(cors());
app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/api/auth', authRoutes);

app.get(`/api/test`, (req,res) =>{
    res.send(`Server is running on port: ${PORT}`);
});

app.listen(PORT, ()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
});


