const express = require('express');
const mongoose = require("mongoose"); 
const app = express(); 
const {MONGO} = require("./keys"); 
const path = require("path");
require("./models/title");
require("./models/click");
const Title = mongoose.model("Title") 
const Click = mongoose.model("Click") 
app.use(express.json())

mongoose.connect(MONGO, {
     useNewUrlParser: true, 
     useUnifiedTopology: true, 
} ) 
mongoose.connection.on("connected", ()=>{console.log("Connected to mongo")})
mongoose.connection.on("error", (e)=>{console.log("Connected error",e )})

app.get("/", (req, res) => {
     res.status(200).sendFile(path.join( __dirname, './main/index.html'))
     // res.status(200).send('ok')
})

app.post("/savetitle", async (req,res)=>{

    try {
         const item = new Title({
          title: req.body.title,
          desc:req.body.desc
     })
     // console.log(item)

     const result = await item.save();
     // console.log(result) 
     res.status(200).json({"msg": "success"}); }

     catch(e) {
          res.status(400).json({'msg':'error', "error": e})
     }

})

app.post("/getsearch", async (req, res)=>{
     
     try{ const item = req.body.title;
          console.log(item)
          let patt = new RegExp("^" + item)


          const result = await Title.find({title: {$regex: patt }});
          

          res.json([{...result}])}
          catch(e) { res.status(400).json({'msg':'error'})}
})

app.post("/getClick", async(req, res)=>{

          try{
                     const click = new Click({
                      title: req.body.title,
                         desc:req.body.desc });

                         const result = await click.save(); 
                         res.status(200).json({"msg":"success"})
          }
          catch(e){
               res.staus(400).json({"msg":"error", "error":e})
          }
})

app.get("/showdata", (req, res)=>{

     let result = Click.find({});
     // console.log(result)
     res.status(200).json({"msg" : " success"})
     
} )

app.listen(5000, ()=>{console.log('listteing')})