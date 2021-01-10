import bcrypt from 'bcryptjs';
import { Router } from 'express';
import { v4 as uuid } from 'uuid';

import { User, UserDoc } from '../../models/User';

const app = Router();

class AuthResult {
    private readonly result: boolean;
    private readonly data: UserDoc | undefined;

    constructor(result: boolean, data: UserDoc | undefined) {
        this.result = result;
        this.data = data;
    }

    get id() {
        return this.data ? this.data.sessionId : "";
    }

    get userId() {
        return this.data ? this.data._id : "";
    }

    get ok() {
        return this.result;
    }
}

const generateUniqueId = async(): Promise<string> => {
    const sessionId = uuid();
    const user = await User.findOne({ sessionId });
    return user != null ? generateUniqueId() : sessionId;
}

export const authenticate = async(sessionId: string) => {
    const user = await User.findOne({ sessionId });
    if (user != null) {
        return new AuthResult(true, user);
    }
    return new AuthResult(false, undefined);
}

app.post('/', async (req, res) => { 
    const user = await User.findOne({ username: req.body.username });
    if (!user || !bcrypt.compareSync(req.body.password, user.password)) {
        res.status(401);
        res.json({ message: "invalid credentials" });
    } else {
        user.sessionId = await generateUniqueId();
        user.save(err => {
            if (err) {
                res.json({ message: "unknown error" });
                console.error(err);
            } else {
                res.json({ sessionId: user.sessionId });
            }
        })    
    }
})

export default app;