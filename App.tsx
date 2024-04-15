import { StatusBar, View } from 'react-native';
import { Routes } from './src/routes';

export default function App() {
  return (
    <View style={{ flex: 1 }}>
      <Routes />
      <StatusBar />
    </View>
  );
}
