
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProductNameState {
  value: string;
}

const initialState: ProductNameState = {
  value: "",
};

const productNameSlice = createSlice({
  name: "productName",
  initialState,
  reducers: {
    setProductName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { setProductName } = productNameSlice.actions;

export default productNameSlice.reducer;
