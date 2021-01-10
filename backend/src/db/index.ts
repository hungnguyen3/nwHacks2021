import mongoose from 'mongoose';

mongoose.connect(process.env.CONNECTION_STRING || "", { useNewUrlParser: true, useUnifiedTopology: true });

export default mongoose.connection;