import { Component, ReactNode, createElement } from "react";
import { SpinWheelPreviewProps } from "../typings/SpinWheelProps";

export class preview extends Component<SpinWheelPreviewProps> {
    render(): ReactNode {
        return <div className="spinwheel-preview">Spin Wheel</div>;
    }
}

export function getPreviewCss(): string {
    return require("./ui/SpinWheel.css");
}
