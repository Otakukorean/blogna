
import {
  TextInput,
  PasswordInput,
  Text,
  Paper,
  Group,
  Button ,
  Divider,
  Checkbox,
  Anchor,
  Stack,
  Center,
  Flex
} from '@mantine/core';
import axios from 'axios'
import { useMutation, useQueryClient } from "@tanstack/react-query"
import {  useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import {  toast } from 'react-toastify';
import Image from 'next/image';
import { useRouter } from "next/navigation";



interface PageProps {
  queryKey : string;
  close : () => void
}


export function EditUserModal(props : PageProps) {

  const {data  , update}= useSession()

  // const onSubmit = () => {
 
  const [SingleFile ,setSignleFile] = useState<File>()
  const [file,setFile]  = useState<string | null | any>(data?.user?.image)
  const [username,setUsername] = useState<string>(data?.user.name as string)
  const [imagefilename ,setImageFileName] = useState<string>(data?.user?.image as string)
  const [isDisabled,setIsDisabled] = useState<boolean>(false)
  const router = useRouter();

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
      setImageFileName(e.target.files[0].name)
    }
  
  };

  useEffect(() => {

    if(username !== data?.user?.name || file !== data?.user?.image) {
      setIsDisabled(false)
    }
    else {
      setIsDisabled(true)
    }

  },[username,file])
  
  const queryClient = useQueryClient()

  const updateSession = async (username : string , image  : any ) => {
    // if (session) session.user.accessToken = "dddd";

    await update({
      ...data,
      user: {
        ...data?.user,
       name : username ,
       picture : image ,
      
      },
    });
  }

  const { mutate } = useMutation(
    async ( data : any) => {
      return axios.put(`/api/user/update` , data)
    },
    {
      onSuccess: async (result) => {
        queryClient.invalidateQueries([props.queryKey])
        toast.success('تم  التعديل بنجاح')
        props.close()
       await updateSession(username , `/images/${result.data.filename}`)
       window.location.reload()
      
      
      },
      onError: (error) => {
      console.log(error);
      
    
      },
    }
  )

  const onSubmit =async (e : any) => {



    e.preventDefault()
    const formData:any = new FormData();
    formData.append('username' , username)
    formData.append('cover',SingleFile)
    formData.append('userId',data?.user?.id)

    mutate(formData)
  
    


  }

 
  
    

  return (
    <Paper radius="md" p="xl" bg={"#222"} >
      <Text color='#fff' align='center' mb={20} size={'xl'}>تعديل الحساب</Text>
    <form  onSubmit={  (e) => {

      onSubmit(e)
    }
    } >
      <Center mb={30} >
        <Flex direction={'column'} align={'center'} justify={'center'}>
      <Image src={!file ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg' : `${file}`} width={150} height={150}  alt='' style={{width :"150px" ,height:"150px",marginBottom:"20px",borderRadius:"100%",objectFit:"cover"}} />

      <label htmlFor="images" className="drop-container">
  <span className="drop-title">Drop files here</span>
  or
  <input type="file" id="images" accept="image/*" required onChange={(e) => {
    handleSetFileName(e)
getFile(e)
  }}  />
</label>
</Flex>

      </Center>
    <TextInput
                 styles={{'input':{background:"transparent",color:"#fff",':focus' : {border : '1px solid #fff'}},'label':{marginBottom:'10px'}}}
                   label="اسم المستخدم"
                   placeholder="اسم المستخدم"
                   value={username}
                   onChange={(e) => setUsername(e.target.value)}
                 />

                 <Center>
                 <Button type='submit'    styles={{'root':{background:"#FB2576" ,transition:"all .2s ease",':hover ':{background:"#FB2576",opacity:.7},':disabled':{opacity:0.7}}}} mt={20} >تعديل</Button>
                 </Center>


    </form>
    </Paper>
  );
}