import { model, Schema } from 'mongoose';

export const userSchema = new Schema({
    username: {
        type: String, required: true, unique: true
    },
    password: {
        type: String, required: true
    },
    contact: {
        type: Schema.Types.ObjectId,
        ref: 'contacts',
        required: true
    }
});

export const User = model('users', userSchema);