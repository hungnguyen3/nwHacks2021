import { model, Schema } from 'mongoose';

export const contactSchema = new Schema({
    firstName: {
        type: String,
        required: true
    }, 
    lastName: {
        type: String,
        required: true
    },
    phone: {
        type: Number,
        required: true
    }
});

contactSchema.statics.findByPhone = function(phone, projection = null, callback = null) {
    if (typeof projection == 'function') {
        callback = projection;
        projection = null;
    }
    return this.findOne({ phone }, projection, callback);
}

export const Contact = model('contact', contactSchema);