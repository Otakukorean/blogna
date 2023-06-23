"use client";
import React, { Dispatch, SetStateAction ,useEffect,useState } from 'react'
import { Editor }  from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { EditorState } from 'draft-js';
import { convertToHTML } from 'draft-convert';

interface PageProps {
     setData : Dispatch<SetStateAction<any>>
}

const MyEditor : React.FC<PageProps>= ({setData}) => {

     const [editorState, setEditorState] = useState(
          () => EditorState.createEmpty(),
        );
   
    
   
   
     const [convertedContent, setConvertedContent] = useState('');
 
     useEffect(() => {
          let html = convertToHTML({
            entityToHTML: (entity : any , originalText : any ) => {
              if (entity.type === 'IMAGE') {          
                return `<img src="${entity.data.src}" />`;
              }
              
              return originalText;
            },
          })(editorState.getCurrentContent());
          setData(html)
          
          
        }, [editorState]);
  return (
     <Editor
     toolbarClassName="toolbarClassName"
     wrapperClassName="wrapperClassName"
     editorClassName="editorClassName"
     editorState={editorState}
     onEditorStateChange={setEditorState}
     editorStyle={{ background: "#fff" , minHeight : "300px" }}
     
     />
  )
}

export default MyEditor
