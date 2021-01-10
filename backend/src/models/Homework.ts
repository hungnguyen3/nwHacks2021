import { Document, model, Schema } from 'mongoose';

interface HomeworkDoc extends Document {
    user: Schema.Types.ObjectId;
    type: 1 | 2 | 3;
    input: string[];
}

export const homeworkSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users',
        required: true,
    },
    type: {
        type: Number,
        required: true,
        enum: [1, 2, 3],
    },
    input: {
        type: [String],
        required: true,
    },
});

export const Homework = model<HomeworkDoc>('homework', homeworkSchema);
