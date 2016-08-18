export interface LatLng {
    lat: number;
    lng: number;
}

export interface PolylineOptions {
    clickable?: boolean;
    draggable?: boolean;
    editable?: boolean;
    geodesic?: boolean;
    icons?: IconSequence[];
    map?: any; // Map
    path?: LatLng[]; // MVCArray | LatLng[] | LatLngLiteral[]; MVCArray<LatLng>|Array<LatLng|LatLngLiteral>
    strokeColor?: string;
    strokeOpacity?: number;
    strokeWeight?: number;
    visible?: boolean;
    zIndex?: number;
}

export interface IconSequence {
    fixedRotation?: boolean;
    icon?: any; // Symbol
    offset?: string;
    repeat?: string;
}
