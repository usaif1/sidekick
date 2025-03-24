// dependencies
import React, {useEffect} from 'react';
import {View} from 'react-native';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

// assets
import SideKickLogo from '../assets/sidekick_logo.svg';

// styles
import {splashStyles} from '../splashStyles';

// stores
import {useAuthStore} from '@/globalStore';

// services
import {AuthService} from '@/globalService';
import {initializeClient} from '@/utils/client';

const SplashScreen1: React.FC = () => {
  const {stopLoading, setAuthUser, setAuthToken, setGraphQLClient} =
    useAuthStore();

  useEffect(() => {
    auth().onAuthStateChanged(async user => {
      if (!user) {
        setTimeout(() => {
          stopLoading('loading-user');
        }, 50);
        setGraphQLClient(null);
        setAuthUser(null);
        setAuthToken('');
        return;
      }

      const tokenResult = await user?.getIdTokenResult();
      const hasuraIdExists = AuthService.checkHasuraId(
        tokenResult as FirebaseAuthTypes.IdTokenResult,
      );

      /**
       * checking if hasura id exists for the user
       * hasura id is the id of the user in the Hasura database
       * if !hasuraIdExists, we call the refresh token function to create a new user in Hasura
       * this flow is for the first time user logs in
       */
      if (!hasuraIdExists?.hasuraId) {
        await AuthService.fireRefreshToken(user);
      } else {
        /**
         * if hasura id exists, we check if the user is a customer
         * if not, we show an error message and sign out the user
         */

        // setXHasuraId(hasuraIdExists?.hasuraId);
        const token = await user?.getIdToken();

        // initializing the graphql client with the new token and putting it in authStore
        const graphqlClient = initializeClient();
        setGraphQLClient(graphqlClient);
        setAuthToken(token as string);
        setAuthUser(user);
        setTimeout(() => {
          stopLoading('loading-user');
        }, 1000);
      }
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <View style={splashStyles.layoutBackground}>
      <SideKickLogo />
    </View>
  );
};

export default SplashScreen1;
