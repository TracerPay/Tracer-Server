import jwt from 'jsonwebtoken';
import AuthCoordinator from '../coordinators/auth.coordinator.js';

export const login = async (req, res) => {
    try {
        console.log(req.body);
        const { username, password } = req.body;
        const user = await AuthCoordinator.loginUser(username, password);
        if (!user) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        
        const token = jwt.sign(
            { isAdmin: true },
            process.env['JWT_SECRET'],
            { expiresIn: '1h' }
        );
        res.status(200).json({ message: 'Login successful', token });
    } catch (error) {
        console.error('Error logging in user: ', error.message);
        res.status(400).json({ message: error.message });
    }
};

export const signup = async (req, res) => {
    try {
        const result = await AuthCoordinator.addUser(req.body);
        console.log(result)
        if (result.isDupe) {
            res.status(200).json(result);
        } else {
            res.status(200).json(result);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

