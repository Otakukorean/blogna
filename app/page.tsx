"use client";
import { Flex } from '@mantine/core';

import PostCard from './components/PostCard/PostCard';
import {useInfiniteQuery} from '@tanstack/react-query'
import { useInView  } from 'react-intersection-observer';

import { useSession } from "next-auth/react"
import React, { useEffect } from 'react';





export default function Home() {

  const { data: session, update } = useSession();



  const {ref,inView} = useInView()

  const {isLoading,isError,data,error,isFetchingNextPage,fetchNextPage,hasNextPage} = useInfiniteQuery(['posts'] , async({pageParam = ''}) => {
    const res= await fetch(`/api/posts/getAllPosts?cursor=${pageParam}`);
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
    <title>Blogna</title>
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

 
      
      </>
  );
}
