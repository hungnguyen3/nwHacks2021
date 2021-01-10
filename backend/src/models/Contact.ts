import { Document, model, Schema } from 'mongoose';

interface ContactDoc extends Document {
    user: string;
    firstName: string;
    lastName: string;
    phone: number;
}

export const contactSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
});

export const Contact = model<ContactDoc>('contact', contactSchema);
