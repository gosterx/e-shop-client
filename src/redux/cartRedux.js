import {createSlice} from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        products: [],
        quantity: 0,
        total: 0
    },
    reducers: {
        addProduct: (state, action) => {
            state.quantity += 1;
            state.products.push(action.payload);
            state.total += action.payload.price * action.payload.quantity;
        },
        clean: (state) => {
            state.products = [];
            state.quantity = 0;
            state.total = 0;
        },
        incProductQuantity: (state, action) => {
            state.products = state.products.forEach(item => {
                if (item.id === action.payload.id) item.quantity += 1
            });
            state.total += state.products.find(item => item.id === action.payload.id).price
        }
    }
});

export const {incProductQuantity, clean, addProduct} = cartSlice.actions
export default cartSlice.reducer;