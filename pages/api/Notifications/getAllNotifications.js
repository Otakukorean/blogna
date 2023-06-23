import {getServerSession} from 'next-auth/next'
import { authOption } from "../auth/[...nextauth]"
import client from '@/app/libs/prismaDb'


export default async function handler(
     req  ,
     res 
) {
     if(req.method === "GET" ) {
      
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})
        
    


               // Gte Auth Users Post
               try {
               
                     
                       const notifications = await client.notification.findMany({
               
                         where :{
                              reciverId : session?.user?.id
                         } ,
                         include :{
                              sender : true ,
                              post : {
                                   include : {
                                        user : true
                                   }
                              }
                         } ,
                         orderBy :{
                              createdAt :"desc"                        
                          }
                       })
                       res.status(201).json(notifications)
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}

