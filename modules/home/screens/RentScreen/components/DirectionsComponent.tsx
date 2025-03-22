import React, { useEffect } from 'react';
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

    useEffect(() => {
        if (origin && destination) {
            const from = turf.point([origin.longitude, origin.latitude]);
            const to = turf.point([destination.longitude, destination.latitude]);
            const bearing = turf.bearing(from, to);
            if (onHeadingChange) {
                onHeadingChange(bearing);
            }
        }
    }, [origin, destination, onHeadingChange]);

    if (!origin || !destination) {
        return null;
    }

    return (
        <MapViewDirections
            origin={origin}
            destination={destination}
            apikey={GOOGLE_MAPS_API_KEY}
            strokeWidth={4}
            strokeColor="#296AEB"
            mode="BICYCLING"
            optimizeWaypoints={true}
            onStart={(params) => {
                if (params.origin && params.destination) {
                    console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                }
            }}
            onReady={(result: MapViewDirectionsResult) => {
                const coordinates = result.coordinates;
                if (coordinates && coordinates.length >= 2) {
                    console.log(`Distance: ${result.distance} km`);
                    console.log(`Duration: ${result.duration} min.`);

                    const [first, second] = coordinates;
                    if (first && second) {
                        const start = turf.point([first.longitude, first.latitude]);
                        const next = turf.point([second.longitude, second.latitude]);
                        const bearing = turf.bearing(start, next);
                        onHeadingChange?.(bearing);
                    }

                    mapRef.current?.fitToCoordinates(coordinates, {
                        edgePadding: {
                            right: (width / 20),
                            bottom: (height / 20),
                            left: (width / 20),
                            top: (height / 20),
                        }
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