const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const app = express()
const port = process.env.PORT


app.use(express.json())
app.use(userRouter)
app.use(taskRouter)


app.listen(port,() =>{
    console.log('server is up on port ' + port)
})




/// -------------------- file/image upload-------------
// const multer = require('multer')
// const upload = multer({
//     dest:'images',
//     limits:{
//         fileSize:10000
//     },
//     fileFilter(req,file,callback){
//         if(!file.originalname.endsWith('.pdf')){
//             return callback(new Error('File must be a PDF'))
//         }
//         callback(undefined,true)
//     }
// })
// app.post('/upload',upload.single('upload'),(req,res) =>{
//     res.send()
// })





/// ------------------ jsonwebtoken ------------------

// const jwt = require('jsonwebtoken')

// const myfunct = async() =>{
//     const token = jwt.sign({_id:'abc123'},'thisismytoken',{expiresIn:'7 days'})
//     console.log(token)

//     const data = jwt.verify(token,'thisismytoken')
//     console.log(data)

// }
// myfunct()




/// ------------------ bcryptjs--------------------
// const bcrypt = require('bcryptjs')

// const myfunct = async() =>{
//     const password = 'T123456'
//     const hashedPassweord = await bcrypt.hash(password,8)

//     console.log(password)
//     console.log(hashedPassweord)

//     const isMatch = await bcrypt.compare('T123456',hashedPassweord)
//     console.log(isMatch)

// }
// myfunct()

















// /// -------------- Task----------------------


// app.post('/task', async (req,res)=>{
//     const task = new Task(req.body)

//     try{
//         await task.save()
//         res.status(201).send(task)
//     }catch(e){
//         res.status(400).send(error)
//     }

// })

// // app.post('/task',(req,res)=>{
// //     const task = new Task(req.body)

// //     task.save().then(() =>{
// //         res.status(201).send(task)
// //     }).catch((error) => {
// //         res.status(400).send(error)
// //     })
// // })

// app.get('/tasks', async (req,res)=>{
//     try{
//         const tasks = await Task.find({})
//         res.send(tasks)
//     }catch(e){
//         res.status(500).send()
//     }
// })

// // app.get('/tasks',(req,res)=>{
// //     Task.find({}).then((tasks) =>{
// //         res.send(tasks)
// //     }).catch((error) => {
// //         res.status(500).send()
// //     })
// // })


// app.get('/task/:id', async (req,res)=>{
//     const _id = req.params.id
//     try{
//         const task = await Task.findById({_id})
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)

//     }catch(e){
//         res.status(500).send()
//     }

// })

// // app.get('/task/:id',(req,res)=>{
// //     const _id = req.params.id
// //     Task.findById({_id}).then((task) =>{
// //         if(!task){
// //             return res.status(404).send()
// //         }
// //         res.send(task)
// //     }).catch((e) => {
// //         res.status(500).send()
// //     })
// // })


// app.patch('/tasks/:id', async (req,res) =>{
//     const updates = Object.keys(req.body)
//     const allowedUpdated = ['description','completed']
//     const isValidOperation = updates.every((update) => allowedUpdated.includes(update))

//     if(!isValidOperation){
//         return res.status(400).send({error:'Invalid updates'})
//     }
//     try{
//         const task= await Task.findByIdAndUpdate(req.params.id,req.body,{new : true , runValidators : true})

//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(400).send(e)
//     }
// })

// app.delete('/tasks/:id', async (req,res) => {
//     try{
//         const task = await Task.findByIdAndDelete(req.params.id)
//         if(!task){
//             return res.status(404).send()
//         }
//         res.send(task)
//     }catch(e){
//         res.status(500).send()
//     }
// })






