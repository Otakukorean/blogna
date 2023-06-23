import client from "@/app/libs/prismaDb";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from 'bcrypt'
import NextAuth, {AuthOptions} from 'next-auth'
import  GithubProvider from 'next-auth/providers/github';
import CredentialProvider from 'next-auth/providers/credentials'
import DiscordProvider from "next-auth/providers/discord";

export const authOption  =   {
     adapter : PrismaAdapter(client),
     session: {
         strategy: "jwt",
       },
       providers : [ 
          DiscordProvider({
               clientId: process.env.DISCORD_CLIENT_ID,
               clientSecret: process.env.DISCORD_CLIENT_SECRET
             }),
          GithubProvider ({
               clientId : process.env.GITHUB_ID  ,
               clientSecret : process.env.GITHUB_SECRET 
          }) ,
          CredentialProvider({
               name : 'credentials' ,
               credentials:{
                    email : {label : "email",type:"text"} ,
                    password : {label:"password" , type:"password"}
               } ,
               async authorize(credentials) {
                    if(!credentials?.email || !credentials?.password) {
                         throw new Error('Invalid Credentials')
                    } 


                    const user = await client.user.findUnique({
                         where :{
                              email : credentials.email
                         }
                    })

                    if(!user || !user.password) {
                         throw new Error('Invalid Credentials')
                    }


                    const isCorrectPassword= await bcrypt.compare(
                        credentials.password ,
                        user.password 
                    )

                    if(!isCorrectPassword){
                         throw new Error('Invalid Credentials')
                    }

                    return user;
               }
          })
     ] ,
       callbacks: {
          async jwt({ token, user, trigger, session }) {
               if (trigger === "update") {
                 return { ...token, ...session.user };
               }
               return { ...token, ...user };
             },
         session: async ({ session, token }) => {
                      if (session?.user) {
                         const users= await client.user.findUnique({
                              where :{
                                   email : token.email
                              }
                         })
                         session.user['id']=users.id
                      }
                      console.log(session?.user);
                      return session;
                    },
       },
       pages : {
          signIn:'/'
     } ,
       secret:'secretCode',
     
}

export default NextAuth(authOption)

// export default async function auth(req, res) {
//      return await NextAuth(req, res, {
//        session: {
//          strategy: "jwt",
//        },
//        providers : [ 
//           DiscordProvider({
//                clientId: process.env.DISCORD_CLIENT_ID,
//                clientSecret: process.env.DISCORD_CLIENT_SECRET
//              }),
//           GithubProvider ({
//                clientId : process.env.GITHUB_ID  ,
//                clientSecret : process.env.GITHUB_SECRET 
//           }) ,
//           CredentialProvider({
//                name : 'credentials' ,
//                credentials:{
//                     email : {label : "email",type:"text"} ,
//                     password : {label:"password" , type:"password"}
//                } ,
//                async authorize(credentials) {
//                     if(!credentials?.email || !credentials?.password) {
//                          throw new Error('Invalid Credentials')
//                     } 


//                     const user = await client.user.findUnique({
//                          where :{
//                               email : credentials.email
//                          }
//                     })

//                     if(!user || !user.password) {
//                          throw new Error('Invalid Credentials')
//                     }


//                     const isCorrectPassword= await bcrypt.compare(
//                         credentials.password ,
//                         user.password 
//                     )

//                     if(!isCorrectPassword){
//                          throw new Error('Invalid Credentials')
//                     }

//                     return user;
//                }
//           })
//      ] ,
//        callbacks: {
//          jwt: async ({ token, user }) => {
//            user && (token.user = user);
   
//            if (req.url === "/api/auth/session?update") {
//              // hit the db and eturn the updated user
   
//              const updatedUser = await client.user.findUnique({
//                where : {
//                     id : token.id
//                }
//              });
//              token.user = updatedUser;
//            }
   
//            return token;
//          },
//          session: async ({ session, token, user }) => {
//                       if (session?.user) {
//                          const users= await client.user.findUnique({
//                               where :{
//                                    email : token.email
//                               }
//                          })
//                          session.user['id']=users.id
//                       }
//                       console.log(session);
//                       return session;
//                     },
//        },
//        pages : {
//           signIn:'/'
//      } ,
//        secret:'secretCode',
//      });
//    }