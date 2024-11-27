import { StatusBar } from 'expo-status-bar';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Home({ navigation }) {

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      Alert.alert('Error', 'Failed to sign out: ' + error.message);
    } else {
      Alert.alert('Success', 'Signed out successfully!');
      navigation.replace('Login'); // Navigate to the Login screen
    }
  };

  const confirmSignOut = () => {
    Alert.alert(
      'Do you want to sign out?',  // Alert title
      '',                          // Alert message, can be empty
      [
        {
          text: 'Cancel',          // Cancel button
          onPress: () => console.log('Sign out cancelled'),
          style: 'cancel',
        },
        {
          text: 'Confirm',         // Confirm button
          onPress: handleSignOut,
          style: 'destructive',    // Destructive button style
        },
      ],
      { cancelable: true }         // Allow dismissing by tapping outside
    );
  };

  return (
    <View style={styles.container}>
      {/* Top row: Add and Edit */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('AddToList')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Add</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('EditToList')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Edit</Text>
          </View>
        </TouchableOpacity>
      </View>

      {/* Bottom row: Delete and Sign Out */}
      <View style={styles.row}>
        <TouchableOpacity onPress={() => navigation.navigate('DeleteToList')}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Delete</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={confirmSignOut}>
          <View style={styles.button}>
            <Text style={styles.buttonText}>Sign Out</Text>
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '70%',
    marginVertical: 10,
    top: 300,
  },
  button: {
    backgroundColor: '#7AB2D3',
    padding: 10,
    borderRadius: 25,
    width: 120,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
