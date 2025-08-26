import React, { useState } from "react";
import registerImage from "../assets/Screenshot_2025-08-24_172152-removebg-preview.png";
import { Button, Input } from "@heroui/react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import registerSchema from "../allSchema/registerSchema";
import handleRegitserApi from "../Services/registerServices";
import Toastify from 'toastify-js'
import 'toastify-js/src/toastify.css'


export default function RegisterPage() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const { handleSubmit, register, formState: { errors } } = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      age: "",
      phone: "",
    },
    resolver: zodResolver(registerSchema)
  })

  async function handleSubmitRegisterForm(formData) {
    setIsLoading(true);
    const res = await handleRegitserApi(formData)
    if (res.data?.msg == "done") {
      setIsSuccess(res.data.msg)
      setIsLoading(false);
      Toastify({
        text: "Your account has been created",
        duration: 2300
      }).showToast();
      setTimeout(() => {
        navigate("/login")
      }, 2500);
    } else {
      setIsLoading(false);
      setIsError(res)

    }
  }






  return (
    <div className="flex max-sm:flex-wrap items-center justify-between">
      <div className="w-[40%] max-sm:w-full">
        <img className="object-contain " src={registerImage} alt="" />
      </div>
      <div className="w-full md:w-[50%] p-2    rounded-3xl shadow-2xl mx-auto ">
        <form onSubmit={handleSubmit(handleSubmitRegisterForm)} className=" flex flex-col gap-4 w-[80%] mx-auto">
          <h1 className=" bg-linear-to-r from-backGround to-anotherText bg-clip-text text-transparent text-center">Create an Account </h1>
          <Input isDisabled={isLoading} isInvalid={Boolean(errors.name?.message)} errorMessage={errors.name?.message} label="Name" type="text" variant="bordered" {...register("name")} />
          <Input isDisabled={isLoading} isInvalid={Boolean(errors.email?.message)} errorMessage={errors.email?.message} label="Email" type="email" variant="bordered" {...register("email")} />
          <Input isDisabled={isLoading} isInvalid={Boolean(errors.password?.message)} errorMessage={errors.password?.message} label="Password" type="password" variant="bordered" {...register("password")} />
          <Input isDisabled={isLoading} isInvalid={Boolean(errors.age?.message)} errorMessage={errors.age?.message} label="Date of Birth" type="date" variant="bordered" {...register("age")} />
          <Input isDisabled={isLoading} isInvalid={Boolean(errors.phone?.message)} errorMessage={errors.phone?.message} label="Phone" type="tel" variant="bordered" {...register("phone")} />
          <Button isLoading={isLoading} type="submit" className="bg-linear-to-r from-backGround to-anotherText text-white">Register</Button>
          {isError && <p className="bg-danger-200 text-center"><i className="fa-solid fa-xmark" />{isError}</p>}
          {isSuccess && <p className="bg-success-400 text-center"><i className="fa-solid fa-check-double" />{isSuccess}</p>}
          <p className="text-sm text-center mt-2 text-gray-600">Already have an account?
            <Link to="/login" className="text-primary">Login</Link>
          </p>
        </form>
      </div>
    </div>

  );
}









