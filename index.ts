
import * as React from "react";
import { Provider } from "react-redux";
import { IInputs, IOutputs } from "./generated/ManifestTypes";
import { ProductNameView } from "./ProductNameView";
import {
  createProductNameStore,
  ProductNameStore,
} from "./store";
import { setProductName } from "./productNameSlice";

export class ProductNameControl
  implements ComponentFramework.ReactControl<IInputs, IOutputs> {

  private notifyOutputChanged!: () => void;
  private store!: ProductNameStore;

  private isDirty = false;
  private disabled = false;

  public init(
    context: ComponentFramework.Context<IInputs>,
    notifyOutputChanged: () => void,
  ): void {
    // Save the callback supplied by Power Apps.
    this.notifyOutputChanged = notifyOutputChanged;

    // Create a separate Redux store for this PCF instance.
    this.store = createProductNameStore();

    // Initialize Redux from the Dataverse field value.
    const initialValue =
      context.parameters.productName.raw ?? "";

    this.store.dispatch(setProductName(initialValue));
    this.disabled = context.mode.isControlDisabled;

    console.log("[PCF init] Product Name:", initialValue);
    console.log("[PCF init] Redux state:", this.store.getState());
  }

  
public updateView(
  context: ComponentFramework.Context<IInputs>,
): React.ReactElement {
  const platformValue =
    context.parameters.productName.raw ?? "";

  const reduxValue =
    this.store.getState().productName.value;

  if (!this.isDirty || platformValue === reduxValue) {
    if (platformValue !== reduxValue) {
      this.store.dispatch(setProductName(platformValue));
    }

    this.isDirty = false;
  }

  this.disabled = context.mode.isControlDisabled;

  console.log("[PCF updateView] Platform value:", platformValue);
  console.log(
    "[PCF updateView] Redux value:",
    this.store.getState().productName.value,
  );

  const productNameView = React.createElement(ProductNameView, {
    disabled: this.disabled,

    onValueChanged: (newValue: string) => {
      if (this.disabled) {
        return;
      }

      console.log("[React] New Product Name:", newValue);

      this.isDirty = true;
      this.notifyOutputChanged();
    },
  });

  // eslint-disable-next-line react/no-children-prop
  return React.createElement(Provider, {
    store: this.store,
    children: productNameView,
  });
}


  public getOutputs(): IOutputs {
    const productName =
      this.store.getState().productName.value;

    console.log("[PCF getOutputs] Product Name:", productName);

    return {
      productName,
    };
  }

  public destroy(): void {
    console.log("[PCF destroy] Final Redux state:", this.store.getState());
    console.log("[PCF destroy] Product Name control destroyed");
  }
}
