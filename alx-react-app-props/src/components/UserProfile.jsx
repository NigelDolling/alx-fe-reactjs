import React, { useContext } from 'react';
import { UserContext } from './UserContext';
import UserInfo from './UserInfo';

function UserProfile() {
  const user = useContext(UserContext);
  
  if (!user) {
    return <div>Loading user data...</div>;
  }

  return <UserInfo user={user} />;
}

export default UserProfile;
