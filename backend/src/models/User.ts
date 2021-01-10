import { Document, model, Schema } from 'mongoose';

interface UserDoc extends Document {
    username: string,
    password: string,
    contact: Schema.Types.ObjectId,
    sessionId: string
}

export const userSchema = new Schema({
    username: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'contacts'
    },
    sessionId: {
        type: String
    }
});

export const User = model<UserDoc>('users', userSchema);