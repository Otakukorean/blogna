import type {NextApiRequest ,NextApiResponse} from 'next'
import {getServerSession} from 'next-auth/next'
import client from '../../../app/libs/prismaDb';
export default async function handler(
     req : NextApiRequest ,
     res : NextApiResponse
) {
     if(req.method === "GET" ) {
      

        
    


               // Get Post By ID
               try {
                    const result = await client.post.findUnique({
                         where : {
                              id : req.query.id as string
                         } ,
                         include : {
                              user : {
                                   include : {
                                        Post : {
                                             orderBy: {
                                                  createdAt: "desc"
                                        } 
                                        } ,
                                        followers: true ,
                                        following : true
                                   }
                              } ,
                              Comment : {
                                   orderBy: {
                                        createdAt: "desc"
                              } ,
                              include : {
                                   user : true
                              }
                           
                         }
                    }})
                    res.status(200).json(result)
               } catch (error: any) {
                         res.status(403).json({err : error.message})
               }
          
     }
}