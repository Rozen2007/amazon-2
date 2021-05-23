import React, { useEffect, useState } from 'react'
import Image from "next/image"
import { useRouter } from "next/router"
import {
    MenuIcon,
    ShoppingCartIcon,
    SearchIcon,
    LocationMarkerIcon
} from "@heroicons/react/outline";
import {
    ChevronDownIcon
} from "@heroicons/react/solid";
import { useDispatch, useSelector } from 'react-redux'
import { selectUser, signIn, signOut } from '../slices/userSlice'
import { auth } from '../Firebase'
import Sidebar from './Sidebar'
import { selectItems } from '../slices/basketSlice'

function Header() {

    const router = useRouter()
    const user = useSelector(selectUser)
    const basket = useSelector(selectItems)

    const [sidebar, setSidebar] = useState(false)
    const dispatch = useDispatch()

    useEffect(() => {
        auth.onAuthStateChanged(
            auth => {
                if(auth){
                    dispatch(
                        signIn({
                            uid: auth.uid,
                            email: auth.email,
                            displayName: auth.displayName
                        })
                    )
                } 
                else{
                    dispatch(
                        signOut()
                    )
                }
            }
        )
    }, [])

    const changeTheme = () => {
        let htmlClasses = document.querySelector('html').classList;
        if(localStorage.theme == 'dark') {
            htmlClasses.remove('dark');
            localStorage.removeItem('theme')
        } else {
            htmlClasses.add('dark');
            localStorage.theme = 'dark';
        }
    }

    return (
        <>
        <header id="header">

            {/* Top Navigation */}
            <div className="flex items-center bg-amazon_blue p-1 flex-grow py-2">
                <div className="mt-2 flex items-center flex-grow sm:flex-grow-0" onClick={() => router.push("/")}>
                    <Image  
                        src="https://links.papareact.com/f90"
                        width={150}
                        height={40}
                        objectFit="contain"
                        className="cursor-pointer w-24"
                    />
                </div>
                <div className="hidden sm:flex text-white space-x-1 flex items-center text-xs mx-1 whitespace-nowrap">
                    <p className="font-extrabold md:text-sm">Deliver to <span className="link">India</span></p>
                    <LocationMarkerIcon className="text-white h-6"/>
                </div>
                {/* Search Bar */}
                <div className="hidden sm:flex items-center h-10 rounded-md flex-grow bg-yellow-400 dark:bg-red-600 cursor-pointer hover:bg-yellow-500 whitespace-nowrap">
                    <input className="p-2 h-full w-6 flex-grow flex-shrink rounded-l-md focus:outline-none px-4" type="text" />
                    <SearchIcon className="h-12 p-4" />
                </div>

                {/* Right */}
                <div className="text-white flex items-center text-xs space-x-6 mx-6">
                    <div className="hiiden space-x-0 relative flex link">
                        <p className="font-extrabold md:text-sm hidden md:inline mt-2 ">eng</p>
                        <ChevronDownIcon className="h-6 mr-1 hidden md:inline mt-2"/>
                     </div>
                    <div className="link" onClick={() => user.user?auth.signOut():router.push("/login")}>
                        <p>Hello {user.user?.displayName},</p>
                        <p className="font-extrabold md:text-sm">Account & Lists</p>
                    </div>
                    <div className="link">
                        <p>Returns</p>
                        <p className="font-extrabold md:text-sm">& Orders</p>
                    </div>
                    <div className="relative link flex items-center" onClick={() => router.push("/basket")}>
                        
                        <span className="absolute right-0 md:right-1/2 top-0 bg-yellow-400 w-4 h-4 text-center font-bold rounded-full">
                            {basket.length}
                        </span>

                        <ShoppingCartIcon className="h-10" />
                        <p className="hidden md:inline font-extrabold md:text-sm">Basket</p>
                    </div>
                </div>
            </div>

            {/* Bottom Navigation */}
            <div className="flex items-center space-x-5 p-2 bg-amazon_blue-light text-white text-sm text-center">
                <p className="link flex items-center" onClick={() => sidebar?setSidebar(false):setSidebar(true)}>
                    <MenuIcon className="h-6 mr-1"/>
                    All
                </p>
                <p className="link">Prime Video</p>
                <p className="link">Amazon Business</p>
                <p className="link">Today's Deals</p>
                <p className="link hidden lg:inline-flex">Electronics</p>
                <p className="link hidden lg:inline-flex">Food & Grocery</p>
                <p className="link hidden lg:inline-flex">Prime</p>
                <p className="link hidden lg:inline-flex">Buy Again</p>
                <p className="link hidden lg:inline-flex">Shopper Toolkit</p>
                <p className="link hidden lg:inline-flex">Health & Personal Care</p>

            </div>
        </header>

        
        {
            sidebar?
            <Sidebar />
            :null
        }

        </>
    )
}

export default Header
