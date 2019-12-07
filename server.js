const express = require('express');
const bodyParser = require('body-parser');
const User = require('./models/user');
const bcrypt = require('bcrypt');
const app = express();

app.use(bodyParser.json());

app.post('/login', async (request, response) => {
    if (!request.body.email || !request.body.password) response.status(400).json({
        status: false,
        message: 'Email and password is required',
    })
    const user = await User.findAll({
        email: request.body.email,
    });

    if (!user) response.status(404).json({
        status: false,
        messae: 'Username or password is invalid',
    });

    const compareHash = bcrypt.compareSync(request.body.password, user.password);
});

app.post('/register', async (request, response) => {
    
    const email = request.body.email;
    const name = request.body.name;
    const password = request.body.password;
    const saltRounds = 10;
    const salt = bcrypt.genSaltSync(saltRounds);
    const hashedPassword = bcrypt.hashSync(password, salt);

    const existingUser = User.findAll({
        email: email,
    });

    if (existingUser) response.status(400).json({
        status: false,
        message: 'User with that email already exists',
    });

    User.create({
        email: email,
        name: name,
        password: hashedPassword
    }).then((user) => {
        response.json({
            status: true,
            data: user,
        });
    }, validation => {
        response.status(400).json({
            errors: validation.errors.map((error) => {
                return {
                    attribute: error.path,
                    message: error.message,
                };
            })
        })
    });
});

app.listen(8000);