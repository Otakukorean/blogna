"use client"

import { Dispatch, SetStateAction, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { Center } from "@mantine/core";
import { useSession } from "next-auth/react";

type Comment = {
  parent_id?: string | null
  message: string
}
type PostProps = {
  submitLabel : string ,
  hasCancelButton: boolean ,
  setActiveComment : Dispatch<SetStateAction<any>> ,
  activeComment : null | string ,
  postid : string
}


const CommentForm = ({submitLabel,hasCancelButton,setActiveComment,activeComment,postid} : PostProps) => {
  const [message,setMessage] = useState("")
  const isTextareaDisabled = message.length === 0;
  const {data} = useSession()

  const queryClient = useQueryClient()

  const { mutate } = useMutation(
    async () => {
      return axios.post(`/api/Comments/CreateComment/${postid}`, { 
          message : message ,
          parent_id : activeComment
       })
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['detail-post'])
        setMessage("")
        setActiveComment(null)

      },
      onError: (error) => {
        console.log(error)
      
    
      },
    }
  )


  const onSubmit =async (e : React.FormEvent) => {
    e.preventDefault();
    console.log({
      message : message ,
      parent_id : activeComment
    });
    mutate()
    
   
  };
  return (
     <Center mb={30}>
          <div className="Form-container">
    <form onSubmit={onSubmit}>
      <textarea
        placeholder={submitLabel}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      {data?.user && (
          <div className="btn">
          <button  className="comment-form-button" style={{background:"#150050"}} disabled={isTextareaDisabled}>
            {submitLabel}
          </button>
          {hasCancelButton && (
            <button
              type="button"
              className="comment-form-button comment-form-cancel-button"
              onClick={() => setActiveComment(null)}
              style={{background:"#FB2576"}}
            >
              الغاء
            </button>
          )}
          </div>
      ) }
    
  
  
    </form>
    </div>
    </Center>
  );
};

export default CommentForm;