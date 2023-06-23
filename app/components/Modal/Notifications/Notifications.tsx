import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import {useQuery} from '@tanstack/react-query'
import { formatDistance, subDays } from 'date-fns'
import { useMutation, useQueryClient } from "@tanstack/react-query"

import { ar } from 'date-fns/locale'
import {
     Button,
     Paper,
     Modal,
     Text,
     Flex,

     Avatar,
     Container,
     ScrollArea 
   } from '@mantine/core';
   import {AiOutlineBell} from 'react-icons/ai'
import Link from 'next/link';
import Image from 'next/image';
import { useMediaQuery } from '@mantine/hooks';
import axios from 'axios';


const fetchNotifications = async () => {
     const result = await fetch('/api/Notifications/getAllNotifications');
   
     return result.json()
   }


const Notifications = () => {
     const [opened, { open , close }] = useDisclosure(false);

  const matches = useMediaQuery('(max-width: 500px)');


     const {data  ,error,isLoading} = useQuery({queryFn : () => fetchNotifications() , queryKey : ['notification']})

     const queryClient = useQueryClient()

     const { mutate } = useMutation(
       async (data : any) => {
         return axios.post(`/api/Notifications/ChangtoRead` , data)
       },
       {
         onSuccess: (data) => {
           queryClient.invalidateQueries(['notification'])
       
   
         },
         onError: (error) => {
           console.log(error)
         
       
         },
       }
     )

     const notificationOnclick = (postId : any , type : any) : void => {
         close()
         mutate({postId : postId , type : type})
     }
     
  return (
    <div>
     <div onClick={open} style={{display:"flex",justifyContent:"center",alignItems:"center",position:"relative",cursor:"pointer"}} >
     <AiOutlineBell  color='#fff' size={30} cursor={"pointer"}/>
     <span style={{position:'absolute',background:"#FB2576",borderRadius:"50%",height:"25px",width:"25px",textAlign:"center",bottom:"0",left:"15px",color:"#fff"}} >

     {data?.filter((not : any) => not.isRead === false).length}

     </span>
     </div>
      <Modal size={matches ? 'auto' : 'lg'}   opened={opened} onClose={close}  scrollAreaComponent={ScrollArea.Autosize} >
          <Paper bg={"#222"} radius="md"   >
               <Text align='center' size={'1.5rem'}  color="#fff">الاشعارات</Text> <br />
               {data?.map((not : any,key : any) =>(
                      <Link onClick={() => notificationOnclick(not.postId ,not.type )} style={{marginBottom:"1rem"}}  href={not.type !== 'FOLLOW' ? `/post/${not?.post.user?.name}/${not?.post?.id}` : `/profile/${not?.sender?.name}/${not?.sender?.id}`} key={key} >
                      <Container  className='Notification_Container' mb={30}>
                      <Flex  p={5}  style={{gap:"1rem",cursor:"pointer"}} justify={'space-around'} align={'center'}  >
                         {not?.type !== 'FOLLOW' ?                            <Image src={`/Upload/${not?.post?.image}`} style={{borderRadius:"10px",objectFit:"cover"}} width={100} height={100} alt='' />
 :                            <Image src={`${not?.sender?.image}`} style={{borderRadius:"10px",objectFit:"cover"}} width={100} height={100} alt='' />
}
                           {not.type === 'POST' && <Text align='center' color="#fff"
                           
                           >
                              بانشاء

                           {" " +not?.sender?.name +" "}
                           قام
                           

                           
           منشور هلو يا عالم
                           
                           </Text>
}
                           {not.type === 'COMMENT' && <Text align='center' color="#fff"
                           
                           >
                              
            {" " +not?.sender?.name +" "}
                         
                           قام
                           

                           
          بالتعليق  على منشور   

           {" " +not?.post?.title +" "}

                           
                           </Text>
}
                           {not.type === 'LIKE' && <Text align='center' color="#fff"
                           
                           >
                             
                     بالاعجاب      
                           {" " +not?.sender?.name +" "}
                           قام
                           

           {" " +not?.post?.title +" "}          
            على منشور   

         

                           
                           </Text>
}
                  
                           {not.type === 'FOLLOW' && <Text align='center' color="#fff"
                           
                           >
                              بمتابعتك

                           {" " +not?.sender?.name +" "}
                           قام
                           

   

         

                           
                           </Text>
}
                  
  
                      </Flex>
                               <Flex p={5} style={{gap:"7rem",cursor:"pointer"}}  justify={'space-around'} align={'center'}>
                            <Text color='#ffffffa2' c="dimmed" fz="xs" >
                            {
           formatDistance(
            new Date(`${not.createdAt}`),
            new Date(),
           { addSuffix: true ,locale:ar }
        ) 
          
          }
                              </Text>    
                            <Avatar h={40} w={40} style={{cursor:"pointer"}} radius={'100%'} src={not?.sender?.image === null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg" : `${not?.sender?.image}`}  />
                          
                           </Flex>
                           {!not?.isRead && <Text align='center' color='#FB2576'>New</Text>  }
                           </Container>
                 </Link>
               ) )}
             
         
          </Paper>
      </Modal>
    </div>
  )
}

export default Notifications
