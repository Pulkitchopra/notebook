const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../middleware/fetchuser')

const JWT_SECRET = 'PulkitisSpritual';

const { body, validationResult } = require('express-validator'); 
router.post('/createuser', [
    body('name').isLength({min: 6}),
    body('email').isEmail(),
    body('password').isLength({min: 6}),

]
, async (req, res)=>{
  let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    try{

    
    let user = await User.findOne({email: req.body.email});
    console.log(user)
    if(user){
      return res.status(400).json({success, error: "This email address can't be used"})
    }
    const salt = await bcrypt.genSalt(8);
    const secPassword = await bcrypt.hash(req.body.password, salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPassword,
     })

     const data ={
      user:{
        id: user.id
      }
     }

     const authtoken = jwt.sign(data, JWT_SECRET);
     success = true
     
     res.json({success, authtoken})
    }catch(error){
      console.log(error)
    }
    //  .then(user => res.json(user))
    //  .catch(err => console.log(err))
}
)

router.post('/login', [
  body('email', 'Enter email').isEmail(),
  body('password','This password can not be empty').exists(),
], async(req, res)=> {

  let success = false
  const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    try{
      let user = await User.findOne({email});
      if(!user){
        return res.status(400).json({error: "This password is not correct"});
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if(!passwordCompare){

        success = false

        return res.status(400).json({success, error: "This password is not correct"});
      }
      const data = {
        user:{
          id: user.id
        }
      }
      const authtoken = jwt.sign(data, JWT_SECRET);


      success = true
      res.json({success, authtoken})
    }
    catch(error){
      console.log(error);
      res.status(500).send("Some error occured");
    }

}
)
router.post('/userdata', fetchuser, async(req, res)=> {

try{
  const userId = req.user.id;
  const user = await User.findById(userId).select("-password")
  res.send(user)
}catch(error){
  console.log(error);
  res.status(500).send("Error");
}
}
)
module.exports = router
