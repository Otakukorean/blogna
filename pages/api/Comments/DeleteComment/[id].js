
import {getServerSession} from 'next-auth/next'
import { authOption } from "../../auth/[...nextauth]"
import client from '@/app/libs/prismaDb'


export default async function handler(
     req  ,
     res 
) {
     if(req.method === "DELETE" ) {
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})

          // get user
          const prismaUser = await client.user.findUnique({
            where : {email : session?.user?.email  }   
          })

          
               // Create Post
               try {
                    const result = await client.comment.deleteMany({
                         where : {
                              id : req.query.id  ,
                              OR : [
                                   {
                                        userId: prismaUser?.id
                                   } ,
                                   {
                                        user :{
                                             roll : "ADMIN"
                                        }
                                   } ,{
                                        user : {
                                             roll :"CEO"
                                        }
                                   }
                              ]
                         }
                    })
                    res.status(200).json(result)
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}