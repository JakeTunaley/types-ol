declare module 'ol/interaction/DragBox' {

  import PointerInteraction from 'ol/interaction/Pointer';
  import MapBrowserEvent from 'ol/MapBrowserEvent';
  import { Pixel } from 'ol/pixel';
  import Polygon from 'ol/geom/Polygon';
  import { EventsKey } from 'ol/events';
  import Event from 'ol/events/Event';
  import { ObjectEvent } from 'ol/Object';
  import { Coordinate } from 'ol/coordinate';
  import { Condition } from 'ol/events/condition';

  export default class DragBox extends PointerInteraction {
    constructor(opt_options?: Options);
    defaultBoxEndCondition(mapBrowserEvent: MapBrowserEvent, startPixel: Pixel, endPixel: Pixel): boolean;
    getGeometry(): Polygon;
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'boxdrag', listener: (evt: DragBoxEvent) => void): EventsKey;
    once(type: 'boxdrag', listener: (evt: DragBoxEvent) => void): EventsKey;
    un(type: 'boxdrag', listener: (evt: DragBoxEvent) => void): void;
    on(type: 'boxend', listener: (evt: DragBoxEvent) => void): EventsKey;
    once(type: 'boxend', listener: (evt: DragBoxEvent) => void): EventsKey;
    un(type: 'boxend', listener: (evt: DragBoxEvent) => void): void;
    on(type: 'boxstart', listener: (evt: DragBoxEvent) => void): EventsKey;
    once(type: 'boxstart', listener: (evt: DragBoxEvent) => void): EventsKey;
    un(type: 'boxstart', listener: (evt: DragBoxEvent) => void): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'change:active', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'change:active', listener: (evt: ObjectEvent) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
  }

  export class DragBoxEvent extends Event {
    constructor(type: string, coordinate: Coordinate, mapBrowserEvent: MapBrowserEvent);
    coordinate: Coordinate;
    mapBrowserEvent: MapBrowserEvent;
  }

  export enum DragBoxEventType {
    BOXSTART = 'boxstart',
    BOXDRAG = 'boxdrag',
    BOXEND = 'boxend',
  }

  export type EndCondition = ((this: any, param1: MapBrowserEvent, param2: Pixel, param3: Pixel) => boolean);

  export interface Options {
    className?: string;
    condition?: Condition;
    minArea?: number;
    boxEndCondition?: EndCondition;
    onBoxEnd: ((this: DragBox, param1: MapBrowserEvent) => void);
  }

}