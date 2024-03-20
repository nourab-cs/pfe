const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    subject:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    tech:{
        type:[String],
        required:true
    }, 
        duration :{
        type:Number,
            required:true
    },
    places :{
        type:Number,
            required:true
},

});

    const Offre = mongoose.model("Offre", schema);


module.exports = Offre