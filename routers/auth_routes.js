const express = require('express');
const User = require('../models/user');
const AuthToken = require('../models/auth_token');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config');
const router = express.Router();

router.route('/login')
    .post(async (request, response) => {
        if (!request.body.email || !request.body.password) response.status(400).json({
            status: false,
            message: 'Email and password is required',
        })
        const user = await User.findAll({
            email: request.body.email,
        });
    
        if (!user) response.status(404).json({
            status: false,
            message: 'Username or password is invalid',
        });
    
        const compareHash = bcrypt.compareSync(request.body.password, user[0].password);
    
        if (!compareHash) response.status(404).json({
            status: false,
            message: 'Username or password is invalid',
        });

        const token = jwt.sign({user: user}, config.secret);

        AuthToken.create({
            'user_id': user.id,
            'token': token,
        });

        response.json({
            status: true,
            data: {
                token: token,
                user: user,
            }
        })
    });

router.route('/register')
    .post(async (request, response) => {
    
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

module.exports = router;