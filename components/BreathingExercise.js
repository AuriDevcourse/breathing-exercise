import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Pressable, StyleSheet } from 'react-native';

const BreathingExercise = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timer = useRef(null);

  useEffect(() => {
    return () => {
      if (timer.current) {
        clearTimeout(timer.current);
      }
    };
  }, []);

  const handlePressIn = () => {
    setIsHolding(true);
    setIsCompleted(false);
    
    // Animate bubble expansion
    Animated.timing(scaleAnim, {
      toValue: 3,
      duration: 10000, // 10 seconds
      useNativeDriver: true,
    }).start();

    // Set timer for completion
    timer.current = setTimeout(() => {
      setIsCompleted(true);
      setIsHolding(false);
      // Reset bubble size with a "pop" effect
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 3.5,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start(() => {
        scaleAnim.setValue(1);
      });
    }, 10000);
  };

  const handlePressOut = () => {
    if (!isCompleted) {
      setIsHolding(false);
      if (timer.current) {
        clearTimeout(timer.current);
      }
      // Reset bubble size
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.instructionText}>
        {isCompleted 
          ? "Congratulations!" 
          : "Hold for 10 seconds and breathe"}
      </Text>
      
      <Pressable 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.bubbleContainer}
      >
        <Animated.View
          style={[
            styles.bubble,
            {
              transform: [{ scale: scaleAnim }],
              opacity: isCompleted ? 0 : 1,
            },
          ]}
        />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  instructionText: {
    fontSize: 24,
    marginBottom: 40,
    textAlign: 'center',
    color: '#333',
    fontWeight: '600',
  },
  bubbleContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bubble: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#64B5F6',
    opacity: 0.8,
  },
});

export default BreathingExercise;