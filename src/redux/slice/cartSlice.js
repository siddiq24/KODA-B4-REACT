import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const getCartItems = createAsyncThunk(
    'cart/getCartItems',
    async (_, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const response = await axios.get(
                `${import.meta.env.VITE_BASE_URL}/cart/list`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const removeCartItem = createAsyncThunk(
    'cart/removeCartItem',
    async (cartItemId, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const response = await axios.delete(
                `${import.meta.env.VITE_BASE_URL}/cart/${cartItemId}`,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );
            return { cartItemId, message: response.data.message };
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

export const updateCartItem = createAsyncThunk(
    'cart/updateCartItem',
    async ({ cartItemId, quantity }, { getState, rejectWithValue }) => {
        try {
            const { token } = getState().auth;
            const response = await axios.patch(
                `${import.meta.env.VITE_BASE_URL}/cart/${cartItemId}`,
                { quantity },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data.result;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);

const initialState = {
    cartItems: [],
    loading: false,
    error: null,
    success: false
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        resetCartState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            // Get Cart Items
            .addCase(getCartItems.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCartItems.fulfilled, (state, action) => {
                state.loading = false;
                state.cartItems = action.payload.result || [];
            })
            .addCase(getCartItems.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Gagal mengambil data keranjang';
            })

            // Remove Cart Item
            .addCase(removeCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(removeCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.cartItems = state.cartItems.filter(item => item.id !== action.payload.cartItemId);
            })
            .addCase(removeCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Gagal menghapus item dari keranjang';
            })

            // Update Cart Item
            .addCase(updateCartItem.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateCartItem.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                const updatedItem = action.payload;
                const index = state.cartItems.findIndex(item => item.id === updatedItem.id);
                if (index !== -1) {
                    state.cartItems[index] = updatedItem;
                }
            })
            .addCase(updateCartItem.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Gagal mengupdate item keranjang';
            });
    }
});

export const { clearError, clearSuccess, resetCartState } = cartSlice.actions;

export default cartSlice.reducer;