import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';

export const FoodList = () => {

    async function getFood() {
        try {
            const {data} = await axios.get("/food")
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        getFood()
    },[])
  return (
    <div>FoodList</div>
  )
}
