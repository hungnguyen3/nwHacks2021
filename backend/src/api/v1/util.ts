import { User, UserDoc } from '../../models/User';

class AuthResult {
    private readonly result: boolean;
    private readonly data: UserDoc | null;

    constructor(result: boolean, data: UserDoc | null) {
        this.result = result;
        this.data = data;
    }

    get sessionId() {
        return this.data ? this.data.sessionId : "";
    }

    get userId() {
        return this.data ? this.data._id : "";
    }

    get ok() {
        return this.result;
    }
}

export const authenticate = async(sessionId: string) => {
    const user = await User.findOne({ sessionId });
    if (user != null) {
        return new AuthResult(true, user);
    }
    return new AuthResult(false, null);
}