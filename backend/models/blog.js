import mongoose, { Schema } from 'mongoose';

const blogSchema = new Schema({
    title: {
        type: String,
        trim: true,
        min: 3,
        max: 160,
        required: true,
    },
    slug: {
        type: String,
        unique: true,
        index: true,
    },
    body: {
        type: {},
        required: true,
        min: 200,
        max: 2000000,
    },
    excerpt: {
        type: String,
        max: 1000,
    },
    mtitle: {
        type: String,
    },
    mdescription: {
        type: String,
    },
    photo: {
        data: Buffer,
        contentType: String
    },
    categories: [{
        type: Schema.Types.ObjectId,
        ref: 'Category',
        required: true
    }],
    tags: [{
        type: Schema.Types.ObjectId,
        ref: 'Tag',
        required: true
    }],
    postedBy: {
        type: Schema.Types.ObjectId,
        ref: 'User',
    }

}, { timestamp: true });

const conn = mongoose.createConnection(`${process.env.DATABASE_LOCAL}/${process.env.DATABASE_NAME}`);
export default conn.model('Blog', blogSchema);
