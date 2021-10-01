const mongoose = require('mongoose');

const schema = new mongoose.Schema({
     title: {
     type: String }, 
     
     desc : {
          type : String
     }


})

mongoose.model("Click", schema);