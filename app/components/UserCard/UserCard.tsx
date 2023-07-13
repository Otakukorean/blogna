import React from 'react'
import './style.scss'
import Link from 'next/link'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios'
import { useSession } from "next-auth/react";
import {BsPen} from 'react-icons/bs'
import { useDisclosure } from '@mantine/hooks';
import { Modal } from '@mantine/core'
import { EditUserModal } from '../Modal/Auth/EditUserModal'
import Image from 'next/image'

interface UserProps {
  user : {
    id : string ,
    name : string ,
    image ?: string | null ,
    roll : string  ,
    followers : {}[],
    following : {}[],
    Post : {}[]
  },
  queryKey : string;
  isProfilePage ?: boolean;
}

const UserCard :React.FC<UserProps> = ({user,queryKey,isProfilePage}) => {
  const {data   } = useSession()
  const [opened, { open , close }] = useDisclosure(false);

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async (FollowingId : string) => {
      return axios.post(`/api/follow/Follow` , {
        followerId : data?.user?.id ,
        followingId : FollowingId
      })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries([queryKey])
    

      },
      onError: (error) => {
      
    
      },
    }
  )

  const FoundFollowers = user?.followers?.find((follow : any) => {
    return follow.followerId === data?.user?.id

  })
  return (
    <>
    <div className='card'>
      <div className='imgBx'>
          <Image src={user?.image === null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg" : `${user?.image}`} alt="" width={100} height={100} />
          </div>    
          <div className="contnet">
               <div className="details">
                    <h2>{user?.name}</h2> 
                    {data?.user.id === user?.id &&  <BsPen onClick={open} cursor={'pointer'} color='#fff' /> }
                   

                    <div className="data">
                    <h3>{user?.Post?.length} <br /> <span>منشور</span> </h3>
              <h3>{user?.followers?.length} <br /> <span>المتابعين</span> </h3>
              <h3>{user?.following?.length} <br /> <span>متابع</span> </h3>
                    </div>
                    <div className="actionBtn">
              
                    {user?.id === data?.user?.id ? (
                 null
              ) : (
                FoundFollowers ? (
                  <button title="الغاء المتابعة"  onClick={() => mutate(user?.id)} >الغاء المتابعة</button>
                )
                  :  <button title="متابعة"  onClick={() => mutate(user?.id)} >متابعة</button>

              )}
                    {!isProfilePage && <Link className="Link" href={`/profile/${user?.name}/${user?.id}`}>الملف الشخصي</Link>}
                    </div>
               </div>
          </div>
    </div>
    <Modal opened={opened} onClose={close} >
      <EditUserModal queryKey={queryKey} close={close} />
    </Modal>
    </>
  )
}

export default UserCard
