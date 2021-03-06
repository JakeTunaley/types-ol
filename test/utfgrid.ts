import Map from 'ol/Map';
import Overlay from 'ol/Overlay';
import View from 'ol/View';
import { Coordinate } from 'ol/coordinate';
import TileLayer from 'ol/layer/Tile';
import TileJSON from 'ol/source/TileJSON';
import UTFGrid from 'ol/source/UTFGrid';

const key = 'pk.eyJ1IjoiYWhvY2V2YXIiLCJhIjoiRk1kMWZaSSJ9.E5BkluenyWQMsBLsuByrmg';

const mapLayer = new TileLayer({
    source: new TileJSON({
        url: 'https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=' + key,
    }),
});

const gridSource = new UTFGrid({
    url: 'https://api.tiles.mapbox.com/v4/mapbox.geography-class.json?secure&access_token=' + key,
});

const gridLayer = new TileLayer({ source: gridSource });

const view = new View({
    center: [0, 0],
    zoom: 1,
});

const mapElement = document.getElementById('map') as HTMLElement;
const map = new Map({
    layers: [mapLayer, gridLayer],
    target: mapElement,
    view,
});

const infoElement = document.getElementById('country-info') as HTMLElement;
const flagElement = document.getElementById('country-flag') as HTMLImageElement;
const nameElement = document.getElementById('country-name');

const infoOverlay = new Overlay({
    element: infoElement,
    offset: [15, 15],
    stopEvent: false,
});
map.addOverlay(infoOverlay);

const displayCountryInfo = (coordinate: Coordinate) => {
    const viewResolution = view.getResolution();
    gridSource.forDataAtCoordinateAndResolution(coordinate, viewResolution, data => {
        // If you want to use the template from the TileJSON,
        //  load the mustache.js library separately and call
        //  info.innerHTML = Mustache.render(gridSource.getTemplate(), data);
        if (mapElement) mapElement.style.cursor = data ? 'pointer' : '';
        if (data) {
            flagElement.src = 'data:image/png;base64,' + data['flag_png'];
            if (nameElement) nameElement.innerHTML = data['admin'];
        }
        infoOverlay.setPosition(data ? coordinate : []);
    });
};

map.on('pointermove', evt => {
    if (evt.dragging) {
        return;
    }
    const coordinate = map.getEventCoordinate(evt.originalEvent);
    displayCountryInfo(coordinate);
});

map.on('click', evt => {
    displayCountryInfo(evt.coordinate);
});
