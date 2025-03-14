export const mapStyle = [
  { featureType: 'all', elementType: 'labels', stylers: [{ visibility: 'off' }] }, 
  { featureType: 'road', elementType: 'geometry', stylers: [{ visibility: 'on' }] },
  { featureType: 'transit', stylers: [{ visibility: 'off' }] },
  { featureType: 'landscape', stylers: [{ visibility: 'simplified' }, { lightness: 50 }] },
  { featureType: 'water', stylers: [{ visibility: 'off' }] },
  { featureType: 'poi', elementType: 'geometry', stylers: [{ visibility: 'on' }] },
  { featureType: 'administrative.neighborhood', elementType: 'labels.text', stylers: [{ visibility: 'off' }] },
  { featureType: 'administrative.locality', elementType: 'labels.text', stylers: [{ visibility: 'off' }] }
];
