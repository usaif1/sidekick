// dependencies
import {useEffect, useState, useCallback} from 'react';

// services
import RideService from '@/modules/ride/services/ride.service';

// storage
import {CurrentRideData} from '@/modules/ride/storage';

// store
import {useUserStore} from '@/globalStore';

interface UseActiveRideReturn {
  hasActiveRide: boolean;
  rideData: CurrentRideData | null;
  isLoading: boolean;
  checkActiveRide: () => Promise<void>;
  refreshRideStatus: () => Promise<void>;
  source: 'local' | 'api' | null;
}

export const useActiveRide = (): UseActiveRideReturn => {
  const [hasActiveRide, setHasActiveRide] = useState<boolean>(false);
  const [rideData, setRideData] = useState<CurrentRideData | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [source, setSource] = useState<'local' | 'api' | null>(null);

  const {user} = useUserStore();

  const checkActiveRide = useCallback(async () => {
    console.log('🔄 useActiveRide.checkActiveRide called, user:', user);

    if (!user?.id) {
      console.log('❌ No user ID available, stopping active ride check');
      setIsLoading(false);
      return;
    }

    try {
      console.log('🔍 Starting active ride check for user ID:', user.id);
      setIsLoading(true);
      const result = await RideService.checkActiveRide(user.id);

      setHasActiveRide(result.hasActiveRide);
      setRideData(result.rideData);
      setSource(result.source);

      console.log('✅ Active ride check completed:', {
        hasActiveRide: result.hasActiveRide,
        source: result.source,
        rideId: result.rideData?.rideId,
        userId: user.id,
      });
    } catch (error) {
      console.error('❌ Error in useActiveRide.checkActiveRide:', error);
      setHasActiveRide(false);
      setRideData(null);
      setSource(null);
    } finally {
      setIsLoading(false);
    }
  }, [user]);

  const refreshRideStatus = useCallback(async () => {
    await checkActiveRide();
  }, [checkActiveRide]);

  // Check for active ride on mount and when auth user changes
  useEffect(() => {
    checkActiveRide();
  }, [checkActiveRide]);

  return {
    hasActiveRide,
    rideData,
    isLoading,
    checkActiveRide,
    refreshRideStatus,
    source,
  };
};
