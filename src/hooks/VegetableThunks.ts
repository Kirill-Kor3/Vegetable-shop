import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchVegetable = createAsyncThunk(
  'vegetable/fetchVegetable',

  async function(_, { rejectWithValue }) {
    try {
      const response = await fetch('https://res.cloudinary.com/sivadass/raw/upload/v1535817394/json/products.json')

      if(!response.ok) {
        throw new Error('Server Error!')
      }

      const data = await response.json()

      return data

    } catch (error) {
      return rejectWithValue(error.message)
    }
  }
)