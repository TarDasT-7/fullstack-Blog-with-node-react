import mongoose, { Schema } from 'mongoose';

const categorySchema = new Schema({

    name: {
        type: String,
        trim: true,
        required: true,
        max: 32,
    },
    slug: {
        type: String,
        unique: true,
        index: true
    }

}, { TimeRanges: true });

const conn = mongoose.createConnection(`${process.env.DATABASE_LOCAL}/${process.env.DATABASE_NAME}`);
export default conn.model('Category', categorySchema);
