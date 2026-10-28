# Product Name Redux PCF Control

A virtual Power Apps Component Framework (PCF) control that edits a Dataverse
single-line text value using React and a per-control-instance Redux store. The
input is disabled when the host disables the control.

## How it works

- On initialization, the control loads the `productName` bound value into Redux.
- The text input dispatches changes to the Redux store and notifies Power Apps
  that the output has changed.
- `getOutputs()` returns the current Redux value as `productName`.
- When the host supplies an updated value, the control synchronizes it into
  Redux unless the user has an unapplied local edit.

The control is defined in `ControlManifest.Input.xml`. It exposes an optional
bound `productName` property of type `SingleLine.Text`. The manifest also
declares a required `sampleProperty` text property.

## Requirements

- Node.js and npm
- .NET Framework build tooling and the Power Apps PCF MSBuild targets if you
  are packaging the control through MSBuild

## Install and build

The npm project and PCF project file are in the parent directory. Run these
commands from that directory:

```powershell
npm install
npm run build
```

To run the PCF test harness:

```powershell
npm start
```

Other available scripts:

```powershell
npm run lint
npm run clean
npm run rebuild
npm run refreshTypes
```

## Project structure

- `index.ts` — PCF lifecycle, host-value synchronization, and output handling
- `ProductNameView.tsx` — React text input and Redux-connected display
- `productNameSlice.ts` — Redux state and `setProductName` action
- `store.ts` — Redux store factory and state/dispatch types
- `ControlManifest.Input.xml` — PCF control metadata and bound properties

The control uses React 16.14, React Redux, and Redux Toolkit. It does not call
external services.
