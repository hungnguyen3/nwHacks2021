import { Document, model, Schema } from 'mongoose';

interface UserDoc extends Document {
    username: string,
    password: string,
    contact: Schema.Types.ObjectId
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
    }
});

userSchema.statics.findBySession = function(sessionId) {
    return this.findOne({ sessionId });
}

export const User = model<UserDoc>('users', userSchema);