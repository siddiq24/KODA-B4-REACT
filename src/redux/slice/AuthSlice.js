import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
    user: null,
    isLoading: false,
}

export const register = createAsyncThunk(
    "auth/register",
    async (user) => {
        try {
            console.log("Data register:", user)
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/users`, {
                full_name: user.full_name,
                email: user.email,
                password: user.password,
                role: 'user',
                image: 'https://i.pinimg.com/736x/f0/65/5f/f0655f2737da76be9b4ac435c65e3d9b.jpg'
            })
            console.log("Respon register:", res.data)
            return res.data
        } catch (error) {
            console.error("Register error:", error.message)
            throw error
        }
    }
)

export const login = createAsyncThunk(
    "auth/login",
    async (form) => {
        try {
            const res = await axios.get(`${import.meta.env.VITE_BASE_URL}/users?email=${form.email}&password=${form.password}`)
            const users = res.data

            if (users.length === 0) {
                throw new Error("Email atau password salah")
            }

            return users[0]
        } catch (error) {
            console.error("Login error:", error.message)
            throw error
        }
    }
)

export const logout = createAsyncThunk(
    "auth/logout",
    async () => {
        localStorage.removeItem('persist:root')
        return null
    }
)

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Register
            .addCase(register.pending, (state) => {
                state.isLoading = true
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(register.rejected, (state) => {
                state.isLoading = false
            })

            // Login
            .addCase(login.pending, (state) => {
                state.isLoading = true
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false
                state.user = action.payload
            })
            .addCase(login.rejected, (state) => {
                state.isLoading = false
            })

            // Logout
            .addCase(logout.fulfilled, (state) => {
                state.user = null
            })
    }
})

export default authSlice.reducer
