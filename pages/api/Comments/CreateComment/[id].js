
import {getServerSession} from 'next-auth/next'
import { authOption } from "../../auth/[...nextauth]"
import client from '@/app/libs/prismaDb'

export default async function handler(req,res) {
     if(req.method === "POST" ) {
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})

          const message= req.body.message
          const parent_id  = req.body.parent_id
          // get user
          const prismaUser = await client.user.findUnique({
            where : {email : session?.user?.email  }   
          })
      

      
        

               // Create Post
               try {
                    const result = await client.comment.create({
                         data : {
                            message ,
                            parent_id  ,
                            userId: prismaUser.id  ,
                            postId :req.query.id 
                         } ,
                         include :{
                              post : true,
                              
                         }
                    }).then(async (post) => {
                         // await client.notification.create({
                         //      data : {
                         //       type :"COMMENT",
                         //       senderId:session.user.id ,
                         //       reciverId:post
                         //      } 
                         //    } )
                         if(post.post.userId !== session?.user?.id) {
                                await client.notification.create({
                              data : {
                               type :"COMMENT",
                               senderId:session.user.id ,
                               reciverId:post.post.userId,
                               postId : post.post.id
                              } 
                            } )
                         }
                    } )
                    res.status(200).json(result)
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}