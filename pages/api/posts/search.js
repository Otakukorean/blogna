import client from '../../../app/libs/prismaDb.ts'

export default async function handler(req,res) {
     if(req.method === "GET" ) {
          try {
               const limit   = req.query.limit;
               const cursor = req.query.cursor ?? ''
               const cursorObj = cursor === "" ? undefined :{id :cursor  } 
               const {q : query} = req.query;

               const result =await client.post.findMany({
                    where : {
                         OR :[
                              {
                                   content : {
                                        contains : query 
                                   }
                              },
                              {
                                   title : {
                                        contains : query 
                                   }
                              },
                              {
                                   user :{
                                        name : {
                                             contains : query
                                        }
                                   }
                              }
                         ]
                    } ,
                    include : {
                         user : true ,
                         Likes : true ,
                         Comment : true
                    } ,
                    cursor: cursorObj ,
                    take :parseInt(limit)   ,
                    skip : cursor ==="" ? 0: 1 ,
                 
               })


               res.status(200).json({result , nextId : result.length === parseInt(limit) ? result[parseInt(limit) - 1].id : undefined})


          } catch (error ) {
               res.status(403).json({error : error.message})

          }
   
          
          
     }
}