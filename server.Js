const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.json());

// الاتصال بقاعدة بيانات MongoDB
mongoose.connect('mongodb://localhost:27017/onlinecasino', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

// نموذج المستخدم
const User = mongoose.model('User', {
    username: String,
    password: String
});

// تسجيل المستخدم
app.post('/signup', (req, res) => {
    const { username, password } = req.body;
    const newUser = new User({ username, password });
    newUser.save()
        .then(() => res.json({ message: 'User registered successfully!' }))
        .catch(err => res.status(400).json({ message: 'Error registering user', error: err }));
});

// تسجيل الدخول
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    User.findOne({ username, password })
        .then(user => {
            if (user) {
                res.json({ message: 'Login successful!' });
            } else {
                res.status(400).json({ message: 'Invalid credentials' });
            }
        })
        .catch(err => res.status(400).json({ message: 'Error logging in', error: err }));
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});
