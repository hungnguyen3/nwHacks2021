import { Document, model, Schema } from 'mongoose';

interface HomeworkDoc extends Document {
    user: Schema.Types.ObjectId,
    type: string,
    input: string,
}

export const homeworkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true
    },
    type: {
        type: String, required: true,
    },
    input: {
        type: String, required: true,
    },
});

export const Homework = model<HomeworkDoc>('homework', homeworkSchema);