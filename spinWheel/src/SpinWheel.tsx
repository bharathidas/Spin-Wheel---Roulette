import { Component, ReactNode, createElement } from "react";
import { Big } from "big.js";
import { EditableValue } from "mendix";

import { SpinWheelContainerProps } from "../typings/SpinWheelProps";
import { SpinWheelInput, WheelData } from "./components/SpinWheelInput";
import "./ui/SpinWheel.css";

type Cache<T> = { key: string; value: T } | undefined;

function stringValue(attr: EditableValue<string> | undefined): string | undefined {
    return attr?.status === "available" ? attr.value : undefined;
}

function booleanValue(attr: EditableValue<boolean> | undefined): boolean {
    return attr?.status === "available" ? attr.value === true : false;
}

/** Returns the numeric value, or undefined when the attribute is empty or not (yet) available. */
function numberValue(attr: EditableValue<Big> | undefined): number | undefined {
    if (attr?.status !== "available" || attr.value === undefined || attr.value === null) {
        return undefined;
    }
    const value = Number(attr.value.toString());
    return isFinite(value) ? value : undefined;
}

function canWrite<T extends string | boolean | Big>(attr: EditableValue<T> | undefined): attr is EditableValue<T> {
    return !!attr && attr.status === "available" && !attr.readOnly;
}

// Function to convert a comma-separated string to a string array
function convertStringToArray(input: string): string[] {
    const result = input
        .split(",")
        .map(item => item.trim())
        .filter(item => item.length > 0);
    return result;
}

function convertStringToWheelData(dataString: string): WheelData[] {
    if (!dataString) {
        return [];
    }
    try {
        const parsed: unknown = JSON.parse(dataString);
        if (!Array.isArray(parsed)) {
            console.error("Spin Wheel: the Spin Wheel Data attribute must contain a JSON array.");
            return [];
        }
        return parsed
            .filter(item => item !== null && item !== undefined)
            .map(item => (typeof item === "object" ? (item as WheelData) : ({ option: String(item) } as WheelData)));
    } catch (error) {
        console.error("Failed to parse data string:", error);
        return [];
    }
}

export class SpinWheel extends Component<SpinWheelContainerProps> {
    private dataCache: Cache<WheelData[]>;
    private backgroundColorsCache: Cache<string[]>;
    private textColorsCache: Cache<string[]>;

    render(): ReactNode {
        const mustSpinValue = booleanValue(this.props.mustSpinKey);

        const backgroundColorArray = this.getBackgroundColors(
            stringValue(this.props.backgroundColorsKey) || "darkgrey,lightgrey"
        );
        const textColorArray = this.getTextColors(stringValue(this.props.textColorsKey) || "black");

        const outerBorderColor = stringValue(this.props.outerBorderColorKey) || "black";
        const outerBorderWidth = numberValue(this.props.outerBorderWidthKey) ?? 5;
        const innerRadius = numberValue(this.props.innerRadiusKey) ?? 0;
        const innerBorderColor = stringValue(this.props.innerBorderColorKey) || "black";
        const innerBorderWidth = numberValue(this.props.innerBorderWidthKey) ?? 0;
        const radiusLineColor = stringValue(this.props.radiusLineColorKey) || "black";
        const radiusLineWidth = numberValue(this.props.radiusLineWidthKey) ?? 5;

        const fontFamily = stringValue(this.props.fontFamilyKey) || "Roboto";
        // An Integer attribute that was never filled in is 0 in Mendix; 0 is not a usable font size.
        const fontSize = numberValue(this.props.fontSizeKey) || 20;
        const fontWeight = stringValue(this.props.fontWeightKey) || "bold";
        const fontStyle = stringValue(this.props.fontStyleKey) || "normal";
        const perpendicularText = booleanValue(this.props.perpendicularTextKey);
        // 0 would draw every text on the center point; treat it as "not set".
        const textDistance = numberValue(this.props.TextDistanceKey) || 60;

        let spinDuration = numberValue(this.props.SpinDurationKey) ?? 1;
        if (spinDuration <= 0) {
            spinDuration = 1;
        }

        const startingOptionIndex = numberValue(this.props.startingOptionIndexKey) ?? 0;
        const disableInitialAnimation = booleanValue(this.props.disableInitialAnimationKey);

        const spinButtonName = stringValue(this.props.spinButtonNameKey) || "Spin";
        const spinButtonClassName = stringValue(this.props.spinButtonClassNameKey) || "spinbutton";

        // The wheel re-initialises whenever the data array identity changes, so keep it stable
        // while nothing that is used to build the wheel has changed.
        const wheelData = this.getWheelData(
            stringValue(this.props.spinwheeldataKey) || "",
            [fontFamily, fontSize, fontWeight, fontStyle, startingOptionIndex].join("|")
        );

        return (
            <SpinWheelInput
                className={this.props.class}
                style={this.props.style}
                mustSpin={mustSpinValue}
                data={wheelData}
                backgroundColors={backgroundColorArray}
                textColors={textColorArray}
                outerBorderColor={outerBorderColor}
                outerBorderWidth={outerBorderWidth}
                innerRadius={innerRadius}
                innerBorderColor={innerBorderColor}
                innerBorderWidth={innerBorderWidth}
                radiusLineColor={radiusLineColor}
                radiusLineWidth={radiusLineWidth}
                fontFamily={fontFamily}
                fontSize={fontSize}
                fontWeight={fontWeight}
                fontStyle={fontStyle}
                perpendicularText={perpendicularText}
                textDistance={textDistance}
                spinDuration={spinDuration}
                startingOptionIndex={startingOptionIndex}
                disableInitialAnimation={disableInitialAnimation}
                spinButtonName={spinButtonName}
                spinButtonClassName={spinButtonClassName}
                whenCompleted={this.onComplete}
            />
        );
    }

    private getWheelData(dataString: string, styleKey: string): WheelData[] {
        const key = dataString + "\u0000" + styleKey;
        if (this.dataCache?.key !== key) {
            this.dataCache = { key, value: convertStringToWheelData(dataString) };
        }
        return this.dataCache.value;
    }

    private getBackgroundColors(value: string): string[] {
        if (this.backgroundColorsCache?.key !== value) {
            this.backgroundColorsCache = { key: value, value: convertStringToArray(value) };
        }
        return this.backgroundColorsCache.value;
    }

    private getTextColors(value: string): string[] {
        if (this.textColorsCache?.key !== value) {
            this.textColorsCache = { key: value, value: convertStringToArray(value) };
        }
        return this.textColorsCache.value;
    }

    // Once the spinning is done, the result is written back and the On Complete action is triggered.
    private onComplete = (newPrizeNumber: number): void => {
        const bigNumber = new Big(newPrizeNumber);
        if (canWrite(this.props.prizeNyumberKey)) {
            this.props.prizeNyumberKey.setValue(bigNumber);
        }
        if (canWrite(this.props.mustSpinKey)) {
            this.props.mustSpinKey.setValue(false);
        }
        if (canWrite(this.props.startingOptionIndexKey)) {
            this.props.startingOptionIndexKey.setValue(bigNumber);
        }
        if (this.props.whenDone?.canExecute) {
            this.props.whenDone.execute();
        }
    };
}
