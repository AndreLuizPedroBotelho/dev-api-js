import mongoose from 'mongoose' 
import moment from 'moment' 


const Bill = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    price:{
        type:Number,
        required: true
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Category',
        required: true

    },
    cep:{
        type:String
    },
    status:{
        type:Boolean, 
        default:false
    },
    date:{
        type:Date, 
        default:moment.utc().toDate()
    },
    updateAt:{
        type:Date
    },
    createdAt:{
        type:Date
    }
})


export default mongoose.model('Bill', Bill)
