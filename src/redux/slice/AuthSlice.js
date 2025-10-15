import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    isLoading: false,
}

export const register = createAsyncThunk(
    "auth/register",
    async(form) =>{
        try {
            await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {form})
        } catch (error) {
            console.log(error)
            throw new Error(error)
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (form) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users?email=${form.email}`)
            const user = res.data
            
            return user
        } catch (error) {
            console.log(Error.message)
            throw new Error(error)
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        localStorage.removeItem('persist:root')
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false;
            })

            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})


export default authSlice.reducer;