import Map from 'ol/Map';
import View from 'ol/View';
import { platformModifierKeyOnly } from 'ol/events/condition';
import GeoJSON from 'ol/format/GeoJSON';
import { DragBox, Select } from 'ol/interaction';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer';
import { OSM, Vector as VectorSource } from 'ol/source';

const vectorSource = new VectorSource({
    url: 'data/geojson/countries.geojson',
    format: new GeoJSON(),
});

const map = new Map({
    layers: [
        new TileLayer({
            source: new OSM(),
        }),
        new VectorLayer({
            source: vectorSource,
        }),
    ],
    target: 'map',
    view: new View({
        center: [0, 0],
        zoom: 2,
    }),
});

// a normal select interaction to handle click
const select = new Select();
map.addInteraction(select);

const selectedFeatures = select.getFeatures();

// a DragBox interaction used to select features by drawing boxes
const dragBox = new DragBox({
    condition: platformModifierKeyOnly,
    onBoxEnd: null as any,
});

map.addInteraction(dragBox);

dragBox.on('boxend', () => {
    // features that intersect the box are added to the collection of
    // selected features
    const extent = dragBox.getGeometry().getExtent();
    vectorSource.forEachFeatureIntersectingExtent(extent, feature => {
        selectedFeatures.push(feature);
    });
});

// clear selection when drawing a new box and when clicking on the map
dragBox.on('boxstart', () => {
    selectedFeatures.clear();
});

const infoBox = document.getElementById('info') as HTMLElement;

selectedFeatures.on(['add', 'remove'], () => {
    const names = selectedFeatures.getArray().map(feature => {
        return feature.get('name');
    });
    infoBox.innerHTML = names.length > 0 ? names.join(', ') : 'No countries selected';
});
