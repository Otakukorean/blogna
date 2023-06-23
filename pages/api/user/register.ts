import type {NextApiRequest ,NextApiResponse} from 'next'
import client from '../../../app/libs/prismaDb';
import bcrypt from "bcrypt";

export default async function handler(
     req : NextApiRequest ,
     res : NextApiResponse
) {
     if(req.method === "POST" ) {
      
          const body = await req.body;
          const { 
            email,
            name,
            password,
           } = body;

           const checkifUserExist = await client.user.findUnique({
               where : {
                    email : email
               }
           })
           if(!checkifUserExist) {
               const hashedPassword = await bcrypt.hash(password, 12);
        
               const user = await client.user.create({
                data: {
                  email,
                  name,
                  password : hashedPassword,
                }
              }); 
    
    
              return res.status(201).json(user)
           }
           else {
               res.status(404).send({ status: 404, message: "البريد الالكتروني مستخدم !" });

           }
        
      
        
    


        
     }
}