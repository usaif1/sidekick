import React, { forwardRef, useCallback, useRef, useState } from 'react';
import BottomSheet from '@gorhom/bottom-sheet';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { ScaledSheet, scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { Portal } from '@gorhom/portal';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// Components
import BaseBottomSheet, { BottomSheetContent } from '@/components/atoms/bottomsheet/Bottomsheet';
import { Divider, ButtonText } from '@/components';
import { useThemeStore } from '@/globalStore';

interface RideDetailsBottomSheetProps {
  onClose: () => void;
  rideData?: {
    id: string;
    from: string;
    to: string;
    date: string;
    time: string;
    price: string;
    distance: string;
    duration: string;
    driverName: string;
    driverRating: number;
    vehicleType: string;
    vehicleNumber: string;
  };
}

const RideDetailsBottomSheet = forwardRef<BottomSheet, RideDetailsBottomSheetProps>(
  ({ onClose, rideData = defaultRideData }, ref) => {
    const { theme } = useThemeStore();
    const [currentSnapIndex, setCurrentSnapIndex] = useState(0);
    
    // Handle snap index changes
    const handleSheetChanges = useCallback((index: number) => {
      setCurrentSnapIndex(index);
    }, []);
    
    // Close the bottom sheet
    const handleClose = useCallback(() => {
      if (ref && 'current' in ref && ref.current) {
        ref.current.close();
      }
    }, [ref]);
    
    // Toggle between half and full view
    const toggleExpand = useCallback(() => {
      if (ref && 'current' in ref && ref.current) {
        if (currentSnapIndex === 0) {
          ref.current.snapToIndex(1);
        } else {
          ref.current.snapToIndex(0);
        }
      }
    }, [ref, currentSnapIndex]);

    return (
      <Portal>
        <BaseBottomSheet
          ref={ref}
          snapPoints={['40%', '85%']}
          enablePanDownToClose
          onClose={onClose}
        >
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <Text style={[styles.headerTitle, { color: theme.colors.textPrimary }]}>
                Ride Details
              </Text>
              <TouchableOpacity onPress={toggleExpand} style={styles.expandButton}>
                <Icon 
                  name={currentSnapIndex === 0 ? "chevron-up" : "chevron-down"} 
                  size={24} 
                  color={theme.colors.textPrimary} 
                />
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={handleClose} style={styles.closeButton}>
              <Icon name="close" size={20} color={theme.colors.textPrimary} />
            </TouchableOpacity>
          </View>
          
          <BottomSheetContent contentContainerStyle={styles.contentContainer}>
            {/* Ride summary section */}
            <View style={styles.section}>
              <View style={styles.locationContainer}>
                <View style={styles.locationPoint}>
                  <Icon name="circle-outline" size={16} color={theme.colors.highlight} />
                  <Text style={[styles.locationText, { color: theme.colors.textPrimary }]}>
                    {rideData.from}
                  </Text>
                </View>
                
                <View style={[styles.locationLine, { backgroundColor: theme.colors.lightGray }]} />
                
                <View style={styles.locationPoint}>
                  <Icon name="map-marker" size={16} color={theme.colors.highlight} />
                  <Text style={[styles.locationText, { color: theme.colors.textPrimary }]}>
                    {rideData.to}
                  </Text>
                </View>
              </View>
              
              <View style={styles.rideInfoContainer}>
                <View style={styles.rideInfoItem}>
                  <Text style={[styles.rideInfoLabel, { color: theme.colors.textSecondary }]}>
                    Date
                  </Text>
                  <Text style={[styles.rideInfoValue, { color: theme.colors.textPrimary }]}>
                    {rideData.date}
                  </Text>
                </View>
                
                <View style={styles.rideInfoItem}>
                  <Text style={[styles.rideInfoLabel, { color: theme.colors.textSecondary }]}>
                    Time
                  </Text>
                  <Text style={[styles.rideInfoValue, { color: theme.colors.textPrimary }]}>
                    {rideData.time}
                  </Text>
                </View>
                
                <View style={styles.rideInfoItem}>
                  <Text style={[styles.rideInfoLabel, { color: theme.colors.textSecondary }]}>
                    Price
                  </Text>
                  <Text style={[styles.rideInfoValue, { color: theme.colors.textPrimary }]}>
                    ₹{rideData.price}
                  </Text>
                </View>
              </View>
            </View>
            
            <Divider height={16} />
            
            {/* Driver details section - visible only in expanded view */}
            {currentSnapIndex === 1 && (
              <>
                <View style={[styles.section, styles.driverSection]}>
                  <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                    Driver Details
                  </Text>
                  
                  <View style={styles.driverInfo}>
                    
                    <View style={styles.driverDetails}>
                      <Text style={[styles.driverName, { color: theme.colors.textPrimary }]}>
                        {rideData.driverName}
                      </Text>
                      <View style={styles.ratingContainer}>
                        <Icon name="star" size={16} color="#FFD700" />
                        <Text style={styles.ratingText}>
                          {rideData.driverRating.toFixed(1)}
                        </Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.vehicleInfo}>
                    <Text style={[styles.vehicleType, { color: theme.colors.textSecondary }]}>
                      {rideData.vehicleType}
                    </Text>
                    <Text style={[styles.vehicleNumber, { color: theme.colors.textPrimary }]}>
                      {rideData.vehicleNumber}
                    </Text>
                  </View>
                </View>
                
                <Divider height={16} />
                
                <View style={styles.section}>
                  <Text style={[styles.sectionTitle, { color: theme.colors.textPrimary }]}>
                    Ride Stats
                  </Text>
                  
                  <View style={styles.statsContainer}>
                    <View style={styles.statItem}>
                      <Icon name="map-marker-distance" size={24} color={theme.colors.highlight} />
                      <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
                        {rideData.distance}
                      </Text>
                      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                        Distance
                      </Text>
                    </View>
                    
                    <View style={styles.statItem}>
                      <Icon name="clock-outline" size={24} color={theme.colors.highlight} />
                      <Text style={[styles.statValue, { color: theme.colors.textPrimary }]}>
                        {rideData.duration}
                      </Text>
                      <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>
                        Duration
                      </Text>
                    </View>
                  </View>
                </View>
              </>
            )}
            
            <View style={styles.buttonContainer}>
              <ButtonText
                variant="primary"
                onPress={handleClose}>
                {currentSnapIndex === 0 ? "View Details" : "Close"}
              </ButtonText>
            </View>
          </BottomSheetContent>
        </BaseBottomSheet>
      </Portal>
    );
  }
);

