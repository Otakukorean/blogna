
import client from '../../../app/libs/prismaDb.ts'
import {getServerSession} from 'next-auth/next'
import { authOption } from "../auth/[...nextauth]"
export default async function handler(req,res) {
     if(req.method === "GET" ) {
      

         const limit = 10;
               const cursor = req.query.cursor ?? ''
               const cursorObj = cursor === "" ? undefined :{id :cursor  } 
    


               // Gte Auth Users Post
               try {
                    const result = await client.post.findMany({
                         include : {
                              user : {
                                   include :{
                                        Likes : true
                                   }
                              } ,
                              Comment : true ,
                              Likes : true
                         } ,
                         orderBy :{
                              createdAt :"desc"
                         },
                         cursor : cursorObj ,
                         take : limit ,
                         skip : cursor ==="" ? 0: 1
                    })
                    res.status(200).json({result , nextId : result.length === limit ? result[limit - 1].id : undefined})
               } catch (error) {
                         res.status(403).json({err : error.message})
               }
          
     }
}


