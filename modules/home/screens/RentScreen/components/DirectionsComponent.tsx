import React, {  useRef } from 'react';
import { Dimensions } from 'react-native';
import MapView from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as turf from '@turf/turf';
import { LatLng, MapViewDirectionsResult } from '../../../types/directions';
import { GOOGLE_MAPS_API_KEY } from '../../../config/mapConfig';

type DirectionsProps = {
    origin: LatLng | null;
    destination: {
        id: string;
        latitude: number;
        longitude: number;
    } | null;
    mapRef: React.RefObject<MapView>;
    onHeadingChange?: (heading: number) => void;
};

const DirectionsComponent: React.FC<DirectionsProps> = ({
    origin,
    destination,
    mapRef,
    onHeadingChange
}) => {
    const { width, height } = Dimensions.get('window');
    const lastCoordinates = useRef<LatLng[]>([]);

    if (!origin || !destination) {
        return null;
    }

    const calculateHeading = (currentPos: LatLng, nextPos: LatLng) => {
        const start = turf.point([currentPos.longitude, currentPos.latitude]);
        const end = turf.point([nextPos.longitude, nextPos.latitude]);
        return turf.bearing(start, end);
    };

    return (
        <MapViewDirections
            origin={{
                latitude: Number(origin.latitude),
                longitude: Number(origin.longitude)
            }}
            destination={{
                latitude: Number(destination.latitude),
                longitude: Number(destination.longitude)
            }}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#296AEB"
            mode="DRIVING"
            optimizeWaypoints={true}
            precision="high"
            resetOnChange={false}
            onReady={(result: MapViewDirectionsResult) => {
                const coordinates = result.coordinates;
                if (coordinates && coordinates.length >= 2) {
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} min.`);
                    lastCoordinates.current = coordinates;        
                    const currentPosition = origin;
                    const nextRoutePoint = coordinates[1]; 
                    const heading = calculateHeading(currentPosition, nextRoutePoint);
                    onHeadingChange?.(heading);

                    mapRef.current?.fitToCoordinates(coordinates, {
                        edgePadding: {
                            right: (width / 20),
                            bottom: (height / 20),
                            left: (width / 20),
                            top: (height / 20),
                        },
                        animated: true
                    });
                }
            }}
            onError={(errorMessage) => {
                console.error('Direction routing error:', errorMessage);
            }}
        />
    );
};

export default DirectionsComponent;