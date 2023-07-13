import React from 'react'
import './PostCardStyle.scss'
import Link from 'next/link'
import {AiOutlineHeart,AiFillHeart} from 'react-icons/ai'
import {BsFillTrashFill} from 'react-icons/bs'
import {TfiCommentAlt} from 'react-icons/tfi'
import {BiEdit} from 'react-icons/bi'
import { Avatar, Group,Text, TypographyStylesProvider,Button } from '@mantine/core'
import {PostCard} from '../../@types/postCardType'
import { formatDistance, subDays } from 'date-fns'
import { ar } from 'date-fns/locale'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useSession } from 'next-auth/react'
import axios from 'axios'
import { modals } from '@mantine/modals';
import DeleteModal from '../Modal/PostModal/DeleteModal'
import {  toast } from 'react-toastify';
import Image from 'next/image'

const PostCard = (prop : PostCard) => {

  const {data : user} = useSession()
  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async () => {
      return axios.post(`/api/Likes/Like` ,{
        postId : prop.id ,
        postUserId :prop.userId
      })
    },
    {
      
      onSuccess: (data) => {
        queryClient.invalidateQueries([prop.queryKey])
    

      },
      onError: (error) => {
        console.log(error)
      
    
      },
    }
  )
  const found = prop.Likes?.find((like :any) => {
    return like.postId === prop.id && like.userId === user?.user?.id
  })

  const canDelete = user?.user.id === prop.userId || user?.user?.roll ==="ADMIN" || user?.user?.roll ==='CEO' ;

  const addLike = () => {
    if(!user?.user) {
      toast.error('عليك تسحيل الدخول !')
    }
    else {
      mutate()
    }
  }

  console.log(user);
  
  return (
    <div className='PostsContainer' style={{transition:"ease-in .2s"}}>
      <div className="FirstCard">
          <div className="SecondCard">
          <Link href={`/post/${prop.user.name}/${prop.id}`}>
          <Image src={`/Upload/${prop.postImage}`} style={{width:"100%",height:"200px",objectFit:"cover"}} width={400} height={400} alt='dd'/>
          
          <Group spacing="sm" mt={20} ml={20} mb={20}>
          <Avatar size={40} src={prop.user?.image === null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg" : `${prop.user?.image}`}radius={40} />
          <div>
            <Text fz="sm" fw={500} color='#fff'>
              {prop.user.name}
            </Text>
            <Text c="#ffffff98" fz="xs">
            {
           formatDistance(
            new Date(`${prop.createdAt}`),
            new Date(),
           { addSuffix: true ,locale:ar }
        ) 
          
          }
            </Text>
          </div>
        </Group>
          <div className="Title-Container">
          <span>{prop.title}</span>
          </div>
          <div className="Body">
          <TypographyStylesProvider >
               <div className='ContentBody' style={{color:"#fff",textAlign:"center"}} dangerouslySetInnerHTML={{__html : prop.content}}/>
          </TypographyStylesProvider>
          </div>
          </Link>
          <div className="Like-Comment-Container">
          <div className="Comment-Container">
            {found ?<AiFillHeart title='اعجاب'  size={30} color='#FB2576 ' onClick={() => addLike()}/>  : <AiOutlineHeart title='اعجاب'  size={30} color='#FB2576 ' onClick={() => addLike()}/> }
               {prop.Likes.length}
          </div>
          <div className="Comment-Container">
          <TfiCommentAlt size={25} color='#fff'
       
       /> {prop.Comments.length}
          </div>
    
       
          {canDelete && (
          <div className="Comment-Container">
      
            <DeleteModal url={`/api/posts/DeletePost/${prop.id}/${prop.userId}`} Querykey={prop.queryKey} type='post' children={
                       <BsFillTrashFill  size={25} color='#FB2576'
                       title='حذف'
                     />
            } />
          </div>
          )}
       
          </div>
          </div>
      </div>
    </div>
  )
}

export default PostCard
