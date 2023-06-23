export type PostCard = {
     id : string ,
     title : string ,
     content : string ,
     postImage :string,
     createdAt : string ,
     user : {
          name : string ,
          image : string ,
          Likes : {
               postId : string ,
               userId : string
          }[] ,
          roll : string
     }  ,
     Comments : {}[],
     Likes : {}[],
     userId : string,
     queryKey:string

     
}