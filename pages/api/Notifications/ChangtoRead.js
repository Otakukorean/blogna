import {getServerSession} from 'next-auth/next'
import { authOption } from "../auth/[...nextauth]"
import client from '@/app/libs/prismaDb'

export default async function handler(
     req  ,
     res 
) {
     if(req.method === "POST" ) {
      
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})
          
    
          const {postId,type}  =req.body

               // Gte Auth Users Post
               try {
               
                 const result = await client.notification.updateMany({
                    where : {
                         reciverId : session?.user?.id ,
                         postId :postId ,
                         type : type
                    } ,
                    data :{
                         isRead:true
                    }
                 })  
                     res.status(201).json(result) 
                       
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}

