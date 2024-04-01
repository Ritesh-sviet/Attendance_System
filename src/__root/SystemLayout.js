import React, { useEffect, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import moment from 'moment';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternAttendanceRecords } from '../redux/slices/FetchDetailsSlice';

const SystemLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (!sessionStorage.getItem('token')) {
      navigate('/');
      toast.error("please login first")
    }
  }, [])


 
  return (
    <>
      
      <Outlet />
    </>
  );
};

export default SystemLayout;
