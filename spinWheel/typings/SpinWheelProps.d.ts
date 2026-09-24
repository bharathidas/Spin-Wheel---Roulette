/**
 * This file was generated from SpinWheel.xml
 * WARNING: All changes made to this file will be overwritten
 * @author Mendix Widgets Framework Team
 */
import { CSSProperties } from "react";
import { ActionValue, EditableValue } from "mendix";
import { Big } from "big.js";

export interface SpinWheelContainerProps {
    name: string;
    class: string;
    style?: CSSProperties;
    tabIndex?: number;
    mustSpinKey: EditableValue<boolean>;
    spinwheeldataKey: EditableValue<string>;
    SpinDurationKey?: EditableValue<Big>;
    prizeNyumberKey: EditableValue<Big>;
    startingOptionIndexKey?: EditableValue<Big>;
    disableInitialAnimationKey?: EditableValue<boolean>;
    whenDone?: ActionValue;
    spinButtonNameKey?: EditableValue<string>;
    spinButtonClassNameKey?: EditableValue<string>;
    backgroundColorsKey?: EditableValue<string>;
    textColorsKey?: EditableValue<string>;
    outerBorderColorKey?: EditableValue<string>;
    outerBorderWidthKey?: EditableValue<Big>;
    innerRadiusKey?: EditableValue<Big>;
    innerBorderColorKey?: EditableValue<string>;
    innerBorderWidthKey?: EditableValue<Big>;
    radiusLineColorKey?: EditableValue<string>;
    radiusLineWidthKey?: EditableValue<Big>;
    fontFamilyKey?: EditableValue<string>;
    fontSizeKey?: EditableValue<Big>;
    fontWeightKey?: EditableValue<string>;
    fontStyleKey?: EditableValue<string>;
    perpendicularTextKey?: EditableValue<boolean>;
    TextDistanceKey?: EditableValue<Big>;
}

export interface SpinWheelPreviewProps {
    /**
     * @deprecated Deprecated since version 9.18.0. Please use class property instead.
     */
    className: string;
    class: string;
    style: string;
    styleObject?: CSSProperties;
    readOnly: boolean;
    renderMode?: "design" | "xray" | "structure";
    mustSpinKey: string;
    spinwheeldataKey: string;
    SpinDurationKey: string;
    prizeNyumberKey: string;
    startingOptionIndexKey: string;
    disableInitialAnimationKey: string;
    whenDone: {} | null;
    spinButtonNameKey: string;
    spinButtonClassNameKey: string;
    backgroundColorsKey: string;
    textColorsKey: string;
    outerBorderColorKey: string;
    outerBorderWidthKey: string;
    innerRadiusKey: string;
    innerBorderColorKey: string;
    innerBorderWidthKey: string;
    radiusLineColorKey: string;
    radiusLineWidthKey: string;
    fontFamilyKey: string;
    fontSizeKey: string;
    fontWeightKey: string;
    fontStyleKey: string;
    perpendicularTextKey: string;
    TextDistanceKey: string;
}
