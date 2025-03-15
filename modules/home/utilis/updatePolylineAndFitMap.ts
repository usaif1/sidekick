import MapView from "react-native-maps";
import { HubLocation, PolylineCoordinates } from "../types/mapTypes";
import * as turf from "@turf/turf";

export const updatePolylineAndFitMap = (
    selectedHub: HubLocation | null,
    latitude: number | null,
    longitude: number | null,
    mapRef: React.RefObject<MapView | null>
): { polylineCoords: PolylineCoordinates; heading: number } => { 
    if (selectedHub && latitude && longitude) {
        const from = turf.point([longitude, latitude]);
        const to = turf.point([selectedHub.longitude, selectedHub.latitude]);
        const line = turf.lineString([from.geometry.coordinates, to.geometry.coordinates]);

        const coords = line.geometry.coordinates.map(([lng, lat]) => ({
            latitude: lat,
            longitude: lng,
        }));
        const bearing = turf.bearing(from, to);

        if (mapRef.current) { 
            mapRef.current.fitToCoordinates(
                [
                    { latitude, longitude }, 
                    { latitude: selectedHub.latitude, longitude: selectedHub.longitude },
                ],
                {
                    edgePadding: { top: 80, right: 80, bottom: 80, left: 80 },
                    animated: true,
                }
            );
        }

        return { polylineCoords: coords, heading: bearing }; 
    } else {
        return { polylineCoords: [], heading: 0 }; 
    }
};
