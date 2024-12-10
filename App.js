import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native';
import BreathingExercise from './components/BreathingExercise';

export default function App() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <BreathingExercise />
      <StatusBar style="auto" />
    </SafeAreaView>
  );
}