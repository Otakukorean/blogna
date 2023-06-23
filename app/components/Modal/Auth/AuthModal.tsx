import { tuple, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { useToggle, upperFirst } from '@mantine/hooks';
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
} from '@mantine/core';
import {AiFillGithub} from 'react-icons/ai'
import {BsDiscord} from 'react-icons/bs'
import axios from 'axios'
import { SubmitHandler, useForm } from "react-hook-form";

import { notifications } from '@mantine/notifications';
import { signIn } from 'next-auth/react';
import { useScroll } from 'framer-motion';
import { useState } from 'react';
import {  toast } from 'react-toastify';

const registerschema = z.object({
  name: z.string().min(2, { message: 'Name should have at least 2 letters' }),
  email: z.string().email({ message: 'Invalid email' }).nonempty({message :'هذا الحقل مطلوب'}),
  password: z.string().min(8, { message: 'كلمة المرور صغيرة للغاية' }).max(255,{message : 'كلمة المرور كبيرة للغاية'}).nonempty({message :'هذا الحقل مطلوب'}),
});
const Loginschema = z.object({
  email: z.string().email({ message: 'Invalid email' }).nonempty({message :'هذا الحقل مطلوب'}),
  password: z.string().min(8, { message: 'كلمة المرور صغيرة للغاية' }).max(255,{message : 'كلمة المرور كبيرة للغاية'}).nonempty({message :'هذا الحقل مطلوب'}),
});

export function AuthModal() {
  const [type,setType] = useState('login')

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(type === 'login' ? Loginschema : registerschema ),
  });
  // const onSubmit = () => {
 


   

    const onSubmit= (data : any) => {
      if(type === 'login') {
        signIn('credentials', {
          ...data,
          redirect : false
        })
        .then((callback) => {
          if(callback?.ok) {
            toast.success('تم تسجيل الدخول')
          }
          if(callback?.error) {
            notifications.show({
              title:"تم التسجيل",
              message:"تم التسجيل بنجاح" ,
              color:"red"
            })
          }
        })
      }
      else {
       axios.post('/api/user/register',data).then(() => {
          console.log('Succsses');
          setType('login')
          
       }).catch((error : any) => {
        toast.error(error.response.data.message);
        
        
       }) 
      }
  
     
      
    };
  
 
  


  return (
    <Paper radius="md" p="xl" bg={"#222"} >
    


      <Group grow mb="md" mt="md">
      <Button onClick={() => signIn('github')} style={{background:"#0d1117"}} ><AiFillGithub size={25}/></Button>
      </Group>

      <Divider color='#fff' label="او عن طريق الايميل" labelPosition="center" my="lg" />

      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack>
          {type === 'register' && (
            <>
                   <TextInput
                 styles={{'input':{background:"transparent",color:"#fff",':focus' : {border : '1px solid #fff'}},'label':{marginBottom:'10px'}}}
                   label="اسم المستخدم"
                   placeholder="اسم المستخدم"
                
                   {...(register('name', { required: true }))}
                 />
                 {errors.name && 
                   `${errors.name?.message}` 
                
                 }
            
            </>
          
                 

       
          )}

          <TextInput
          styles={{'input':{background:"transparent",color:"#fff",':focus' : {border : '1px solid #fff'}},'label':{marginBottom:'10px'}}}
            label="البريد الالكتروني"
            placeholder="hello@mantine.dev"
         
            {...(register('email', { required: true }))}
          />
             {errors.name && 
                   `${errors.email?.message}` 
                
                 }

          <PasswordInput
               styles={{'input':{background:"transparent",color:"#fff !important",':focus' : {border : '1px solid #fff'}},'label':{marginBottom:'10px'}}}
            label="كلمة المرور"
            placeholder="كلمة المرور"
            {...(register('password', { required: true }))}
            radius="md"
       
          />
            {errors.name && 
                   `${errors.password?.message}` 
                
                 }

    
        </Stack>

        <Group position="apart" mt="xl">
          <Anchor
            component="button"
            type="button"
            color="dimmed"
        
            size="xs"
            onClick={() => {
              if(type === 'register') {
                setType('login')
              }
              else {
                setType('register')
              }
            }}
          >
          {type === "register" ? "لديك جساب ؟ تسجيل دخول" : "ليس لديك حساب ؟ تسجيل"}
          </Anchor>
          <button type="submit"  >
            {type === "register" ? "تسجيل" : "تسجيل دخول"}
         
          </button>
        </Group>
      </form>
    </Paper>
  );
}