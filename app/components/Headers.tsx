"use client";

import {
  createStyles,
  Menu,
  Center,
  Header,
  Container,
  Group,
  Button,
  Burger,
  rem,
  Text,
  Flex,
  Modal,
  Avatar
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import {CreatePost} from './Modal/CreatePost'
import {AiOutlineSearch} from 'react-icons/ai'
import {IoCreateOutline} from 'react-icons/io5'
import { Dispatch, SetStateAction, useState } from 'react';
import Search from './Modal/Search';
const HEADER_HEIGHT = rem(60);
import { IconSettings, IconMessageCircle,IconLogout,IconUser } from '@tabler/icons-react';
import { signOut, useSession } from 'next-auth/react';
import { AuthModal } from './Modal/Auth/AuthModal';
import LoginButton from './LoginButton';
import Link from 'next/link';
import Notifications from './Modal/Notifications/Notifications';
import Image from 'next/image';

const useStyles = createStyles((theme) => ({
  inner: {
    height: HEADER_HEIGHT,
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    background:"#150050"
  },

  links: {
    [theme.fn.smallerThan('sm')]: {
      display: 'none',
    },
  },

  burger: {
    [theme.fn.largerThan('sm')]: {
      display: 'none',
    },
  },

  link: {
    display: 'block',
    lineHeight: 1,
    padding: `${rem(8)} ${rem(12)}`,
    borderRadius: theme.radius.sm,
    textDecoration: 'none',
    color: theme.colorScheme === 'dark' ? theme.colors.dark[0] : theme.colors.gray[7],
    fontSize: theme.fontSizes.sm,
    fontWeight: 500,
    '&:hover': {
      backgroundColor: "#2222224e",
    },
  },

  linkLabel: {
    marginRight: rem(5),
  },
  item: {
    '&[data-hovered]': {
      backgroundColor: theme.colors[theme.primaryColor][theme.fn.primaryShade()],
      color: theme.white,
    },
  },
  }
));

interface HeaderActionProps {
  isVisible : boolean ,
  setIsVesible : Dispatch<SetStateAction<any>>
}


export function Headers(props : HeaderActionProps) {
  const {data} = useSession()
  const { classes } = useStyles();
 
const [opened, { open : isOpen, close }] = useDisclosure(false);
const [isSearchOpen , setisSearchOpen] = useState(false)
  

  return (
    <>
    <Header height={HEADER_HEIGHT} sx={{ borderBottom: 0 }} mb={30}>
      <Container className={classes.inner} fluid>
        <Group>
          <Link href={'/'}>
          <Image alt='' src={'/android-chrome-512x512.png'} width={50} height={50} style={{borderRadius:"90%", objectFit:"cover"}} />

          </Link>
        </Group>
        <Menu>
      <Flex justify={'center'} align={'center'} gap={'xl'}>
        {/* <Button   styles={{
          root :{":hover" : {background :'transparent'} , background : "transparent",':disabled' : {opacity:"0.7"}}
        }}>
        <IoCreateOutline cursor={"pointer"} color='#fff' size={25} onClick={isOpen} />

        </Button> */}
       
      <AiOutlineSearch onClick={()=> setisSearchOpen(true)} cursor={"pointer"} color='#fff' size={25}  />
      {data?.user ? (
        <Notifications/>
      ) : null}
      {data?.user ? (
         <Menu.Target>
         <Image  style={{cursor:"pointer",width:"40px",height:"40px",borderRadius:"100%",objectFit:"cover"}} alt='' width={40} height={40}  src={data?.user?.image === null ? "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/Unknown_person.jpg/434px-Unknown_person.jpg" : `${data?.user?.image}`}  />
     
           </Menu.Target>
      ) :   <LoginButton/> }
     
      </Flex>

        <Menu.Dropdown bg={'#150050'} mt={10}   >
        <Menu.Label color='#fff'>{data?.user?.name}</Menu.Label>
        <Menu.Item color='#fff' icon={<IconUser size={14} />}>
          <Link style={{color:"#fff"}} href={`/profile/${data?.user.name}/${data?.user?.id}`}>  الملف الشخصي</Link>
        
        </Menu.Item>
        <Menu.Item onClick={isOpen} color='#fff' icon={<IoCreateOutline size={14} />}>انشاء منشور</Menu.Item>
 

        <Menu.Divider />

      
     
        <Menu.Item onClick={() => signOut()} color="#FB2576" icon={<IconLogout size={14} />}>تسجيل خروج</Menu.Item>
      </Menu.Dropdown>
</Menu>

    
      </Container>
    </Header>
    {
      isSearchOpen && <Search isSearchOpen={isSearchOpen} setSearchOpen={setisSearchOpen} />
    }
    {
      <Modal opened={opened} onClose={close} size="calc(100vw - 3rem)">
  <CreatePost close={close} />
      </Modal>
   
      

    
    }
  
    </>
  );
}