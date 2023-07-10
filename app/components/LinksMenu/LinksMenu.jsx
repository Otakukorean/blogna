import React from 'react'

import {AiOutlineHome , AiOutlineClockCircle,AiOutlineInfoCircle,AiOutlineAlignLeft} from 'react-icons/ai'
import Link from 'next/link' 
import { usePathname } from "next/navigation";

import Carousel from "react-elastic-carousel";

const LinksMenu = () => {
     const Data = [
          {
               name : "الصفحة الرئيسية",
               url : "/" ,
               icon : <AiOutlineHome/>
          } ,
   
          {
               name : "المتابعين" ,
               url : "/following" ,
               icon :<AiOutlineAlignLeft/>
          }  ,    
          {
               name : "الاحدث" ,
               url : "/latest" ,
               icon :<AiOutlineClockCircle/>
          } 


]


   const pathname = usePathname()
   const breakPoints = [
    { width: 1, itemsToShow: 1.5},
    { width: 550, itemsToShow:  2.3, itemsToScroll: 2 },
    { width: 768, itemsToShow: 4 },
    { width: 1200, itemsToShow: 4 }
  ];
  return (
    <div style={{marginBottom:"3rem"}}>
    <Carousel
 breakPoints={breakPoints}
   disableArrowsOnEnd={true}
     pagination={false}
     showArrows={false}
     
  >

    {
         Data.map((value,key) => (
            
                   <Link style={{width:"100%",padding:"5px"}}   href={value.url}><span className={pathname == value.url ? "active" : ""} style={{background:"#fff",padding:"2px",display:"flex",justifyContent:"center",alignItems:"center",borderRadius:"15px",gap:"5px",color:"#000"}} >{value.icon} {value.name} </span></Link>
                   
             
         ))
    }
  


  </Carousel>
  </div>
  )
}

export default LinksMenu
