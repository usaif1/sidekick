// User profile data types
export type ProfileData = {
    name: string;
    email: string;
    phone: string;
    company: string;
  };
  
  export type UsageStats = {
    totalMinutes: number;
    totalKilometers: number;
  };
  
  export type Settings = {
    notificationsEnabled: boolean;
  };
  
  export type UserData = {
    profile: ProfileData;
    usageStats: UsageStats;
    settings: Settings;
    isProfileComplete: boolean;
  };
  
  // Mock user data
  export const mockUserData: UserData = {
    profile: {
      name: 'Christian Miller',
      email: 'christian.miller@infosys.com',
      phone: '9876543210',
      company: 'Infosys',
    },
    usageStats: {
      totalMinutes: 48,
      totalKilometers: 2.9,
    },
    settings: {
      notificationsEnabled: true,
    },
    isProfileComplete: true,
  }; 