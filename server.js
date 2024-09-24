const express = require("express");
const path = require("path");
const { User, Order } = require("./mongo"); // Import User and Order models
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const templatePath = path.join(__dirname, 'templates');
const publicPath = path.join(__dirname, 'public');

app.set('view engine', 'hbs');
app.set('views', templatePath);
app.use(express.static(publicPath));

// Signup Route
app.get('/signup', (req, res) => {
    res.render('signup');
});

// Login Route
app.get('/', (req, res) => {
    res.render('login');
});

// Handle Signup
app.post('/signup', async (req, res) => {
    const userData = {
        name: req.body.name,
        password: req.body.password,
        email: req.body.email,
        phone: req.body.phone
    };

    try {
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(400).send("User already exists");
        }
        const newUser = new User(userData);
        await newUser.save();
        res.status(201).render("home", { naming: req.body.name });
    } catch (error) {
        res.status(500).send("Server error: " + error);
    }
});

// Handle Login
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ name: req.body.name });
        if (!user || user.password !== req.body.password) {
            return res.status(400).send("Incorrect username or password");
        }
        res.status(200).render("home", { naming: user.name });
    } catch (error) {
        res.status(500).send("Server error: " + error);
    }
});

// Start Server
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
