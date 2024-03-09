const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    }, 
        username :{
        type:String,
            required:true
    }
    });

    const Prom = mongoose.model("Prom", schema);


module.exports = Prom