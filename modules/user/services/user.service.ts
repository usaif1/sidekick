// dependencies
import {
  FetchCurrentUserDocument,
  FetchCurrentUserQuery,
} from '@/generated/graphql';
import {callMutation, callQuery} from '@/utils/client';

const UserService = {
  fetchUserDetails: async () => {
    const response: FetchCurrentUserQuery = await callQuery({
      queryDocument: FetchCurrentUserDocument,
      variables: {},
    });

    return response.users;
  },
};

export default UserService;
