import { useNavigate } from 'react-router-dom'
import React, { useEffect } from 'react'

const Redirect = () => {
  const navigate = useNavigate();
  useEffect(() => {
    navigate("/");
  }, []);
  return (
    <></>
  )
}

export default Redirect