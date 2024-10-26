import UserService from '../services/UserService.js';

class UserController {
    index(req, res) {
        UserService.index(req, res);
    }
    updateUser(req, res) {
        UserService.updateUser(req, res);
    }
    removeFood = UserService.removeFood;

    getById = UserService.getUserById;

    getUserByEmail = UserService.getUserByEmail;
}

export default new UserController();
