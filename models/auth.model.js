import { db } from '../lib/database.lib.js';
import Constants from '../lib/constants.lib.js';

const dupeCheck = async (username) => {
    try {
        const user = await db.dbUsers().findOne({ username }, {projection: Constants.DEFAULT_PROJECTION} );
        
        if (user.username) {
            return {
                isDupe: true,
                message: 'Username already exists'
            };
        } else {
            return {
                isDupe: false,
                message: 'Username available'
            };
        }
    } catch (error) {
        return error;
    }
}

export default class AuthM {

    static findUserByUsername = async (username) => {
        try {
            return await db.dbUsers().findOne({ username });
        } catch (error) {
            console.error('Error finding user by username in DB: ', error);
            return error;
        }
    }

    static addUser = async (user) => {
        try {
            const dc = await dupeCheck(user.username);
            if (dc.isDupe) {
                return dc;
            } else {                
                const result = await db.dbUsers().insertOne(user);
                if (result.acknowledged) {
                    return await this.findUserByUsername(user.username);
                };
            };
        } catch (error) {
            throw new Error('Error adding user: ' + error.message);
        };
    };
};
