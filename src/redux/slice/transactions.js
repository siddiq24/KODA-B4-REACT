import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const createTransaction = createAsyncThunk(
    'transactions/createTransaction',
    async (transactionData, { getState, rejectWithValue }) => {
        try {
            console.log("transactionData:", transactionData)
            const { token } = getState().auth;
            const response = await axios.post(
                `${import.meta.env.VITE_BASE_URL}/transactions`,
                transactionData,
                {
                    headers: {
                        'Authorization': `Bearer ${token}`,
                        'Content-Type': 'application/json'
                    }
                }
            );
            return response.data;
        } catch (error) {
            return rejectWithValue(error.response?.data || error.message);
        }
    }
);


const initialState = {
    transactions: [],
    currentTransaction: null,
    loading: false,
    error: null,
    success: false
};

const transactionSlice = createSlice({
    name: 'transactions',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        clearSuccess: (state) => {
            state.success = false;
        },
        clearCurrentTransaction: (state) => {
            state.currentTransaction = null;
        },
        resetTransactionState: () => initialState
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTransaction.pending, (state) => {
                state.loading = true;
                state.error = null;
                state.success = false;
            })
            .addCase(createTransaction.fulfilled, (state, action) => {
                state.loading = false;
                state.success = true;
                state.transactions.unshift(action.payload.result);
                state.currentTransaction = action.payload.result;
            })
            .addCase(createTransaction.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload?.message || 'Gagal membuat transaksi';
            })
    }
});

export const {
    clearError,
    clearSuccess,
    clearCurrentTransaction,
    resetTransactionState
} = transactionSlice.actions;

export default transactionSlice.reducer;