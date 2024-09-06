import UsersModel from '../models/users.model.js';
import User from '../classes/user.class.js';
import bcrypt from 'bcryptjs';
import { v4 as UUID } from 'uuid';

export default class UsersCoordinator {

    static createUser = async (organizationID, user) => {
        try {
            const salt = await bcrypt.genSalt(10);

            // Generate a unique username and password
            const username = `${user.fName.slice(0, 1).toLowerCase()}${user.lName.toLowerCase()}${UUID().slice(0, 3)}`;
            const password = `${user.fName.slice(0, 1).toLowerCase()}${user.lName.slice(0, 5).toLowerCase()}${UUID().slice(0, 3)}`;

            // Hash the generated password
            const hashedPassword = await bcrypt.hash(password, salt);

            // Get organization
            const organization = await UsersModel.findOrganizationByID(organizationID);
            // Create a new user instance
            const newUser = new User(
                organization,
                user.fName,
                user.lName,
                user.email,
                username,   // Use generated username
                hashedPassword
            );
            newUser.organizationID = organizationID;
            
            console.log(newUser);
            // Save the user to the database
            const result = await UsersModel.addUser(newUser);
            if (result.acknowledged) {
                return {
                    username,
                    password
                };
            }
        } catch (error) {
            throw new Error('Error creating user: ' + error.message);
        }
    };

    static findUserByUsername = async (organizationID, username) => {
        try {
            const user = await UsersModel.findUserByUsername(username);
            return user;
        } catch (error) {
            throw new Error('Error finding user by username: ' + error.message);
        }
    };

    static getUsers = async (organizationID) => {
        try {
            const users = await UsersModel.getUsers(organizationID);
            return users;
        } catch (error) {
            throw new Error('Error getting users: ' + error.message);
        }
    };

    static updateUser = async (organizationID, username, update) => {
        try {
            const user = await UsersModel.findUserByUsername(organizationID, username);
            const updatedUser = new User(
                user.organizationID,
                user.fName,
                user.lName,
                user.username,
                user.password
            );
            updatedUser.updateUser(update);
            const result = await UsersModel.updateUser(organizationID, username, updatedUser);
            return result;
        } catch (error) {
            throw new Error('Error updating user: ' + error.message);
        }
    };

    static deleteUser = async (organizationID, username) => {
        try {
            const result = await UsersModel.deleteUser(organizationID, username);
            return result;
        } catch (error) {
            throw new Error('Error deleting user: ' + error.message);
        }
    };
}