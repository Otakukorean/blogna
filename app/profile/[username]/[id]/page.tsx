"use client"

import React, { useEffect } from 'react'
import {useQuery} from '@tanstack/react-query'
import axios from 'axios'
import { useSession } from "next-auth/react";
import {useInfiniteQuery} from '@tanstack/react-query'
import PostCard from '@/app/components/PostCard/PostCard';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useInView  } from 'react-intersection-observer';
import { Center ,Flex,Text} from '@mantine/core';
import UserCard from '@/app/components/UserCard/UserCard';
import Head from 'next/head';

interface PageParams {
  params : {id : string ,username : string}
}

const getUserById = async (id : string) => {
  const result = await axios.get(`/api/user/${id}`)
    console.log(result.data);
    
  return result.data
}


const page = ({params} : PageParams) => {
  const {data : user } = useSession()

  const {ref,inView} = useInView()

  const {data : userData  ,error : userError,isLoading : userIsLoading} = useQuery({queryFn : () => getUserById(params.id) , queryKey : ['UserProfile']})

  const {isLoading,isError,data,error,isFetchingNextPage,fetchNextPage,hasNextPage} = useInfiniteQuery(['profile'] , async({pageParam = ''}) => {
    const res= await fetch(`/api/posts/getUserPosts/${params.id}?cursor=${pageParam}`);
    return res.json()
   } , {
     getNextPageParam : (latPage) => latPage.nextId ?? false,
   })

   useEffect(() => {
    if(inView && hasNextPage) {
      fetchNextPage()
    }
  },[inView])

  

 
  
  return (
    <>
    <title>{userData?.name}</title>
    <div >
      <Center style={{display:"flex" ,justifyContent:"center" ,alignItems:"center" , flexDirection:"column"}}>
        <UserCard user={userData} queryKey='UserProfile' isProfilePage />
        <Text size={'1.7em'} color='#fff' p={'4px'} bg={'#FB2576'} style={{borderRadius:"10px"}}>المنشورات : {userData?.Post?.length}</Text>
        <div style={{display:"flex",justifyContent:"center",alignItems:"center",flexWrap:"wrap",gap:"1rem"}}>
      {
        data && data.pages.map((page) => (
          <React.Fragment key={page.nextId ?? 'latPage'}>
            {
                page.result?.map((post : any,key : any) => (
                  <PostCard key={post.id} title={post.title}  postImage={post.image} user={post.user} id={post.id} content={post.content} createdAt={post.createdAt}
                  Comments={post.Comment} Likes={post.Likes} userId={post.userId} queryKey={"posts"}/>

                ))
                
            }
              <span ref={ref} style={{visibility:"hidden"}}>incree the data</span>
       
          </React.Fragment>
        ))
      }
     
    </div>
   
      </Center>
    </div>
    </>
  )
}

export default page
