"use client"
import { useState } from "react";
import CommentForm from "./CommentForm";
import Image from 'next/image'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import './style.scss'
import { formatDistance, subDays } from 'date-fns'
import { ar } from 'date-fns/locale'
import axios from "axios";
import { Group,Avatar,Text } from "@mantine/core";
import DeleteModal from "../Modal/PostModal/DeleteModal";
const Comment = ({
  comment,
  replies,
  setActiveComment,
  activeComment,
  currentUserId,
  postId ,
  data
}) => {
  const [isDMOpen,setisDMOpen] = useState(false)

  const isReplying =
    activeComment &&
    activeComment === comment.id 


  const canDelete =currentUserId === comment.userId  ;
  const canReply = Boolean(currentUserId);

  const queryClient = useQueryClient()
  const { mutate } = useMutation(
    async () => {
      return axios.delete(`/api/Comments/DeleteComment/${comment.id}`)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['detail-post'])
    

      },
      onError: (error) => {
        console.log(error)
      
    
      },
    }
  )

  return (
    <div key={comment.id} className="comment__card">
             <div className='comment-user'>
                         
             <Group spacing="sm" mt={20} ml={20} mb={20}>
          <Avatar size={40} src={comment?.user?.image === null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg" : comment?.user?.image} radius={40} />
          <div>
            <Text fz="sm" fw={500} color='#fff'>
              {comment?.user?.name}
            </Text>
            <Text c="dimmed" fz="xs">
            {
           formatDistance(
            new Date(`${comment.createdAt}`),
            new Date(),
           { addSuffix: true ,locale:ar }
        ) 
          
          }
            </Text>
          </div>
        </Group>
              </div>

                            <p>
                              {comment.message}
                              </p>

          
          <div className="">

          </div>
        <div className="comment__footer">
          {canReply && (
            <div
              className="comment-action"
              onClick={() =>
                setActiveComment(comment.id)
              }
            >
              رد
            </div>
          )}
          {canDelete && (
            <div
              className="comment-action"
  
            >
                 <DeleteModal url={`/api/Comments/DeleteComment/${comment.id}`} Querykey={'detail-post'} type='comment' children={
                      <p>حذف</p>
            } />
            </div>
          )}
        </div>
        {isReplying && (
          <CommentForm
            submitLabel="رد"
            hasCancelButton={true}
            setActiveComment={setActiveComment}
            activeComment={activeComment}
            postid={postId}
          />
        )}
        <div className="comment_container">
        {replies.length > 0 && (
          <>
            {replies.reverse().map((reply) => (
              <Comment
                comment={reply}
                key={reply.id}
                setActiveComment={setActiveComment}
                activeComment={activeComment}
                postId={postId}
                parentId={comment.id}
                replies={data.Comment.filter((repl) => repl.parent_id === reply.id)}
                data={data}
                currentUserId={currentUserId}
              />
            ))}
          </>
        )}
        </div>
            {/* {isDMOpen ? <DeleteModel isOpen={isDMOpen} setisOpen={setisDMOpen} type="التعليق" url={`/api/Comments/DeleteComment/${comment.id}`} Querykey="detail-post" /> : null} */}
      </div>

  );
};

export default Comment;