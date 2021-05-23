import React from 'react'
import { useSelector } from 'react-redux'
import Header from '../components/Header'
import { selectItems } from '../slices/basketSlice'
import { selectUser } from '../slices/userSlice'
import Currency from "react-currency-formatter"
import Footer from '../components/Footer'
import { StarIcon } from "@heroicons/react/solid"
import { useState } from "react"

function basket() {

    const user = useSelector(selectUser)
    const basket = useSelector(selectItems)

    const totalPrice = basket.map(({price}) => 
        price
    )
    .reduce((a,b) => a + b, 0)

    const [rating] = useState(
        Math.floor(
            Math.random()*5 + 1
        )
    ) 
    return (
        <div className="bg-gray-100 dark:bg-gray-800 min-h-screen flex flex-col">
            <Header />

            <div className="grid grid-flow-row-dense lg:grid-cols-3 flex-1">
                
                <div className="bg-white shadow-2xl p-8 lg:col-span-2 m-4">
                    <h1 className="text-2xl mb-5">Shopping Basket</h1>
                    <hr />
                    {
                        basket.map(({title, price, image, rating}) => 
                            <div className="p-4 flex shadow-lg my-2 border-solid border-2 ">
                                <img className="h-36 w-24 object-contain" src={image} />
                                <div className="flex-1 px-6">
                                    <p className="line-clamp-1 text-blue-500 font-semibold link">{title}</p>
                                    <Currency quantity={price} currency="INR" />
                                </div>
                                <div className="text-yellow-300 flex items-center mb-2">
                            <p className="font-semibold text-md text-black">Rating: </p>
                            {
                             Array(rating)
                            .fill()
                            .map((_, i) => 
                                <StarIcon className="h-5 text-yellow-500" />
                                )
                            } 
                        </div>
                            </div>
                        )
                    }
                </div>
                <div className="h-36 bg-white shadow-2xl p-8 md:col-span-1 m-4">
                    <p className="mb-4 text-center font-semibold text-lg">Total price: <Currency quantity={totalPrice} currency="INR" /></p>
                    <button className="button w-full" disabled={user.user?false:true}>Proceed to Checkout</button>
                </div>
            </div>

            <Footer />
        </div>
    )
}

export default basket
