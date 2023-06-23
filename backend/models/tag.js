import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
<<<<<<< HEAD
=======

>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
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
<<<<<<< HEAD
}, { timestamps: true });

const conn = mongoose.createConnection(`${process.env.DATABASE_LOCAL}/${process.env.DATABASE_NAME}`);
export default conn.model('Tag', tagSchema);
=======

}, { TimeRanges: true });

const conn = mongoose.createConnection(`${process.env.DATABASE_LOCAL}/${process.env.DATABASE_NAME}`);
export default conn.model('Tag', tagSchema);
>>>>>>> 9421d473b8611e24f4461ab0f77985704a900484
