const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const User = require('../models/user')
const auth = require('../middleware/auth')
const {sendWellcomeEmail,sendCancelationcomeEmail} = require('../emails/account')
const router = new express.Router()


///------------------ USER --------------------


router.post('/users/signup',async (req,res)=>{
    const user = new User(req.body)

    try{
        await user.save()
        sendWellcomeEmail(user.email,user.name)
        const token= await user.generateAuthToken()
        res.status(201).send({user,token} )
    }catch(e){
        res.status(400).send(e)
    }
})  


router.post('/users/login', async(req,res) => {
    try{
        const user =  await User.findByCredentials(req.body.email,req.body.password)
        const token = await user.generateAuthToken()
        res.send({user,token})
    }catch(e){
        res.status(400).send()

    }
})

router.post('/users/logout',auth,async(req,res) =>{
    try{
        req.user.tokens = req.user.tokens.filter((token) =>{
            return token.token !== req.token
        })
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})


router.post('/users/logoutAll',auth,async(req,res) =>{
    try{
        req.user.tokens = []
        await req.user.save()
        res.send()
    }catch(e){
        res.status(500).send()
    }
})

router.get('/users/profile',auth,async (req,res)=>{
    res.send(req.user)
    
})



// router.get('/user/:id', async (req,res)=>{
//     const _id = req.params.id
//     try{
//         const user = await User.findById(_id)
//         if(!user){
//             return res.status(404).send()
//         }
//         res.send(user)
//     }catch(e){
//         res.status(500).send()
//     }
// })



router.patch('/users/update-profile', auth,async (req,res) =>{
    const updates = Object.keys(req.body)
    const allowedUpdated = ['name','email','password']
    const isValidOperation = updates.every((update) => allowedUpdated.includes(update))

    if(!isValidOperation){
        return res.status(400).send({error:'Invalid updates'})
    }
    try{
        updates.forEach((update) =>{
            req.user[update] = req.body[update]
        })
        await req.user.save()

        res.send(req.user)
    }catch(e){
        res.status(400).send(e)
    }
})

router.delete('/users/delete-profile',auth, async (req,res) => {
    try{
        // const user = await User.findByIdAndDelete(req.user._id)
        // if(!user){
        //     return res.status(404).send()
        // }

        await req.user.remove()
        sendCancelationcomeEmail(req.user.email,req.user.name)
        res.send(req.user)
    }catch(e){
        res.status(500).send()
    }
})



// const upload = multer({dest:'avatar'})
const upload = multer({
    // dest:'avatar',
    limits:{
        fileSize:1000000
    },
    fileFilter(req,file,callback){
        // if(!file.originalname.endsWith('.pdf')){
            if(!file.originalname.match(/\.(jpeg|jpg|png)$/)){
            return callback(new Error('only image are allowed'))
        }
        callback(undefined,true)
    }
})

///---new 
router.post('/users/upload-avatar', auth,upload.single('avatar'),async (req,res) =>{
    const buffer = await sharp(req.file.buffer).resize(({
        width:250,height:250
    })).png().toBuffer()
    req.user.avatar = buffer
    await req.user.save()
    res.send()
},(error,req,res,next) =>{
    res.status(400).send({error:error.message})
})


///-- old
// router.post('/users/upload-avatar', auth,upload.single('avatar'),async (req,res) =>{
//     req.user.avatar = req.file.buffer
//     await req.user.save()
//     res.send()
// },(error,req,res,next) =>{
//     res.status(400).send({error:error.message})
// }) 

router.delete('/users/delete-avatar', auth,async (req,res) =>{
    req.user.avatar = undefined
    await req.user.save()
    res.send()
}) 

router.get('/users/:id/fetch-avatar',async (req,res) =>{
    try{
        const user = await User.findById(req.params.id)
        if(!user || !user.avatar){
            throw new Error()
        }
        res.set('Content-type','image/png')
        res.send(user.avatar)
    }catch(e){
        res.status(404).send()
    }

},(error,req,res,next) =>{
    res.status(400).send({error:error.message})
})



module.exports = router