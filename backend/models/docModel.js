import mongoose from 'mongoose';

const DocsSchema = new mongoose.Schema({
    title:{
        type:String
    },
    uploadedBy:{
        type:String
    },
    content:{
        type:String,
        default:""
    },
    date:{
        type:Date,
        default:Date.now
    },
    lastUpDate:{
        type:Date,
        default:Date.now
    }
},{timestamps:true});

export const DocModel =  mongoose.model('document',DocsSchema);