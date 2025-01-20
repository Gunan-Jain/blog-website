const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/employee')
const app= express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://gj809:gj809@employee.qqnli.mongodb.net/");

app.post('/register',(req,res)=>{
EmployeeModel.create(req.body)
.then(employees =>res.json(employees))
.catch(err=>res.json(err))
})


app.post('/login', (req, res) => {
  const { email, password } = req.body;
  console.log("Login attempt:", email, password);
  
  EmployeeModel.findOne({ email: email })
    .then(user => {
      if (user) {
        if (user.password === password) {
          res.json("Success");
        } else {
          res.json("Password is Incorrect");
        }
      } else {
        res.json("No record existed");
      }
    })
    .catch(err => res.json(err));
});
app.listen(5001, () => {
    console.log("server is running on port 5000");
  });
  
