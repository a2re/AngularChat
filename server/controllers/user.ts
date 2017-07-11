import { Response } from '@angular/http';
import User from '../models/user';
import BaseCtrl from './base';
import { express } from 'express';
import * as jwt from 'jsonwebtoken';

export default class UserCtrl extends BaseCtrl {
  model = User;

  login = (req, res) => {
    // var users = require("../users.json")
    // users.users.forEach(element => {
    //   let user = new User({username: element.login, email: element.login+"@localhost.test", password: "123456"});
    //   user.save();
    // });
    this.model.findOne({ email: req.body.email }, (err, user) => {
      if (!user) { return res.sendStatus(403); }
      user.comparePassword(req.body.password, (error, isMatch) => {
        if (!isMatch) { return res.sendStatus(403); }
        const token = jwt.sign({ user: user }, process.env.SECRET_TOKEN); // , { expiresIn: 10 } seconds
        res.status(200).json({ token: token });
      });
    });
  };

}
