
import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState, AppDispatch } from "./store";
import { setProductName } from "./productNameSlice";

interface ProductNameViewProps {
  disabled: boolean;
  onValueChanged: (value: string) => void;
}

export const ProductNameView: React.FC<ProductNameViewProps> = ({
  disabled,
  onValueChanged,
}) => {
  const productName = useSelector(
    (state: RootState) => state.productName.value
  );

  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;

    // Update the Redux store.
    dispatch(setProductName(newValue));

    // Notify the PCF wrapper.
    onValueChanged(newValue);
  };

  return (
    <div style={{ width: "100%" }}>
      <label
        htmlFor="productNameInput"
        style={{
          display: "block",
          marginBottom: "6px",
          fontSize: "14px",
        }}
      >
        Product Name (Redux)
      </label>

      <input
        id="productNameInput"
        type="text"
        value={productName}
        disabled={disabled}
        onChange={handleChange}
        placeholder="Enter product name"
        style={{
          boxSizing: "border-box",
          width: "100%",
          padding: "8px",
          border: "1px solid #888",
          borderRadius: "4px",
          fontSize: "14px",
        }}
      />

      <div style={{ marginTop: "8px", fontSize: "12px" }}>
        Redux value: {productName || "(empty)"}
      </div>
    </div>
  );
};
