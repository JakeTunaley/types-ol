declare module 'ol/source/Zoomify' {

  import ImageTile from 'ol/ImageTile';
  import TileGrid from 'ol/tilegrid/TileGrid';
  import { TileCoord } from 'ol/tilecoord';
  import TileState from 'ol/TileState';
  import { LoadFunction } from 'ol/Tile';
  import { Options as Options_1 } from 'ol/Tile';
  import { AttributionLike } from 'ol/source/Source';
  import { ProjectionLike } from 'ol/proj';
  import { Size } from 'ol/size';
  import { Extent } from 'ol/extent';
  import TileImage from 'ol/source/TileImage';
  import { EventsKey } from 'ol/events';
  import Event from 'ol/events/Event';
  import { ObjectEvent } from 'ol/Object';
  import { TileSourceEvent } from 'ol/source/Tile';

  export class CustomTile extends ImageTile {
    constructor(tileGrid: TileGrid, tileCoord: TileCoord, state: TileState, src: string, crossOrigin: string, tileLoadFunction: LoadFunction, opt_options?: Options_1);
  }

  export interface Options {
    attributions?: AttributionLike;
    cacheSize?: number;
    crossOrigin?: string;
    projection?: ProjectionLike;
    reprojectionErrorThreshold?: number;
    url?: string;
    tierSizeCalculation?: string;
    size?: Size;
    extent?: Extent;
    transition?: number;
    tileSize?: number;
  }

  export default class Zoomify extends TileImage {
    constructor(opt_options?: Options);
    on(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    once(type: string | string[], listener: ((param0: any) => void)): EventsKey | EventsKey[];
    un(type: string | string[], listener: ((param0: any) => void)): void;
    on(type: 'change', listener: (evt: Event) => void): EventsKey;
    once(type: 'change', listener: (evt: Event) => void): EventsKey;
    un(type: 'change', listener: (evt: Event) => void): void;
    on(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    once(type: 'propertychange', listener: (evt: ObjectEvent) => void): EventsKey;
    un(type: 'propertychange', listener: (evt: ObjectEvent) => void): void;
    on(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadend', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloaderror', listener: (evt: TileSourceEvent) => void): void;
    on(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    once(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): EventsKey;
    un(type: 'tileloadstart', listener: (evt: TileSourceEvent) => void): void;
  }

}