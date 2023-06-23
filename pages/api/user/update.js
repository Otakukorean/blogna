
import nc from "next-connect";

import multer from "multer";
import path from "path";
import client from '../../../app/libs/prismaDb.ts'
import {getServerSession} from 'next-auth/next'
import { authOption } from "../auth/[...nextauth]"


export const config = {
     api: {
       bodyParser: false
     }
   }

const handler = nc();

let storage = multer.diskStorage({
  destination: function (req , file , cb ) {
    cb(null, "public/images");
  },
  filename: function (req, file , cb ) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});
let fileSize = 10485760 //10mb
const fileFilterImage = (req , file , cb ) => {
     const filelength = parseInt(req.headers["content-length"])
     if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' ||file.mimetype === 'image/gif' ){
         cb(null,true);
     }
     else if ( filelength > fileSize) {
       return {
         error :cb(JSON.stringify("file too big")) 
       } 
     }
     
     else{
       return {
         error : cb(new Error('Wrong file type'))
       } 
     }


 };
let upload = multer({
  storage: storage,
  fileFilter : fileFilterImage ,
  limits : {fileSize : fileSize}
});




let uploadFile = upload.single("cover");
handler.use(uploadFile);
handler.put(async (req, res) => {



     try {
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})

          

          let {username ,userId} = req.body;
          let cover = req.file.filename
       
          
          if(session?.user?.id === userId) {

               if (!username) return res.status(403).json({message :"please fill all the fields!"})
               if (!cover) return res.status(403).json({message :"please fill all the fields!"})
             const result = await client.user.updateMany({
              where : {
                id : session?.user?.id ,
                email : session?.user?.email
              } ,
                  data : {
                       name : username ,
                       image : `/images/${cover}` ,
                     
                  }
             })
             res.status(201).json({
              result ,
              filename : req.file.filename
             })

          }

   
     
        
     } catch (error) {
          res.status(201).json({error : error.message})
     }


});

export default handler;