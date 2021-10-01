const mongoose = require("mongoose"); 

const schema = new mongoose.Schema({

     title : {
          type: String, 
          
     }, 

     desc: {
          type: String
     }



}) 

mongoose.model("Title", schema); 

// module.export= Title; 