import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import LoginScreen from './src/features/auth/screen/LoginScreen';
import SearchScreen from './src/features/dashboard/screen/SearchScreen';
import { TheaterShowScreen } from './src/features/theatrer/screen/theater-shows';

export default function App() {
  return (
    <View style={styles.container}>
      {/* <Text>Open up App.js to start working on your app!</Text> */}
      {/* <StatusBar style="auto" /> */}
      {/* <LoginScreen/> */}
      <SearchScreen/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
