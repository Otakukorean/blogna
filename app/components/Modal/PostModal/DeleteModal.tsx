import React from 'react'
import { Button, Text } from '@mantine/core';
import { modals } from '@mantine/modals';
import { BsFillTrashFill } from 'react-icons/bs';
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
interface PageProps {
     type : string ;
     url : string ;
     Querykey : string ;
     children : React.ReactNode
}

const DeleteModal = (props : PageProps) => {

     const queryClient = useQueryClient()
     const { mutate } = useMutation(
          async () => {
            return axios.delete(props.url)
          },
          {
            onSuccess: (data) => {
              queryClient.invalidateQueries([props.Querykey])
       
          
      
            },
            onError: (error) => {
              console.log(error)
            
          
            },
          }
        )

     const openDeleteModal = () =>
     modals.openConfirmModal({
       title: props.type === 'post' ? "هل تريد خذف المنشور ؟" : 'هل تريد  حذف التعليق ؟',
       centered: true,
       children: (
         <Text size="sm">
          {props.type === 'post' ? 'هل انت متاكد بانك تريد حذف المنشور ؟' : "هل انت متاكد بانك تريد حذف التعليق ؟"}
         </Text>
       ),
       labels: { confirm: 'حذف', cancel: "الغاء" },
       confirmProps: { bg: '#FB2576' },
       onCancel: () => console.log('Cancel'),
       onConfirm: () => mutate(),
       styles:{'title' : {"color" :"#fff"},'content' :{color : "#fff"}}
     });
  return (
    <div onClick={openDeleteModal}>
      {props.children}
    </div>
  )
}

export default DeleteModal
