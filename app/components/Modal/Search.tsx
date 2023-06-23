import React, { useEffect, useState } from 'react'
import './Search.scss'
import Link from 'next/link'
import { motion } from "framer-motion"
import {AiOutlineClose,AiOutlineSearch} from 'react-icons/ai'
import useDebounce from '@/app/hooks/useDebounce'
import axios from 'axios'

interface ToggleType  {
  isSearchOpen : boolean ,
  setSearchOpen : (isSearchOpen: boolean) => void
}
const Search = (props : ToggleType) => {
  const [notices,setNotices] = useState([])
  const [search,setSearch] = useState<string >()
  const [loading , setLoading] = useState(false)

  const debouncedSearch = useDebounce(search , 500)
  useEffect(() => {
    // search the api

    async function fetchData() {
   

        setLoading(true) 

        await axios.get(`/api/posts/search?q=${debouncedSearch}&limit=1000`).then((res) => {
            setNotices(res.data.result)
            setLoading(false)
          })
          
     
          
        }
    
        if(debouncedSearch) fetchData()
  



    

  
  },[debouncedSearch])

  const clearInput = () => {
    setNotices([]);
    setSearch("");
   };

   const {isSearchOpen , setSearchOpen} = props;
   const toggleModal = () => {
        setSearchOpen(false)
   }
   const container = {
    hidden: { opacity: 1, scale: 0 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delayChildren: 0.3,
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1
    }
  };
  

  return (
    <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1}}
    transition={{ duration: 0.1 }}>

      {
        isSearchOpen ? (
          <div className='Modal'>
            <div className="Overlay" onClick={toggleModal}></div>
            <div className="Content">
              <div className="SearchInputs">
                <input type="text" placeholder='Search' className='Input' 
                    
                    value={search}
                    onChange={(e) => setSearch(e.target.value)  }
                />
                <div className="SearchIcon">
                  {notices.length === 0 ? (
                <AiOutlineSearch style={{cursor:"pointer"}}  size={20} />

                  ) : 
                  <AiOutlineClose style={{cursor:"pointer"}}  size={20} id="clearBtn" onClick={clearInput} />}
                </div>
              </div>
              
              <>
              {notices.length === 0 ? null : (
      <motion.div className="DataResult" variants={container}>
        {
          notices.map((not : any,key) => (
            <motion.div className='DataItem' variants={item} key={key}>
            <Link  href={`/post/${not.user.name}/${not.id}`} onClick={toggleModal}>
              <p>{not.title}</p>
            </Link>
          </motion.div>
          ))
        }

      </motion.div>
              )}
        
        </>
                <div className='close-modal'>
                <AiOutlineClose/>
                </div>
            </div>
          </div>
        ) : null
      }
      
    </motion.div >
  )
}

export default Search
