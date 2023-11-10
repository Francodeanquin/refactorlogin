import { userModel } from '../db/models/user.model.js';
import BasicManager from './basicManager.js';

class UsersManager extends BasicManager {
    constructor() {
        super(userModel);
    }
    async findByEmail(email) {
        const response = await userModel.findOne({ email: email }).lean();
        return response;
    }
}

export const usersManager = new UsersManager();