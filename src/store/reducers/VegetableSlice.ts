import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import { fetchVegetable } from '../../hooks/VegetableThunks';
import type { Vegetable } from '../../pages/VegetableList';

interface VegetableState {
  vegetables: Array<Vegetable>;
  vegetablesCart: Array<Vegetable>;
  counter: number;
  loading: boolean;
  error: string | null;
}

const initialState: VegetableState = {
  vegetables: [],
  vegetablesCart: [],
  counter: 0,
  loading: false,
  error: null,
};

const vegetableSlice = createSlice({
  name: 'vegetable',
  initialState,
  reducers: {
    addCart: (
      state,
      action: PayloadAction<{ data: Vegetable; value: number }>
    ) => {
      const { data, value } = action.payload;
      const existingIndex = state.vegetablesCart.findIndex(
        (el) => el.id === data.id
      );

      const cartItem: Vegetable = {
        ...data,
        quantity: value,
        currentPrice: data.price * value,
      };

      if (existingIndex !== -1) {
        state.vegetablesCart[existingIndex] = cartItem;
      } else {
        state.vegetablesCart.push(cartItem);
      }
    },
    incrementQuantity: (state, action) => {
      state.vegetablesCart.find(
        (el) => el.id === action.payload.id
      ).quantity += 1;
    },
    decrementQuantity: (state, action) => {
      state.vegetablesCart.find(
        (el) => el.id === action.payload.id
      ).quantity -= 1;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchVegetable.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchVegetable.fulfilled, (state, action) => {
        state.loading = false;
        state.vegetables = action.payload;
      })
      .addCase(fetchVegetable.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { addCart, incrementQuantity, decrementQuantity } = vegetableSlice.actions;
export default vegetableSlice.reducer;
