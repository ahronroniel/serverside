const fs = require('fs').promises
const path =require('path') 

async function myF(path) {
    try {
    let names = await fs.readdir(`${path}`,{
          withFileTypes:true});
      // console.log(names);
     return names.map(e=> {
          const split = e.name.split('.')[1];
          if(split){
              return {name:e.name , type:split}
          }else return {name: e.name ,type: 'folder'}
      } )  
    } catch (e) {
      console.log('e', e);
    }
  }


async function readfile(params) {
const pathName = path.join(__dirname,params)
console.log( "hiiii"+ pathName);
    try {
      const data = await fs.readFile( pathName , { encoding: 'utf8' });
      console.log(data);
   return data;

    } catch (err) {
      console.log(err);  
  }
}







 
  module.exports={ myF ,readfile} ;