import { CSSProperties, PureComponent, ReactNode, createElement } from "react";
import { Wheel } from "react-custom-roulette";

export interface StyleType {
    backgroundColor?: string;
    textColor?: string;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number | string;
    fontStyle?: string;
}

export interface ImageProps {
    uri: string;
    offsetX?: number;
    offsetY?: number;
    sizeMultiplier?: number;
    landscape?: boolean;
}

export interface WheelData {
    image?: ImageProps;
    option?: string;
    style?: StyleType;
    optionSize?: number;
}

export interface SpinWheelInputProps {
    className?: string;
    style?: CSSProperties;
    data: WheelData[];
    mustSpin: boolean;
    backgroundColors?: string[];
    textColors?: string[];
    outerBorderColor?: string;
    outerBorderWidth?: number;
    innerRadius?: number;
    innerBorderColor?: string;
    innerBorderWidth?: number;
    radiusLineColor?: string;
    radiusLineWidth?: number;
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: string;
    fontStyle?: string;
    perpendicularText?: boolean;
    textDistance?: number;
    spinDuration?: number;
    startingOptionIndex?: number;
    disableInitialAnimation?: boolean;
    spinButtonName?: string;
    spinButtonClassName?: string;
    whenCompleted: (prizeNumber: number) => void;
}

interface SpinWheelInputState {
    spinning: boolean;
    prizeNumber: number;
}

export class SpinWheelInput extends PureComponent<SpinWheelInputProps, SpinWheelInputState> {
    readonly state: SpinWheelInputState = { spinning: false, prizeNumber: 0 };

    private externalSpinTimer?: number;

    componentDidMount(): void {
        // The "Must Spin" attribute was already true when the widget was shown.
        if (this.props.mustSpin) {
            this.scheduleExternalSpin();
        }
    }

    componentDidUpdate(prevProps: SpinWheelInputProps): void {
        // Start spinning when "Must Spin" changes to true, or when the data arrives while it is true.
        const becameTrue = this.props.mustSpin && !prevProps.mustSpin;
        const dataArrived = this.props.mustSpin && prevProps.data.length === 0 && this.props.data.length > 0;
        if (becameTrue || dataArrived) {
            this.scheduleExternalSpin();
        }
    }

    componentWillUnmount(): void {
        window.clearTimeout(this.externalSpinTimer);
    }

    render(): ReactNode {
        const { data, className, style } = this.props;

        return (
            <div className={className} style={style}>
                {data.length > 0 ? (
                    <div>
                        <Wheel
                            mustStartSpinning={this.state.spinning}
                            prizeNumber={this.state.prizeNumber}
                            data={data}
                            backgroundColors={this.props.backgroundColors}
                            textColors={this.props.textColors}
                            outerBorderColor={this.props.outerBorderColor}
                            outerBorderWidth={this.props.outerBorderWidth}
                            innerRadius={this.props.innerRadius}
                            innerBorderColor={this.props.innerBorderColor}
                            innerBorderWidth={this.props.innerBorderWidth}
                            radiusLineColor={this.props.radiusLineColor}
                            radiusLineWidth={this.props.radiusLineWidth}
                            fontFamily={this.props.fontFamily}
                            fontSize={this.props.fontSize}
                            fontWeight={this.props.fontWeight}
                            fontStyle={this.props.fontStyle}
                            perpendicularText={this.props.perpendicularText}
                            textDistance={this.props.textDistance}
                            spinDuration={this.props.spinDuration}
                            startingOptionIndex={this.props.startingOptionIndex}
                            disableInitialAnimation={this.props.disableInitialAnimation}
                            onStopSpinning={this.handleStopSpinning}
                        />
                        <div>
                            <button
                                type="button"
                                className={this.props.spinButtonClassName}
                                onClick={this.handleSpinClick}
                                disabled={this.state.spinning}
                            >
                                {this.props.spinButtonName}
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        );
    }

    private startSpin(): void {
        const length = this.props.data.length;
        if (this.state.spinning || length === 0) {
            return;
        }
        // Pick a random winning option within the bounds of the data array.
        const newPrizeNumber = Math.floor(Math.random() * length);
        this.setState({ prizeNumber: newPrizeNumber, spinning: true });
    }

    /**
     * The wheel builds its option map in an effect after it (re)renders with new data. Starting a spin in the
     * same update would make it look up the prize in a stale map and crash, so wait until it has settled.
     */
    private scheduleExternalSpin(): void {
        window.clearTimeout(this.externalSpinTimer);
        this.externalSpinTimer = window.setTimeout(() => {
            if (this.props.mustSpin) {
                this.startSpin();
            }
        }, 50);
    }

    private handleSpinClick = (): void => {
        this.startSpin();
    };

    private handleStopSpinning = (): void => {
        const prizeNumber = this.state.prizeNumber;
        this.setState({ spinning: false });
        this.props.whenCompleted(prizeNumber);
    };
}
