const express = require('express')
const bcrypt = require('bcryptjs')
var nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const user = require('../models/userModel')
let router = express.Router()

//config
let client = new  OAuth2Client('558511611530-rbj2k9ckicdn2og6b035r1gbbs6n22m2.apps.googleusercontent.com')

//---Register---
router.post('/register',async(req,res)=>{
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(req.body.password,salt)
    req.body.password= hash
    let User = new user(req.body)
    await User.save((err,result)=>{
       if(err){
           res.json({
            success:false,
            message:`Email already exists`
           })
       }
       else{
           if(result){
               res.json({
                      success:true,
                      message:`Registration sucessful`
                  })
           }
           }
       
    })
})
//---Register End---

//---Register with google
router.post('/registerWithGoogle',(req,res)=>{
    client.verifyIdToken({idToken:req.body.tokenId ,audience:'558511611530-rbj2k9ckicdn2og6b035r1gbbs6n22m2.apps.googleusercontent.com'})
    .then(async(result)=>{
        const {email,name,email_verified} = result.payload
        let salt = await bcrypt.genSalt(10)
        let hash = await bcrypt.hash(email+process.env.GPASS,salt)

        let User = new user({
            username:name,
            email:email,
            password:hash
        })
         
        if(email_verified){
            await User.save((err,result)=>{
                if(err){
                    res.json({
                     success:false,
                     message:`Email already exists`
                    })
                }
                else{
                    if(result){
                        res.json({
                               success:true,
                               message:`Registration sucessful`
                           })
                    }
                    }
                
             })
        }
        else{
            res.json({
                success:false,
                message:'something went wrong'
            })
        }
        
    })
})
//---Register with google end---

//---Login ---
router.post('/login',async(req,res)=>{
    await user.findOne({email:req.body.email},async(err,result)=>{
        if(err)throw err
        if(result){
          await bcrypt.compare(req.body.password,result.password,async(err,result)=>{
              if(!result){
                  res.json({
                      success:false,
                      message:'password mismatch'
                  })
              }
              else{
                  let token = await jwt.sign({email:req.body.email},process.env.JWT_SECRET,{expiresIn:60*60})
                  res.json({
                      success:true,
                      message:`login successful`,
                      token
                  })
              }
          })
        }
        else{
            res.json({
               success:false,
               message:`Email not found` 
            })
        }
    })
})
//---Login End ---

//---Login with google---
router.post('/loginWithGoogle',(req,res)=>{
    client.verifyIdToken({idToken:req.body.tokenId , audience:'558511611530-rbj2k9ckicdn2og6b035r1gbbs6n22m2.apps.googleusercontent.com'})
    .then(async(result)=>{
        const{email} = result.payload
        await user.findOne({email:email},async(err,result)=>{
            if(err)throw err
            if(result){
              await bcrypt.compare(email+process.env.GPASS,result.password,async(err,result)=>{
                  if(!result){
                      res.json({
                          success:false,
                          message:'password mismatch'
                      })
                  }
                  else{
                      let token = await jwt.sign({email:email},process.env.JWT_SECRET,{expiresIn:60*60})
                      res.json({
                          success:true,
                          message:`login successful`,
                          token
                      })
                  }
              })
            }
            else{
                res.json({
                   success:false,
                   message:`Email not found` 
                })
            }
        })
    })
})
//---Login with End---

//---Forget password ---
router.post('/forgetPassword',async(req,res)=>{
    
    await user.findOne({email:req.body.email},(err,result)=>{
        if(err)throw err
        if(result){

            let token = jwt.sign({email:result.email},process.env.JWT_SECRET,{expiresIn:60*60})
            // console.log(token)
            var transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                  user: process.env.EMAIL,
                  pass: process.env.EMAIL_PASS
                }
              });
              
              var mailOptions = {
                from: process.env.EMAIL,
                to: result.email,
                subject: 'Reset password',
                html:`<center><h3>Reset link</h3><a href='/user/auth/resetPassword/${token}'>Click here</a></center>`
              };
              
              transporter.sendMail(mailOptions, function(error, info){
                if (error) {
                  console.log(error);
                } else {
                 res.json({
                     success:true,
                     message:'Reset link was send'
                 })
                }
              });
        //---
        }
        else{
            res.json({
                success:false,
                message:"Email not found"
            })
        }
    })
})
//---Forget password End ---

//--- Reset password ---
router.get('/resetPassword/:token',async(req,res)=>{
   let valid =  await jwt.verify(req.params.token,process.env.JWT_SECRET)
   if(valid.email){
       res.render('reset.ejs',{email:valid.email})
   }
   else{
       res.send('<center><h3>Link expired</h3></center>')
   }
})

router.post('/reset/:email',async(req,res)=>{
    let email = req.params.email
    let salt = await bcrypt.genSalt(10)
    let hash = await bcrypt.hash(req.body.password,salt)
     
    await user.findOneAndUpdate({email},{$set:{password:hash}},(err,result)=>{
        if(err)throw err
        if(result){
            res.send('<center><h4>Password reset completed</h4></center>')
        }
        else{
            res.send('<center><h4>something went wrong</h4></center>')  
        }
    })


})

// Reset password End ---

module.exports = router