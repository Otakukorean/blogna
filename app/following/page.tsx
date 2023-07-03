"use client";
import { Flex } from '@mantine/core';

import PostCard from '../components/PostCard/PostCard';
import {useInfiniteQuery} from '@tanstack/react-query'
import { useSession } from "next-auth/react"
import React ,{useEffect} from 'react';

import { redirect } from 'next/navigation'




export default function page() {

  const {data : user } = useSession()
  const {isLoading,isError,data,error,isFetchingNextPage,fetchNextPage,hasNextPage} = useInfiniteQuery(['posts'] , async({pageParam = ''}) => {
    const res= await fetch(`/api/posts/getFollowingPosts?cursor=${pageParam}`);
    return res.json()
  } , {
    getNextPageParam : (latPage) => latPage.nextId ?? false,
  })

  // useEffect(() => {
  //   if(inView && hasNextPage) {
  //     fetchNextPage()
  //   }
  // },[inView])

  // if(!user?.user) {
  //   redirect('/')
  // }
  
  return (
    <>
    <title>المتابعين</title>
    <meta name="robots" content="noindex"/>
    <Flex wrap={"wrap"} justify={"center"} align={"center"} gap={"md"} >
      {
        data && data.pages.map((page) => (
          <React.Fragment key={page.nextId ?? 'latPage'}>
            {
                page.result?.map((post : any,key : any) => (
                  <PostCard key={post.id} title={post.title}  postImage={post.image} user={post.user} id={post.id} content={post.content} createdAt={post.createdAt}
                  Comments={post.Comment} Likes={post.Likes} userId={post.userId} queryKey={"posts"}/>

                ))
            }

       
          </React.Fragment>
        ))
      }
     
    </Flex>
      
      </>
  );
}