// Default ride data for demo purposes
const defaultRideData = {
  id: 'ride-123',
  from: 'Home, 123 Main Street',
  to: 'Office, 456 Work Avenue',
  date: '12 May 2023',
  time: '09:30 AM',
  price: '250',
  distance: '12.5 km',
  duration: '35 mins',
  driverName: 'John Driver',
  driverRating: 4.8,
  vehicleType: 'Sedan - White',
  vehicleNumber: 'KA 01 AB 1234',
};

const styles = ScaledSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: '16@s',
    paddingVertical: '12@vs',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  headerContent: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: '18@ms',
    fontWeight: 'bold',
  },
  expandButton: {
    marginLeft: '12@s',
    padding: '4@s',
  },
  closeButton: {
    padding: '8@s',
  },
  contentContainer: {
    padding: '16@s',
  },
  section: {
    backgroundColor: '#F8F8F8',
    borderRadius: '12@ms',
    padding: '16@s',
    marginBottom: '12@vs',
  },
  locationContainer: {
    marginBottom: '16@vs',
  },
  locationPoint: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: '4@vs',
  },
  locationText: {
    marginLeft: '8@s',
    fontSize: '14@ms',
  },
  locationLine: {
    width: 1,
    height: '20@vs',
    marginLeft: '8@s',
  },
  rideInfoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '12@vs',
  },
  rideInfoItem: {
    alignItems: 'center',
  },
  rideInfoLabel: {
    fontSize: '12@ms',
    marginBottom: '4@vs',
  },
  rideInfoValue: {
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
  driverSection: {
    marginTop: '16@vs',
  },
  sectionTitle: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    marginBottom: '12@vs',
  },
  driverInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '12@vs',
  },
  driverDetails: {
    marginLeft: '12@s',
  },
  driverName: {
    fontSize: '16@ms',
    fontWeight: 'bold',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: '4@vs',
  },
  ratingText: {
    marginLeft: '4@s',
    fontSize: '14@ms',
    color: '#666',
  },
  vehicleInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '8@vs',
  },
  vehicleType: {
    fontSize: '14@ms',
  },
  vehicleNumber: {
    fontSize: '14@ms',
    fontWeight: 'bold',
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: '8@vs',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: '16@ms',
    fontWeight: 'bold',
    marginTop: '4@vs',
  },
  statLabel: {
    fontSize: '12@ms',
    marginTop: '2@vs',
  },
  buttonContainer: {
    marginTop: '20@vs',
    alignSelf: 'center',
    width: '80%',
  },
});

export default RideDetailsBottomSheet; 