import { FeatureLike } from 'ol/Feature';
import Map from 'ol/Map';
import View from 'ol/View';
import TopoJSON from 'ol/format/TopoJSON';
import VectorTileLayer from 'ol/layer/VectorTile';
import { fromLonLat } from 'ol/proj';
import VectorTileSource from 'ol/source/VectorTile';
import { Fill, Stroke, Style } from 'ol/style';

const key = 'vector-tiles-5eJz6JX';

const roadStyleCache: { [key: string]: Style } = {};
const roadColor: { [key: string]: string } = {
    major_road: '#776',
    minor_road: '#ccb',
    highway: '#f39',
};
const buildingStyle = new Style({
    fill: new Fill({
        color: '#666',
    }),
    stroke: new Stroke({
        color: '#444',
        width: 1,
    }),
});
const waterStyle = new Style({
    fill: new Fill({
        color: '#9db9e8',
    }),
});
const roadStyle = (feature: FeatureLike) => {
    const kind = feature.get('kind');
    const railway = feature.get('railway');
    const sort_key = feature.get('sort_key');
    const styleKey = kind + '/' + railway + '/' + sort_key;
    let style = roadStyleCache[styleKey];
    if (!style) {
        let color: string;
        let width: number;
        if (railway) {
            color = '#7de';
            width = 1;
        } else {
            color = roadColor[kind];
            width = kind === 'highway' ? 1.5 : 1;
        }
        style = new Style({
            stroke: new Stroke({
                color,
                width,
            }),
            zIndex: sort_key,
        });
        roadStyleCache[styleKey] = style;
    }
    return style;
};

const map = new Map({
    layers: [
        new VectorTileLayer({
            source: new VectorTileSource({
                attributions:
                    '&copy; OpenStreetMap contributors, Who’s On First, ' + 'Natural Earth, and openstreetmapdata.com',
                format: new TopoJSON({
                    layerName: 'layer',
                    layers: ['water', 'roads', 'buildings'],
                }),
                maxZoom: 19,
                url: 'https://tile.mapzen.com/mapzen/vector/v1/all/{z}/{x}/{y}.topojson?api_key=' + key,
            }),
            style: (feature, resolution) => {
                switch (feature.get('layer')) {
                    case 'water':
                        return waterStyle;
                    case 'roads':
                        return roadStyle(feature);
                    case 'buildings':
                        return resolution < 10 ? buildingStyle : (null as any);
                    default:
                        return null as any;
                }
            },
        }),
    ],
    target: 'map',
    view: new View({
        center: fromLonLat([-74.0064, 40.7142]),
        maxZoom: 19,
        zoom: 15,
    }),
});
