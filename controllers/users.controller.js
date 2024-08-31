import UsersCoordinator from '../coordinators/users.coordinator.js';

export default class UsersController {
    static createUser = async (req, res, next) => {
        try {
            const user = req.body;
            const result = await UsersCoordinator.createUser(req.params.organizationID, user);
            res.status(201).json(result);
        } catch (error) {
            next(error);
        }
    };

    static getUsers = async (req, res, next) => {
        try {
            const users = await UsersCoordinator.getUsers(req.params.organizationID);
            res.status(200).json(users);
        } catch (error) {
            next(error);
        }
    };

    static getUser = async (req, res, next) => {
        try {
            const user = await UsersCoordinator.findUserByUsername(req.params.organizationID, req.params.username);
            if (!user) {
                res.status(404).json({ message: 'User not found' });
            } else {
                res.status(200).json(user);
            }
        } catch (error) {
            next(error);
        }
    };

    static updateUser = async (req, res, next) => {
        try {
            const update = req.body;
            const result = await UsersCoordinator.updateUser(req.params.organizationID, req.params.username, update);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };

    static deleteUser = async (req, res, next) => {
        try {
            const result = await UsersCoordinator.deleteUser(req.params.organizationID, req.params.username);
            res.status(200).json(result);
        } catch (error) {
            next(error);
        }
    };
};