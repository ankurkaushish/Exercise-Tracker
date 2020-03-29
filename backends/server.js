const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
var bodyParser = require('body-parser');
let User = require('./models/user.model');
const path = require('path');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())


const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const exerciseRouter = require('./routes/exercise');
const userRouter = require('./routes/users');

app.delete('/manage/:id',(req,res)=>{
       User.findOneAndDelete({_id : req.params.id}, (err)=>{
         if(err){
           console.log(err);
         }
         else{
           res.json('User Deleted');
         }
       });

})

app.use('/exercise' , exerciseRouter);
app.use('/users',userRouter);

// if(process.env.NODE_ENV === 'production')
// {
//   app.use(express.static('../build'));

//   app.get('*',(req,res)=>{
//      res.sendFile(path.resolve(__dirname,'build', 'index.html'));
//   });
// }


app.listen(port , ()=>{
    console.log(`Server is running on ${port}`);
});