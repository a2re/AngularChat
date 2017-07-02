const users = require("../users.json");

export default class User {

    findUserByLogin(login) {
        return users.users.find(u => u.login === login);
    }

    getAll() {
        return users.users;
    }
}