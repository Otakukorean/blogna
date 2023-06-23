
import nc from "next-connect";

import multer from "multer";
import path from "path";
import client from '../../../app/libs/prismaDb.ts'
import {getServerSession} from 'next-auth/next'
import {  authOption} from "../auth/[...nextauth]"


export const config = {
     api: {
       bodyParser: false
     }
   }

const handler = nc();

let storage = multer.diskStorage({
  destination: function (req , file , cb ) {
    cb(null, "public/Upload");
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
handler.post(async (req, res) => {
     try {
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})
          const prismaUser = await client.user.findUnique({
               where : {email : session?.user?.email}   
             })
          const followers = await client.follows.findMany({
            where :{
              followingId:session?.user?.id
            }
          })
          let {title ,content} = req.body;
            let cover = req.file.filename
       

            if (title.length === 0) return res.status(403).json({message :"قم ملئ جميع الحقول !"})
            if (content.length < 8) return res.status(403).json({message :"قم ملئ جميع الحقول !"})
            if (!cover) return res.status(403).json({message :"قم ملئ جميع الحقول !"})
          const result = await client.post.create({
               data : {
                    title : title ,
                    content : content ,
                    image : cover ,
                    userId : prismaUser.id
               }
          }).then(async (post) => {
            if(followers.length) {
              const data = followers.map((id) => (
                {
                  type :'POST',
                  postId:post.id ,
                  senderId : post.userId ,
                  reciverId : id.followerId
                }
              )
             
              )      
              await client.notification.createMany({
                data 
              } )
        
            }
          })
     
          res.status(201).json(result)
     } catch (error) {
          res.status(201).json({error : error.message})
     }


});

export default handler;