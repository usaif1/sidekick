// dependencies
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';
import axios from 'axios';

// store
import useAuthStore from '../store';

const {setConfirmationResult} = useAuthStore.getState();

const AuthService = {
  sendOTP: async (phoneNumber: string, forceResend: boolean) => {
    try {
      const confirmation = await auth().signInWithPhoneNumber(
        phoneNumber,
        forceResend,
      );
      setConfirmationResult(confirmation);
      return confirmation;
    } catch (error) {
      console.error('error sending OTP', error);
      throw new Error('Failed to send OTP');
    }
  },

  verifyOTP: async (
    confirmation: FirebaseAuthTypes.ConfirmationResult | null,
    code: string,
    errorCallback: () => void,
  ) => {
    try {
      const userCredential = await confirmation?.confirm(code);
      return userCredential?.user;
    } catch (error) {
      errorCallback();
      throw new Error('Failed to verify OTP');
    }
  },

  checkHasuraId: (token: FirebaseAuthTypes.IdTokenResult) => {
    const hasuraClaim = token?.claims['https://hasura.io/jwt/claims'];

    if (!hasuraClaim) {
      return null;
    } else {
      return {
        hasuraId: hasuraClaim['x-hasura-user-id'],
        role: hasuraClaim['x-hasura-default-role'],
      };
    }
  },

  addHasuraClaimsViaRefreshToken: (
    timeout: number,
    uid: string,
    role: string,
    errorCallback: () => void,
  ) => {
    const endpoint = 'http://localhost:3000';

    return new Promise(resolve => {
      setTimeout(async () => {
        try {
          const result = await axios.get(
            // todo: this url is different for different environments and should be moved to a config file
            endpoint,
            {
              params: {
                uid: `${uid}`,
                role: role,
              },
            },
          );

          resolve(result.data);
        } catch (error) {
          errorCallback();
          throw new Error('Failed to add hasura claims');
        }
      }, timeout);
    });
  },
};

export default AuthService;
