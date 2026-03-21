import { Stack } from 'expo-router';

export default function StagesLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#0A0E27' },
        animation: 'slide_from_right',
      }}
    />
  );
}
