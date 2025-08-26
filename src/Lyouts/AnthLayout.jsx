import React from 'react'
import logoImage from "../assets/Screenshot_2025-08-24_172114-removebg-preview.png";
import { Outlet } from 'react-router-dom'

export default function AnthLayout() {
  return (
    <div>


      <div className="flex max-sm:h-full min-h-screen bg-backGround">
        <div className="container rounded-2xl bg-innerGround  my-auto shadow-xl p-5">
          <div className="flex items-center">
            <h1 className="bg-linear-to-r from-backGround to-anotherText bg-clip-text text-transparent">Note App</h1>
            <img className="size-20" src={logoImage} alt="" />
          </div>
          <Outlet />
        </div>
      </div>
    </div>
  )
}
