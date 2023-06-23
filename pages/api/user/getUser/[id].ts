import client from '@/app/libs/prismaDb'
import type {NextApiRequest ,NextApiResponse} from 'next'


export default async function handler(
     req : NextApiRequest ,
     res : NextApiResponse
) {
     if(req.method === "GET" ) {
      
    


               // Get Post By ID
               try {
                    const result  = await client.user.findMany({
                  
                         where :{
                              id : req.query.id as string 
                         } ,
                         include :{
                              Post : {
                                   orderBy :{
                                        createdAt :"desc"
                                   } ,
                                   include :{
                                        Comment : true ,
                                        Likes : true ,
                                        user : true
                                   }, 
                            
                              } ,
                              followers : true ,
                              following : true
                         } 
                      
                    })
                    res.status(200).json(result)
               } catch (error: any) {
                         res.status(403).json({err : error.message})
               }
          
     }
}