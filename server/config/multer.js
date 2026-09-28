const multer=require('multer')
const path=require('path')
const dirname=__dirname;
console.log(dirname);
const uploads=path.join(dirname,'../uploads');

const storage=multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null,uploads)
    },
    filename: (req,file,cb)=>{
        const unique=Date.now()+'-'+file.originalname
        cb(null,unique)
    }

})

const upload=multer({
    storage:storage
})

module.exports=upload;