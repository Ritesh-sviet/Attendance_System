
import { Routes, Route } from "react-router-dom";
import AuthLayout from './__auth/AuthLayout';
import { Login, Register } from './__auth/forms';
import SystemLayout from './__root/SystemLayout';
import { Attendance } from './__root/pages';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
function App() {
  return (
    <>

      <ToastContainer />
      <Routes>

        <Route element={<AuthLayout />}>
          <Route path='/register' element={<Register />} />
          <Route index element={<Login />} />
        </Route>
        <Route element={<SystemLayout />}>
          <Route path='/home' element={<Attendance />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
