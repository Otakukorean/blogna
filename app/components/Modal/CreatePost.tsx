import {
  TextInput,
  Paper,
  Button,
  Image, 
  Center
} from '@mantine/core';
import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';
import './CreatePostStyle.scss'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from 'axios';
import { File } from 'buffer';
import {  toast } from 'react-toastify';


// const MyEditor = dynamic(() => import('../Editor/MyEditor'),{ssr:false})
const MyEditor = dynamic(
  () =>
    import("../Editor/MyEditor"),
  { ssr: false }
);
interface PageProps {
  close : () => void
}



export function CreatePost(props : PageProps) {
  const [data,setData]=useState('')
  const [SingleFile ,setSignleFile] = useState<File>()
  const [title , setTitle] = useState('')
  const [disabeld , setDisabled] = useState(true)
  const [file,setFile]  = useState<string | null | any>(null)




  const getFile = (e : any ) => {
    if (e?.target?.files[0]) {
    
        const image = e.target.files[0]
        const File = new FileReader();
        File.onloadend =() => {
            setFile(File.result )
            console.log(File.result )
            
            
        }
        File.readAsDataURL(image)
    }

}  
const handleSetFileName = (e : any) => {
  if (e.target.files != null) {
    setSignleFile(e.target.files[0])   
  }

};




useEffect(() => {
    console.log(data)
    
},[data])

const queryClient = useQueryClient()
const { mutate } = useMutation(
    async (data ) => {
      return axios.post(`/api/posts/CreatePost` , data)
    },
    {
      onSuccess: (data) => {
        queryClient.invalidateQueries(['posts'])
        toast.success('تم انشاء المنشور بنجاح')
        props.close()
    

      },
      onError: (error : any) => {
      toast.error(`${error.message}`)
      
    
      },
    }
  )

  useEffect(() =>{
     if(title.length <= 7||!SingleFile || data.length <= 8){
    setDisabled(true)
  }
  else {
    setDisabled(false)
  }
  },[title,data,SingleFile])


 

    

   const onSubmit =async (e : any) => {



    e.preventDefault()
    const formData:any = new FormData();
    formData.append('title' , title)
    formData.append('content',data)
    formData.append('cover',SingleFile)

    mutate(formData)

  }

  return (
    <Paper radius="md" p="xl" bg={"#222"} >
  
      <TextInput
      label='العنوان'
      placeholder='العنوان'
      styles={{'input':{background:"#333",border:"none",marginBottom:"20px",color:"#fff",':focus' : {border : '1px solid #fff'}},'label':{marginBottom:'10px'}}}

    onChange={(e) => setTitle(e.target.value)}
      />
<label htmlFor="images" className="drop-container">
  <span className="drop-title">Drop files here</span>
  or
  <input type="file" id="images" accept="image/*" required onChange={(e) => {
    handleSetFileName(e)
getFile(e)
  }}  />
</label>


               {file == null ? null :  <Image maw={240} mx="auto" radius="md" src={file} alt="Random image" mb={30} />} 
   
      <MyEditor  setData={setData}   />
      <Center mt={20}>
      <Button onClick={onSubmit} disabled={disabeld}  styles={{'root':{background:"#FB2576" ,transition:"all .2s ease",':hover ':{background:"#FB2576",opacity:.7},':disabled':{opacity:0.7}}}} >انشاء</Button>

  
      </Center>
 

  
    </Paper>
  );
}