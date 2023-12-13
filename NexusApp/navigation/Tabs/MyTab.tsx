import React, { useEffect, useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Jobs from '../Screens/Jobs'; // Import your Jobs screen here
import Discover from '../Screens/Discover'; // Import your Discover screen here
import Likes from '../Screens/Likes'; // Import your Likes screen here
import Chat from '../Screens/Chat'; // Import your Chat screen here
import Profile from '../Screens/Profile'; // Import your Profile screen here
import SignUp from '../Screens/SignUp'; // Import your SignUp screen here
import Standouts from '../Screens/Standouts';

const Tab = createBottomTabNavigator();

type TabObject = {
  name: string;
  component: React.FC;
  icon: string;
};

function MyTabs({ userType }: { userType: string }) {
  const [tabs, setTabs] = useState<TabObject[]>([]);

  useEffect(() => {
    // Customize tabs based on user type
    if (userType === 'individual') {
      setTabs([
        { name: 'Discover', component: Discover, icon: 'home' },
        { name: 'Jobs', component: Jobs, icon: 'account' },
        { name: 'Likes', component: Likes, icon: 'account' },
        { name: 'Chat', component: Chat, icon: 'bell' },
        { name: 'Profile', component: Profile, icon: 'account' },
      ]);
    } else if (userType === 'organization') {
      setTabs([
        { name: 'Discover', component: Discover, icon: 'home' },
        { name: 'Standouts', component: Standouts, icon: 'account' },
        { name: 'Likes', component: Likes, icon: 'account' },
        { name: 'Chat', component: Chat, icon: 'bell' },
        { name: 'Profile', component: Profile, icon: 'account' },
        // Customize organization tabs as needed
      ]);
    }
  }, [userType]);

  return (
    <Tab.Navigator
      initialRouteName="Discover"
      screenOptions={({ route }) => ({
        tabBarLabel: route.name,
        tabBarIcon: ({ color, size }) => {
          const tab = tabs.find((t) => t.name === route.name);
          if (tab) {
            return <MaterialCommunityIcons name={tab.icon} color={color} size={size} />;
          }
        },
        tabBarOptions: {
          activeTintColor: '#e91e63',
        },
      })}
    >
      {tabs.map((tab) => (
        <Tab.Screen key={tab.name} name={tab.name} component={tab.component} />
      ))}
    </Tab.Navigator>
  );
  
}

export default MyTabs;
