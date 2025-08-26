import React, { useContext, useState } from 'react'
import { Button, Navbar, NavbarBrand, NavbarContent } from '@heroui/react';
import { Link, useNavigate } from 'react-router-dom';
import logoImage from "../assets/Screenshot_2025-08-24_172114-removebg-preview.png";




export default function NavbarComponent() {

    const [isLoadingOut, setIsLoadingOut] = useState(false)
    const navigate = useNavigate()
    function hangleLogout() {
        setIsLoadingOut(true);
        localStorage.removeItem("token")
        navigate("/login");
    }

    return (
        <div>
            <Navbar className='bg-innerGround' >
                <NavbarBrand className=''>
                    <img className="size-18" src={logoImage} alt="" />
                    <p className="font-bold text-inherit">Take notes</p>
                </NavbarBrand>
                <NavbarContent className='' justify="end">
                    <Button isLoading={isLoadingOut} onPress={hangleLogout} color="danger" variant="flat">
                        LogOut
                    </Button>
                </NavbarContent>
            </Navbar>
        </div>
    )
}
