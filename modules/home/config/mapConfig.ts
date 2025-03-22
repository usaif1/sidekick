import { Platform } from 'react-native';

const ANDROID_KEY = 'AIzaSyA4_-URnAPZCngJLIbQ9mhMuy-Lq1-iz-Y';
const IOS_KEY = 'AIzaSyA4_-URnAPZCngJLIbQ9mhMuy-Lq1-iz-Y';

export const GOOGLE_MAPS_API_KEY = Platform.OS === 'ios' ? IOS_KEY : ANDROID_KEY;
