import axios from 'axios'
import React from 'react'
import { useEffect } from 'react';

export const UserFavorites = () => {

    async function getUserFavorites() {
        try {
            const {data} = await axios.get("/api/user-favorites/get-user-favorites");
            console.log(data)
        } catch (error) {
            console.error(error)
        }
    }
    useEffect(() => {
        getUserFavorites();
    },[])

  return (
    <div>UserFavorites</div>
  )
}
