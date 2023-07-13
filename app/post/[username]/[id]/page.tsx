"use client"
import PostPage from '@/app/components/PostPage/PostPage'
import axios from 'axios'
import { useState  } from 'react';
import { useSession } from "next-auth/react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {useQuery} from '@tanstack/react-query'

interface PageParams {
  params : {
    username : string,
    id : string
  }
}
const getPostById = async (id : string) => {
  const result = await axios.get(`/api/posts/${id}`)

  return result.data
}

const page = (params : PageParams) => {
 
  const [activecomment,setActiveComment] = useState<string | null>(null)

  const {data  ,error,isLoading} = useQuery({queryFn : () => getPostById(params.params.id) , queryKey : ['detail-post']})




  
 
    
    

  
  
  return (
    <>
    <title>{data.title}</title>
    <meta name="twitter:card" content={`${data.title}`}/>
    <meta name="og:title" property="og:title" content={`${data.title}`} />
    <div>
      <PostPage Post={data} postId={params.params.id} activecomment={activecomment} setActiveComment={setActiveComment}   />
    </div>
    </>
  )
}

export default page
