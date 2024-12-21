const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { pool } = require('../dbConnection');

const authController = {
    register: async (req, res) => {
        try {
            const { username, password } = req.body;
            const connection = await pool.getConnection();

            // Hash password
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert new user
            const [result] = await connection.query(
                'INSERT INTO User (username, password) VALUES (?, ?)',
                [username, hashedPassword]
            );

            // Generate token
            const token = jwt.sign(
                { userId: result.insertId, username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            connection.release();
            res.status(201).json({ 
                message: 'User registered successfully',
                token 
            });
        } catch (error) {
            if (error.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ error: 'Username already exists' });
            }
            res.status(500).json({ error: error.message });
        }
    },
    login: async (req, res) => {
        try {
            const { username, password } = req.body;
            const connection = await pool.getConnection();
            
            const [user] = await connection.query(
                'SELECT * FROM User WHERE username = ?',
                [username]
            );
            
            if (!user[0] || !(await bcrypt.compare(password, user[0].password))) {
                return res.status(401).json({ error: 'Invalid credentials' });
            }

            const token = jwt.sign(
                { userId: user[0].user_id, username: user[0].username },
                process.env.JWT_SECRET,
                { expiresIn: '24h' }
            );

            connection.release();
            res.json({ token });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
};

module.exports = authController;
