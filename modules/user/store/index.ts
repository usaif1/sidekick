import { create } from 'zustand';
import createSelectors from '@/utils/selectors';

// Types
type ProfileData = {
  name: string;
  email: string;
  phone: string;
  company: string;
};

type UsageStats = {
  totalMinutes: number;
  totalKilometers: number;
};

type Settings = {
  notificationsEnabled: boolean;
};

type UserState = {
  profile: ProfileData;
  usageStats: UsageStats;
  settings: Settings;
  isProfileComplete: boolean;
};

type UserActions = {
  updateProfile: (data: Partial<ProfileData>) => void;
  updateUsageStats: (stats: Partial<UsageStats>) => void;
  toggleNotifications: (enabled?: boolean) => void;
  resetUserStore: () => void;
};

// Initial state
const initialState: UserState = {
  profile: {
    name: '',
    email: '',
    phone: '',
    company: '',
  },
  usageStats: {
    totalMinutes: 0,
    totalKilometers: 0,
  },
  settings: {
    notificationsEnabled: true,
  },
  isProfileComplete: false,
};

// Create store
const userStore = create<UserState & UserActions>((set) => ({
  ...initialState,

  // Update profile data
  updateProfile: (data) =>
    set((state) => {
      const updatedProfile = { ...state.profile, ...data };
      
      // Check if profile is complete (all required fields have values)
      const isComplete = Boolean(
        updatedProfile.name && 
        updatedProfile.email && 
        updatedProfile.phone
      );
      
      return {
        profile: updatedProfile,
        isProfileComplete: isComplete,
      };
    }),

  // Update usage statistics
  updateUsageStats: (stats) =>
    set((state) => ({
      usageStats: { ...state.usageStats, ...stats },
    })),

  // Toggle notifications
  toggleNotifications: (enabled) =>
    set((state) => ({
      settings: {
        ...state.settings,
        notificationsEnabled: enabled !== undefined ? enabled : !state.settings.notificationsEnabled,
      },
    })),

  // Reset user store to initial state
  resetUserStore: () => set(initialState),
}));

// Create and export selectors
export default createSelectors(userStore); 