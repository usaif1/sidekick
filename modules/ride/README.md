# Active Ride Management System

This system provides robust functionality to check if a user has an active ride, with local storage for quick access and API fallback for reliability.

## Features

- ✅ Local storage for immediate ride status checking
- ✅ API fallback when local data is unavailable
- ✅ Automatic data synchronization
- ✅ Global state management integration
- ✅ React hook for easy component integration

## Quick Start

### 1. Initialize on App Startup

In your main App component or authentication flow:

```typescript
import {RideManager} from '@/modules/ride/utils/rideManager';
import {useAuthStore} from '@/globalStore';

// In App.tsx or main navigation component
const App = () => {
  const {authUser} = useAuthStore();

  useEffect(() => {
    const initializeRide = async () => {
      if (authUser?.uid) {
        const result = await RideManager.initializeRideCheck(authUser.uid);
        
        if (result.hasActiveRide) {
          // Navigate to active ride screen or show ride UI
          console.log('User has active ride:', result.rideData?.rideId);
        }
      }
    };
    
    initializeRide();
  }, [authUser]);

  // rest of your app
};
```

### 2. Use the Hook in Components

```typescript
import {useActiveRide} from '@/hooks/useActiveRide';

const HomeScreen = () => {
  const {hasActiveRide, rideData, isLoading, refreshRideStatus} = useActiveRide();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (hasActiveRide && rideData) {
    return (
      <ActiveRideView 
        rideId={rideData.rideId}
        status={rideData.status}
        startTime={rideData.startTime}
        onRefresh={refreshRideStatus}
      />
    );
  }

  return <StartRideView />;
};
```

### 3. Starting a New Ride

```typescript
import {RideManager} from '@/modules/ride/utils/rideManager';
import RideService from '@/modules/ride/services/ride.service';

const startNewRide = async (scooterData) => {
  try {
    // 1. Create ride via API
    const newRide = await RideService.startRide({
      user_id: userId,
      scooter_id: scooterData.id,
      start_hub_id: currentHub.id,
      start_time: new Date().toISOString(),
    });

    // 2. Store locally for quick access
    RideManager.startRide({
      rideId: newRide.id,
      userId: userId,
      scooterId: scooterData.id,
      startTime: newRide.created_at,
      startHubId: currentHub.id,
    });

    // 3. Navigate to active ride screen
    navigation.navigate('ActiveRide');
  } catch (error) {
    console.error('Failed to start ride:', error);
  }
};
```

### 4. Updating Ride Status

```typescript
import {RideManager} from '@/modules/ride/utils/rideManager';

// When user pauses ride
const pauseRide = () => {
  RideManager.updateRideStatus('PAUSED');
};

// When user resumes ride
const resumeRide = () => {
  RideManager.updateRideStatus('IN_PROGRESS');
};
```

### 5. Ending a Ride

```typescript
import {RideManager} from '@/modules/ride/utils/rideManager';
import RideService from '@/modules/ride/services/ride.service';

const endRide = async (rideId: string, totalCost: number) => {
  try {
    // 1. End ride via API
    await RideService.endRide({
      id: rideId,
      end_time: new Date().toISOString(),
      total_cost: totalCost,
    });

    // 2. Clear local data
    RideManager.endRide();

    // 3. Navigate away from ride screen
    navigation.navigate('Home');
  } catch (error) {
    console.error('Failed to end ride:', error);
  }
};
```

## API Setup

### Required GraphQL Query

First, run the GraphQL codegen to generate types for the new query:

```bash
npm run codegen
```

Then update the ride service to use the proper types:

```typescript
// In ride.service.ts, uncomment these lines after codegen:
import {
  FetchActiveRideDocument,
  FetchActiveRideQuery,
  FetchActiveRideQueryVariables,
} from '@/generated/graphql';

// Replace the temporary implementation in fetchActiveRideByUserId
const response: FetchActiveRideQuery = await callQuery({
  queryDocument: FetchActiveRideDocument,
  variables: { userId },
});
return response.ride_details[0] || null;
```

### Data Flow

1. **App Startup**: Check local storage → API fallback → Update global state
2. **Start Ride**: API call → Store locally → Update global state
3. **During Ride**: Local updates for status changes
4. **End Ride**: API call → Clear local data → Update global state

### Storage Structure

```typescript
type CurrentRideData = {
  rideId: string;
  userId: string;
  scooterId: string;
  startTime: string;
  startHubId: string;
  status: 'STARTED' | 'IN_PROGRESS' | 'PAUSED';
  lastUpdated: string;
};
```

### Error Handling

The system gracefully handles:
- Network connectivity issues
- Local storage corruption
- API failures
- Missing user data

All methods include try-catch blocks and fallback behavior.

## Testing

To test the functionality:

1. Start a ride and kill the app
2. Reopen the app - should detect the active ride
3. Clear app data and reopen - should fetch from API
4. Test with network offline - should use local data

## Troubleshooting

### Common Issues

1. **Types not found**: Run `npm run codegen` to generate GraphQL types
2. **Local data not persisting**: Check MMKV storage permissions
3. **API not detecting active rides**: Verify GraphQL query filters
4. **State not updating**: Ensure RideManager methods are used consistently

### Debug Logs

Enable debug logging to trace ride state changes:

```typescript
// All RideManager methods include console.log statements
// Check console for ride state transitions
```