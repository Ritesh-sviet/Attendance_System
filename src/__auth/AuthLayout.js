import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
const AuthLayout = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem('token')) {
      navigate('/home');
    }
  }, [])
  return (
    <>
      <Outlet />
    </>
  )
}

export default AuthLayout