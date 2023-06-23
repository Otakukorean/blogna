import {getServerSession} from 'next-auth/next'
import { authOption } from "../../auth/[...nextauth]"
import client from '../../../../app/libs/prismaDb.ts';
export default async function handler(req,res) {
     if(req.method === "DELETE" ) {
      
          const session = await getServerSession(req,res,authOption)
          if(!session) return res.status(401).json({message : "You Should Be Login"})
        
      // get user
      const prismaUser = await client.user.findUnique({
          where : {email : session?.user?.email  }   
        })


               // Get Post By ID
               try {
                    const result = await client.post.deleteMany({
                         where : {
                              id : req.query.id  ,
                              userId :prismaUser.id
                         }
                    })
                    res.status(200).json(result)
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}