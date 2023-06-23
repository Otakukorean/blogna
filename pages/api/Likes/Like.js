
import {getServerSession} from 'next-auth/next'
import { authOption } from "../auth/[...nextauth]"
import client from '@/app/libs/prismaDb'

export default async function handler(
     req ,
     res
) {
     if(req.method === "POST" ) {
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})

          
          const {postId , postUserId} = req.body

          // Check if Exist

          const IfExist = await client.likes.findFirst({
               where : {
                    postId : postId ,
                    userId : session.user.id
               }
          })

    
             const checkifNotEsxist = await client.notification.findFirst({
               where : {
                    senderId : session.user.id ,
                    reciverId : postUserId ,
                    type : "LIKE" ,
                    postId : postId
               }
          })



               // Create Like
               try {
                    if(!IfExist) {
                    
                         const result =await client.likes.create({
                              data: {
                                   postId :postId ,
                                   userId : session.user.id
                              }
                         }).then(async () => {
                              if(postUserId !== session?.user?.id) {
                                   if(!checkifNotEsxist) {
                                        await client.notification.create({
                                             data :{
                                                  senderId : session?.user?.id ,
                                                  reciverId : postUserId ,
                                                  type : "LIKE" ,
                                                  postId : postId
                                             } 
                                           } )
                                   } 
                              }
                         
                             
                            })
                         
                       
                         return  res.status(200).json(result)
                    }
                    else {
                         const result =   
                         await client.likes.deleteMany({
                              where : {
                                   postId :postId ,
                                   userId : session.user.id
                              } 
                              
                         })  
                        return res.status(200).json(result)
                    }
                  
                
                    
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}