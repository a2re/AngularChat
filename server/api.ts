import * as express from 'express';
import UserCtrl from "./controllers/user";

export default function setAPI(app) {

    const router = express.Router();

    const userCtrl = new UserCtrl();
    
    app.use('/api', router);

    app.post('/api/authenticate', (req: express.Request, res: express.Response) => userCtrl.login(req, res));
    app.get('/api/users', (req, res) => userCtrl.getAll(req, res))

    app.get('/api/populate', (req, res) => userCtrl.populate(req, res))

}
