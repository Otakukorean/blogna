import React from 'react'
import { useDisclosure } from '@mantine/hooks';

import {
     Button,

     Modal,

   } from '@mantine/core';
import { AuthModal } from './Modal/Auth/AuthModal';
const LoginButton = () => {
     const [opened, { open , close }] = useDisclosure(false);

  return (
    <div>
      <Button onClick={open}  styles={{'root' : {background:"#FB2576", transition : 'all .2s ease ',':hover' : {background:"#FB2576" ,opacity:0.7}}}} >تسجيل دخول </Button>
      
      <Modal opened={opened} onClose={close}>

          <AuthModal/>

      </Modal>
    </div>
  )
}

export default LoginButton
