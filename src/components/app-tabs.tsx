import { Tabs } from 'expo-router/js-tabs';

import { Icon, type IconName } from '@/components/icon';
import { Typography } from '@/constants/theme';
import { useTheme } from '@/hooks/use-theme';

// Each tab's icon, normal and selected, with its iOS (SF Symbols) and Android (Material) names.
const TAB_ICONS = {
  home: {
    normal: { ios: 'house', android: 'home' },
    selected: { ios: 'house.fill', android: 'home' },
  },
  orders: {
    normal: { ios: 'doc.text', android: 'receipt_long' },
    selected: { ios: 'doc.text.fill', android: 'receipt_long' },
  },
  profile: {
    normal: { ios: 'person', android: 'person' },
    selected: { ios: 'person.fill', android: 'person' },
  },
} satisfies Record<string, { normal: IconName; selected: IconName }>;

export default function AppTabs() {
  const theme = useTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.primary,
        tabBarInactiveTintColor: theme.textSecondary,
        tabBarLabelStyle: Typography.label,
        tabBarStyle: { backgroundColor: theme.surface, borderTopColor: theme.border },
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ focused }) => <TabIcon tab="home" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ focused }) => <TabIcon tab="orders" focused={focused} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ focused }) => <TabIcon tab="profile" focused={focused} />,
        }}
      />
    </Tabs>
  );
}

// Filled and green when the tab is selected.
function TabIcon({ tab, focused }: { tab: keyof typeof TAB_ICONS; focused: boolean }) {
  const icon = TAB_ICONS[tab];

  return (
    <Icon
      name={focused ? icon.selected : icon.normal}
      size="lg"
      color={focused ? 'primary' : 'textSecondary'}
    />
  );
}
