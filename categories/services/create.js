import Category from './../schema/Category'

import moment from 'moment' 


export default (req, res) =>{
    req.body.createdAt = moment.utc().toDate()
    Category
        .create(req.body)
        .then((created)=>{
           if(!created){
                res.status(404)
                   .json({ status: false, data:{} })
           }     
           return res.status(201)
                     .json({status:true, data: created})
        })
        .catch(err => res.status(500)
                         .json({ status: false, data:{},err }))}