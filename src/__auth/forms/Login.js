import { ErrorMessage, Field, Form, Formik } from 'formik';
import React from 'react'
import { loginInitialValues, loginValidationSchema } from '../../validation/authValidation';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const Login = () => {
  const navigate = useNavigate();
  return (
    <>
      <section>
        <div className="bg-white relative items-center w-full px-5 py-12 mx-auto md:px-12 lg:px-20 max-w-7xl">
          <div className="w-full max-w-md mx-auto md:max-w-sm md:px-0 md:w-96 sm:px-4">
            <div className="flex flex-col">
              <div>
                <h2 className="text-4xl text-black">Login</h2>
              </div>
            </div>
            <Formik initialValues={loginInitialValues} validationSchema={loginValidationSchema}

              onSubmit={async (values, { setSubmitting, resetForm }) => {
                try {
                  const url = "http://localhost:8000/api/v1/login"
                  const response = await axios.post(url, {
                    email: values.email,
                    password: values.password,
                  })
                  if (response.data.success) {

                    toast.success(response.data.message);
                    setSubmitting(false);
                    sessionStorage.setItem("token", response.data.token);
                    navigate("/home")
                    resetForm();
                  }
                  else{
                    toast.error(response.data.message)
                  }

                } catch (error) {
                  toast.error(error.response.data.message);
                }
              }}
            >
              <Form>
                <div className="mt-4 space-y-6">
                  <div className="col-span-full h-[90px]">
                    <label className="block mb-3 text-sm font-medium text-gray-600"> Email   </label>
                    <Field type="email" placeholder="Email" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" name="email" />
                    <p className='text-red-500 absolute text-sm my-2'><ErrorMessage name="email" /></p>
                  </div>
                  <div className="col-span-full h-[100px]">
                    <label className="block mb-3 text-sm font-medium text-gray-600"> Password   </label>
                    <Field type="password" placeholder="Password" className="block w-full px-6 py-3 text-black bg-white border border-gray-200 rounded-full appearance-none placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" name="password" />
                    <p className='text-red-500 absolute text-sm my-2'><ErrorMessage name="password" /></p>
                  </div>

                  <div className="col-span-full h-[90px]">
                    <button type="submit" className="items-center justify-center w-full px-6 py-2.5 text-center text-white duration-200 bg-black border-2 border-black rounded-full inline-flex hover:bg-transparent hover:border-black hover:text-black focus:outline-none focus-visible:outline-black text-sm focus-visible:ring-black"> Login   </button>
                    <p className='w-full flex justify-center pt-10'>Already have an account ? &nbsp; <Link to={"/register"} className='text-blue-600 underline'> Register </Link></p>
                  </div>
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
    </>
  )
}

export default Login