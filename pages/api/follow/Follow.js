
import {getServerSession} from 'next-auth/next'
import { authOption } from "../auth/[...nextauth]"
import client from '../../../app/libs/prismaDb';

export default async function handler(
     req  ,
     res 
) {
     if(req.method === "POST" ) {
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})

          if(req.body.followingId === session?.user?.id) {
               return res.status(200).json({message: "you cant follow your self"})
          }

          if(!req.body.followingId) {
               return res.status(400).json({messge : "dont leave a filed empty"})
          }

          
          const followingId  = req.body.followingId

          // Check if Exist

          const IfExist = await client.follows.findFirst({
               where : {
                    followingId : followingId ,
                    followerId : session.user.id 
               }
          })

          const followers = await client.follows.findMany({
               where :{
                 followerId:session?.user?.id,
                 followingId :followingId
               }
             })

             const checkifNotEsxist = await client.notification.findFirst({
               where : {
                    senderId : session.user.id ,
                    reciverId : followingId ,
                    type : "FOLLOW"
               }
          })

          
        


               // Create Like
               try {
                    if(!IfExist) {
                    
                         const result =await client.follows.create({
                              data: {
                                   followingId : followingId ,
                                   followerId : session.user.id 
                              }
                         }).then(async () => {  
                              if(followingId !== session?.user?.id) {
                                   if(!checkifNotEsxist) {
                                        await client.notification.create({
                                             data : {
                                              type :"FOLLOW",
                                              senderId:session.user.id ,
                                              reciverId:followingId
                                             } 
                                           } )
                                   }  
                              }
                            
                              
                          
                              }
                            )
                         
                         
                       
                         return  res.status(200).json(result)
                    }
                    else {
                         const result =   
                         await client.follows.deleteMany({
                              where : {
                                   followingId : followingId ,
                                   followerId : session.user.id 
                              }
                         })  
                        return res.status(200).json(result)
                    }
                  
                
                    
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}