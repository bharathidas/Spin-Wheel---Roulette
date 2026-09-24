## Spin Wheel - Roulette

Customizable roulette wheel with spinning animation. 

## Version 1.2.0 for Mendix Studio Pro 10.24.17

Download `mendix.SpinWheel.mpk` from the [Version1.2.0 release](https://github.com/bharathidas/Spin-Wheel---Roulette/releases/tag/Version1.2.0). The `mendix.SpinWheel.mpk` on `main` is always the latest version (**1.2.0**). For Mendix 9, use the [Version1.0 release](https://github.com/bharathidas/Spin-Wheel---Roulette/releases/tag/Version1.0).

What changed:
- Rebuilt with `@mendix/pluggable-widgets-tools` 10.16.0 for Studio Pro 10.24.17. Uses react-custom-roulette 1.4.1.
- Works in the Mendix 10 React client. react-custom-roulette only ships a bundle that calls `require("react")`; `spinWheel/rollup.config.js` rewrites that call at build time.
- Every option can win with the same chance. In 1.0.0 option 0 could not win and option 1 was twice as likely.
- **Must Spin** works every time, also when it is already true when the page opens (1.0.0 crashed in that case). It is set back to false when the wheel stops.
- The Spin button is disabled while the wheel spins.
- Loading, unavailable and read-only attributes are handled.
- Font Size and Text Distance: empty or 0 uses the default (20 and 60).
- Spin Wheel Data is read more safely: invalid JSON or a value that is not an array shows no wheel; plain strings in the array become options.
- The wheel no longer resets when the page re-renders.
- The class and style set in Studio Pro are applied, and Studio Pro shows a placeholder in design mode.

**Upgrading from 1.0.0:** replace the `.mpk` in your app's `widgets` folder, press **F4** in Studio Pro, and choose **Update all widgets** if Studio Pro reports that the widget definition has changed.

**Sample module:** [`SpinWheel.mpk`](https://github.com/bharathidas/Spin-Wheel---Roulette/raw/main/SpinWheel.mpk) (Studio Pro 10.24.17) is now a **module package** (module `SpinWheel`, page `SpinWheel.Home_Web`). It includes the 1.2.0 widget. Import it with **App > Import module package**, give your user roles the module role `SpinWheel.User`, and add the page to your navigation. It uses Atlas_Core. The old Mendix 9 app package is still available on the [Version1.1 release](https://github.com/bharathidas/Spin-Wheel---Roulette/releases/tag/Version1.1).

**Note:** the wheel is drawn after its font has loaded. The default font, Roboto, comes from Google Fonts. In offline apps or apps with a strict Content Security Policy, set Font Family to a web-safe font such as `Arial`.

### Source code

The widget source is in [`spinWheel/`](spinWheel). To build it:

```
cd spinWheel
npm install
npm run release
```

The package is written to `dist/1.2.0/mendix.SpinWheel.mpk`.


### Features
### Spin Configuration
#### •	Must Spin: 
Sets when the roulette must start the spinning animation. Set back to false when the spinning stops.
#### •	Spin Wheel Data: 
Array of options. Can contain styling information for a specific option.
#### •	Spin Duration: 
Coefficient to adjust the default spin duration.
#### •	Prize Number: 
Receives the winning option (a random index between 0 and data.length-1) when the spinning stops.
#### •	Starting Option Index: 
Set which option (through its index in the data array) will be initially selected by the roulette (before spinning).
#### •	Disable Initial Animation: 
When 'true', disables the initial backwards wheel animation.

### Button Configuration
#### •	Spin Button Name: 
Name of the Spin button.
#### •	Spin Button Class Name: 
Class (Styles) which needs to be applied to the Spin button.

### Wheel Appearance

#### •	backgroundColors: 
Array of colors that will fill the background of the roulette options, starting from option 0
#### •	textColors: 
Array of colors that will fill the text of the roulette options, starting from option 0
## •	outerBorderColor: 
Color of the roulette's outer border line.
#### •	outerBorderWidth: 
Width of the roulette's outer border line (0 represents no outer border line).
#### •	innerRadius: 
Distance of the inner radius from the center of the roulette.
#### •	innerBorderColor: 
Color of the roulette's inner border line
#### •	innerBorderWidth:
Width of the roulette's inner border line (0 represents no inner border line).
#### •	radiusLineColor: 
Color of the radial lines that separate each option.
#### •	radiusLineWidth: 
Width of the radial lines that separate each option (0 represents no radial lines)
### Text Appearance
#### •	fontFamily: 
Global font family of the option string. Non-Web safe fonts are fetched from https://fonts.google.com/. All available fonts can be found there.
#### •	fontSize: 
Global font size of the option string.
#### •	fontWeight:
font weight of the text.
#### •	fontStyle: 
Global font style of the option string.
#### •	perpendicularText: 
When 'true', sets the option texts perpendicular to the roulette's radial lines.
#### •	textDistance: 
Distance of the option texts from the center of the roulette.

### Demo URL:
https://spinwheel-sandbox.mxapps.io/index.html?profile=Responsive

### Credentials:
#### demo_administrator
#### m51LR5oihFah

### Dependencies:
•	Version 1.2.0: Mendix Studio Pro 10.24.17 (web, React client supported).
•	Versions 1.0 and 1.1: Mendix modeler 9.12.4.

### Issues, suggestions and feature requests
https://github.com/bharathidas/Spin-Wheel---Roulette/issues

### Screenshots:
![Screenshot_1](https://github.com/user-attachments/assets/661f0df8-6ac1-4672-aaf5-e476d674c979)

![Screenshot_2](https://github.com/user-attachments/assets/e312e0fd-d9e3-4dfb-97a1-0a2f212fbf38)

![Screenshot_3](https://github.com/user-attachments/assets/da5f8ee1-f033-4432-a493-11ed47bb4eec)

![Screenshot_4](https://github.com/user-attachments/assets/aba148fd-c5e0-426d-a757-86ded754950b)

![Screenshot_5](https://github.com/user-attachments/assets/31f7e4de-0228-4193-9924-9bfd253d6441)

![Screenshot_6](https://github.com/user-attachments/assets/d7c11fdc-6d4b-4df6-9f11-82f742ce45bf)

![Screenshot_7](https://github.com/user-attachments/assets/077568bf-d022-4041-a144-d42419733526)
