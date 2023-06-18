import mongoose from 'mongoose';


const mongoConection = () => {
    const url = `${process.env.DATABASE_LOCAL}/${process.env.DATABASE_NAME}`
    mongoose.connect(url).then(() => console.log('DATABASE is connected!'));
}

export default mongoConection;
