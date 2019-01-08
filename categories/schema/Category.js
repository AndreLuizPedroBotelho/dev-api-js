import mongoose from 'mongoose' 
import moment from 'moment' 


const Category = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    updateAt:{
        type:Date
    },
    createdAt:{
        type:Date
    }
})


export default mongoose.model('Category', Category)
