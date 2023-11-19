import {useNavigate} from 'react-router-dom'
import React, { useEffect } from 'react'

const Redurect = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        navigate("/");
    },[]);
  return (
    <></>
  )
}

export default Redurect