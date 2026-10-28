
import { configureStore } from "@reduxjs/toolkit";
import productNameReducer from "./productNameSlice";

export const createProductNameStore = () =>
  configureStore({
    reducer: {
      productName: productNameReducer,
    },
  });

export type ProductNameStore =
  ReturnType<typeof createProductNameStore>;

export type RootState =
  ReturnType<ProductNameStore["getState"]>;

export type AppDispatch = ProductNameStore["dispatch"];
