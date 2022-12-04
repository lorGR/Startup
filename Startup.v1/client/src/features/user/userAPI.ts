import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getUserByCookie = createAsyncThunk(
    'get-user-by-cookie',
    async() => {
        try {
            const { data } = await axios.get("/api/users/get-user-by-cookie");
            if(!data) throw new Error("Couldn't receive data from axios GET '/get-user-by-cookie' from: userAPI ");
            const { result } = data;
            return result[0];            
        } catch (error) {
            console.error(error);
        }
    }
)