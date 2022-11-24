const express = require ('express')
const app = express()
const fs = require('fs').promises
const {myF, readfile }  = require('./info-folder')

// const getSizeFolder = require('get-foder-size')


app.get('/',(req,res)=>{
myF('./usersfolder').then(e=> res.send(e))
})

app.get('/:folder/',(req,res)=>{
const {folder } = req.params
myF(`./usersfolder/${folder}`).then((e)=>res.send(e))
}) 

app.get('/:folder/:filname',(req,res)=>{
const {folder , filename } = req.params
console.log(filename);
// readfile(`./usersfolder/${folder}/${filename}`).then((e)=>res.send(e))
// myF(`./usersfolder/${folder}`).then((e)=>res.send(e))
})





app.listen(5000,()=>{
    console.log('i listen port 5000');
})
