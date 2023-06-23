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
  const {data : user  } = useSession()
  const {data  ,error,isLoading} = useQuery({queryFn : () => getPostById(params.params.id) , queryKey : ['detail-post']})
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (FollowingId : string) => {
      return axios.post(`/api/follow/Follow` , {
        followerId : user?.user?.id ,
        followingId : FollowingId
      })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['detail-post'])
    

      },
      onError: (error) => {
      
    
      },
    }
  )
  if(isLoading) return <h1>Loadin</h1>

  
 
    console.log(data);
    
    

  
  
  return (
    <>
    <title>{data.title}</title>
    <div>
      <PostPage Post={data} postId={params.params.id} activecomment={activecomment} setActiveComment={setActiveComment}   />
    </div>
    </>
  )
}

export default page
