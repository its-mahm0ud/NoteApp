import React, { useContext, useState } from 'react'
import loginImage from "../assets/Screenshot_2025-08-24_172133-removebg-preview.png";
import { Button, Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import loginSchema from '../allSchema/loginSchema';
import handleLoginApi from '../Services/loginServices';
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'


export default function LoginPage() {

  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    resolver: zodResolver(loginSchema)
  })
  async function handleSubmitLoginForm(formData) {
    setIsLoading(true);
    const res = await handleLoginApi(formData)
    if (res.data?.msg == "done") {
      setIsSuccess(res.data.msg)
      setIsError(false)
      console.log(res.data);
      localStorage.setItem("token",'3b8ny__'+ res.data.token)
      
      setIsLoading(false);
       Toastify({
        text: "Your account has been created",
        duration: 2300
      }).showToast();
      setTimeout(() => {
        navigate("/")
      }, 2500);
    } else {
      setIsLoading(false);
      setIsError(res)

    }


  }


  return (
    <div className="flex max-sm:flex-wrap items-center justify-between p-6 ">
      <div className="w-[40%] max-sm:w-full">
        <img className="object-contain " src={loginImage} alt="" />
      </div>
      <div className="w-full md:w-[50%] p-3   rounded-3xl shadow-2xl mx-auto ">
        <form onSubmit={handleSubmit(handleSubmitLoginForm)} className=" flex flex-col gap-4 w-[80%] mx-auto">
          <h1 className=" bg-linear-to-r from-backGround to-anotherText bg-clip-text text-transparent text-center">Create an Account </h1>
          <Input isDisabled={isLoading} isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} label="Email" type="email" variant="bordered" {...register("email")} />
          <Input isDisabled={isLoading} isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" type="password" variant="bordered" {...register("password")} />
          <Button isLoading={isLoading} type="submit" className="bg-linear-to-r from-backGround to-anotherText text-white">LogIn</Button>
          {isError && <p className="bg-danger-200 text-center"><i className="fa-solid fa-xmark" />{isError}</p>}
          {isSuccess && <p className="bg-success-400 text-center"><i className="fa-solid fa-check-double" />{isSuccess}</p>}
          <p className="text-sm text-center mt-2 text-gray-600">You don't have an account?
            <Link to="/register" className="text-primary">Rigister</Link>
          </p>
        </form>
      </div>
    </div>

  )
}





