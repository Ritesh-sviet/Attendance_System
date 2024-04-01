import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchInternAttendanceRecords } from '../../redux/slices/FetchDetailsSlice';
import moment from 'moment';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Attendance = () => {
  const [isPunchedIn, setIsPunchedIn] = useState(false);
  const [isPunchedOut, setIsPunchedOut] = useState(false);
  const [currentTime, setCurrentTime] = useState(moment().format('LLLL'));
  const dispatch = useDispatch();
  const navigate = useNavigate();


  useEffect(() => {
    dispatch(fetchInternAttendanceRecords());

    // Update time every second
    const intervalId = setInterval(() => {
      setCurrentTime(moment().format('LLLL'));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [dispatch]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/v1/logout", {}, {
        headers: {
          Accept: "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("token")}`,
        }
      });
      if (response.data.success) {
        toast.success(response.data.message);
        sessionStorage.removeItem("token");
        navigate("/");
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const handleSubmit = async (punch) => {
    if (punch === "in") {
      setIsPunchedIn(true);
    } else if (punch === "out") {
      setIsPunchedOut(true);
    }
    const currentDate = moment().format('YYYY-MM-DD');
    const currentTime = moment().format('HH:mm:ss');
    const attendance = {
      date: currentDate,
      in_time: currentTime,
      out_time: currentTime,
    };
    try {
      const response = await axios.post(
        'http://localhost:8000/api/v1/attendance',
        attendance,
        {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        }
      );
      if (response.data.success) {
        dispatch(fetchInternAttendanceRecords());
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  const attendanceRecords = useSelector(state => state.data.AttendanceRecords);

  return (
    <>
      <div className="flex justify-between items-center w-full py-10 px-10">
        <div className="text-3xl italic font-serif">Attendance Page</div>

        <button
          onClick={handleLogout}
          className="w-[5%] bg-red-500 text-white rounded-2xl active:scale-75 active:transition-all active:ease-in"
        >
          Logout
        </button>
      </div>
      <div className="flex justify-center">
        <p className="pb-5 text-blue-500"> Date : {currentTime}</p>
        <button onClick={() => handleSubmit("in")} className={`w-20 rounded-md text-white ml-10 h-10 ${isPunchedIn ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500'}`} disabled={isPunchedIn}>
          Punch In
        </button>
        <button onClick={() => handleSubmit("out")} className={`w-20 rounded-md text-white ml-10 h-10 ${isPunchedOut ? 'bg-gray-500 cursor-not-allowed' : 'bg-red-500'}`} disabled={isPunchedOut}>
          Punch Out
        </button>
      </div>

      <div className="flex justify-center mt-10">
        <div className="w-[80%]">
          <div className="overflow-x-auto">
            <div className="border rounded-lg shadow overflow-hidden">
              <table className="min-w-full divide-y divide-gray-800 text-center">
                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">In</th>
                    <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Out</th>
                  </tr>
                </thead>
                {(attendanceRecords?.length !== 0 && attendanceRecords) ? (
                  attendanceRecords.map((intern, index) => {


                    return (
                      <>
                        <tbody className="divide-y divide-gray-800">
                        <div className="text-lg italic font-mono absolute top-[2em] left-[50em] ">Welcome {intern.intern.name}</div>
                          <tr key={index}>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{moment(intern.date, 'YYYY-MM-DD').format('DD MMMM YYYY')}</td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-white ${intern.in_time ? 'bg-green-600' : ''}`}>
                              {intern.in_time ? moment(intern.in_time, 'HH:mm:ss').format('LT') : 'Not marked'}
                            </td>
                            <td className={`px-6 py-4 whitespace-nowrap text-sm text-white ${intern.out_time ? 'bg-red-600' : ''}`}>
                              {intern.out_time ? moment(intern.out_time, 'HH:mm:ss').format('LT') : (<div className='text-red-500'>Not Marked</div>)}
                            </td>
                          </tr>
                        </tbody>
                      </>
                    )
                  }
                  )
                ) : (
                  <div className="flex justify-center mt-10">
                    <div className="w-[80%]">
                      <div className="overflow-x-auto">
                        <div className="border rounded-lg shadow overflow-hidden">
                          <table className="min-w-full divide-y divide-gray-800 text-center">
                            <thead className="bg-gray-50">
                              <tr>
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Date</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">In</th>
                                <th scope="col" className="px-6 py-3 text-xs font-medium text-gray-500 uppercase">Out</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-800">
                              <tr>
                                <td colSpan="3" className="px-6 py-4 text-center text-sm font-medium text-gray-800">
                                  No records found
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

              </table>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Attendance;
