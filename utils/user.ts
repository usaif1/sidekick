import {useUserStore} from '@/globalStore';

export const showCredits = () => {
  const user = useUserStore.getState().user;
  console.log('user', user);

  if (user?.user_organizations?.length) {
    return true;
  }

  return false;
};
