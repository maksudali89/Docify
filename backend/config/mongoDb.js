import mongoose, { mongo } from 'mongoose';

export function ConnectionOfMonoDb(url){
    return mongoose.connect(url);
}