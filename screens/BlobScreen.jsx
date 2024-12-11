import React from 'react';
import { View, SafeAreaView, StyleSheet } from 'react-native';
import { tw } from 'twrnc';
import MorphingBlob from '../components/MorphingBlob';

export default function BlobScreen() {
  return (
    <SafeAreaView style={tw`flex-1 items-center justify-center bg-white dark:bg-[#0f0c24]`}>
      <MorphingBlob />
    </SafeAreaView>
  );
}

// Optional: If you want to add some additional styling
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  }
});
