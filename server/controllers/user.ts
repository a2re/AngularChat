import { Response } from '@angular/http';
import User from '../models/user';
import { express } from 'express';
import * as jwt from 'jsonwebtoken';

export default class UserCtrl {
    private _model: User;
    constructor() {
        this._model = new User();
    }

    login(req: express.Request, res: express.Response) {
        var user = this._model.findUserByLogin(req.body.login);
        if (!user) return res.sendStatus(403);
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
    }

    getAll(req: express.Request, res: express.Response) {
        res.status(200).json(this._model.getAll().map(u => {
            return {
                login: u.login
            }
        }));
    }
}