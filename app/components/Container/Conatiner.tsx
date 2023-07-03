'use client'
import { MantineProvider ,AppShell, Aside, MediaQuery,Center} from '@mantine/core';
import { ReactNode, useState } from "react"
import { Headers } from '../Headers';
import { SessionProvider } from "next-auth/react"
import { Notifications } from '@mantine/notifications';
import { QueryClient , QueryClientProvider } from "@tanstack/react-query"
import LinksMenu from '../LinksMenu/LinksMenu';
import { ModalsProvider } from '@mantine/modals';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
interface Props  {
     children? : ReactNode    
}


const queryClient = new QueryClient()



const Conatiner = ({children} : Props): any =>{

     const [isVisible, setIsVisible] = useState(false); 
     const handleToggle = () => { setIsVisible(!isVisible); };
 
   
     return (
          <>
          <SessionProvider >
               <QueryClientProvider client={queryClient}>
          <MantineProvider withGlobalStyles withNormalizeCSS theme={{
           colorScheme :"dark" ,
           colors :{
                dark :[
                     "#000000b0"
                ]
           } 
          }
          }
          >
               <ModalsProvider >
             
                <Headers isVisible={isVisible} setIsVesible={setIsVisible}  />
                <ToastContainer
                    position="top-right"
                    autoClose={5000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={true}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme="dark"
               
               />
               <LinksMenu/>
                {children}
                 
                </ModalsProvider>
            
           </MantineProvider> 
           </QueryClientProvider>
           </SessionProvider>
       
      
      
           </>
     )
} 

export default Conatiner