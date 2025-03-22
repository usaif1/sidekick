import { Platform } from 'react-native';

const ANDROID_KEY = process.env.GOOGLE_MAPS_ANDROID_KEY || 'AIzaSyA4_-URnAPZCngJLIbQ9mhMuy-Lq1-iz-Y';
const IOS_KEY = process.env.GOOGLE_MAPS_IOS_KEY || 'AIzaSyCfIkG3UgZi8Yqs6bJX1inU7YX40ugzNQg';

export const GOOGLE_MAPS_API_KEY = Platform.OS === 'ios' ? IOS_KEY : ANDROID_KEY;
