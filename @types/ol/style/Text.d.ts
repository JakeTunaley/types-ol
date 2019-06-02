import Fill from './Fill';
import Stroke from './Stroke';
import TextPlacement from './TextPlacement';

export interface Options {
    font?: string;
    maxAngle?: number;
    offsetX?: number;
    offsetY?: number;
    overflow?: boolean;
    placement?: TextPlacement | string;
    scale?: number;
    rotateWithView?: boolean;
    rotation?: number;
    text?: string;
    textAlign?: string;
    textBaseline?: string;
    fill?: Fill;
    stroke?: Stroke;
    backgroundFill?: Fill;
    backgroundStroke?: Stroke;
    padding?: number[];
}
export default class Text {
    constructor(opt_options?: Options);
    getTextBaseline(): string;
    clone(): Text;
    getBackgroundStroke(): Stroke;
    getFill(): Fill;
    getFont(): string;
    getMaxAngle(): number;
    getOffsetX(): number;
    getOffsetY(): number;
    getOverflow(): boolean;
    getPadding(): number[];
    getPlacement(): TextPlacement | string;
    getRotateWithView(): boolean;
    getRotation(): number;
    getScale(): number;
    getStroke(): Stroke;
    getText(): string;
    getTextAlign(): string;
    getBackgroundFill(): Fill;
    setBackgroundFill(fill: Fill): void;
    setBackgroundStroke(stroke: Stroke): void;
    setFill(fill: Fill): void;
    setFont(font: string): void;
    setMaxAngle(maxAngle: number): void;
    setOffsetX(offsetX: number): void;
    setOffsetY(offsetY: number): void;
    setOverflow(overflow: boolean): void;
    setPadding(padding: number[]): void;
    setPlacement(placement: TextPlacement | string): void;
    setRotation(rotation: number): void;
    setScale(scale: number): void;
    setStroke(stroke: Stroke): void;
    setText(text: string): void;
    setTextAlign(textAlign: string): void;
    setTextBaseline(textBaseline: string): void;
}