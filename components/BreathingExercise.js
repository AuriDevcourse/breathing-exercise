import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Pressable, StyleSheet, Dimensions, Platform, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const MorphingBlob = ({ isHolding, scale }) => {
  const transformAnim = useRef(new Animated.Value(0)).current;
  const movementAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Transform animation (border radius morphing)
    const transformAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(transformAnim, {
          toValue: 1,
          duration: 40000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(transformAnim, {
          toValue: 0,
          duration: 40000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        })
      ])
    );

    // Movement animation
    const movementAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(movementAnim, {
          toValue: 1,
          duration: 32000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(movementAnim, {
          toValue: 0,
          duration: 32000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        })
      ])
    );

    transformAnimation.start();
    movementAnimation.start();

    return () => {
      transformAnimation.stop();
      movementAnimation.stop();
    };
  }, []);

  // Border radius interpolation matching the CSS keyframes
  const borderTopLeftRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: ['63%', '40%', '54%', '61%', '61%', '50%', '46%', '63%']
  });

  const borderTopRightRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: ['37%', '60%', '46%', '39%', '39%', '50%', '54%', '37%']
  });

  const borderBottomRightRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: ['54%', '54%', '38%', '55%', '67%', '34%', '50%', '54%']
  });

  const borderBottomLeftRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: ['46%', '46%', '62%', '45%', '33%', '66%', '50%', '46%']
  });

  // Movement interpolation
  const translateY = movementAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20]
  });

  const rotateY = movementAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '10deg']
  });

  return (
    <View style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Soft fading backlight */}
      <LinearGradient
        colors={[
          'rgba(112,58,199,0.2)', 
          'rgba(112,58,199,0.1)', 
          'rgba(112,58,199,0.05)', 
          'transparent'
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={{
          position: 'absolute',
          width: 300,
          height: 300,
          borderRadius: 150,
          top: '50%',
          left: '50%',
          transform: [{ translateX: -150 }, { translateY: -150 }],
        }}
      />

      <Animated.View 
        style={{
          width: 200,
          height: 200,
          transform: [
            { scale: scale || 1 },
            { translateY },
            { rotateY }
          ],
          borderTopLeftRadius,
          borderTopRightRadius,
          borderBottomRightRadius,
          borderBottomLeftRadius,
          backgroundColor: '#bca5e3',
          shadowColor: '#a174db',
          shadowOffset: { width: 10, height: 0 },
          shadowRadius: 40,
          shadowOpacity: 0.5,
          elevation: 10,
          overflow: 'hidden',
        }}
      >
        {/* Inset shadow effect */}
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            shadowColor: '#f7e1ef',
            shadowOffset: { width: -10, height: 0 },
            shadowRadius: 20,
            shadowOpacity: 0.5,
            backgroundColor: 'transparent',
          }}
        />
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            shadowColor: '#c3c5ea',
            shadowOffset: { width: -40, height: 10 },
            shadowRadius: 100,
            shadowOpacity: 0.5,
            backgroundColor: 'transparent',
          }}
        />
      </Animated.View>
    </View>
  );
};

const BreathingExercise = () => {
  const [isHolding, setIsHolding] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const timer = useRef(null);

  const handlePressIn = () => {
    setIsHolding(true);
    Animated.timing(scaleAnim, {
      toValue: 3,
      duration: 10000,
      useNativeDriver: false,
    }).start();

    timer.current = setTimeout(() => {
      Animated.sequence([
        Animated.timing(scaleAnim, {
          toValue: 3.5,
          duration: 100,
          useNativeDriver: false,
        }),
        Animated.timing(scaleAnim, {
          toValue: 0,
          duration: 100,
          useNativeDriver: false,
        }),
      ]).start(() => {
        scaleAnim.setValue(1);
        setIsHolding(false);
      });
    }, 10000);
  };

  const handlePressOut = () => {
    if (timer.current) {
      clearTimeout(timer.current);
    }

    if (isHolding) {
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 500,
        useNativeDriver: false,
      }).start();
      setIsHolding(false);
    }
  };

  return (
    <View style={styles.container}>
      <MorphingBlob />
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        style={styles.pressableArea}
      >
        <Text style={styles.instructionText}>
          {isHolding ? 'Hold...' : 'Press and Hold'}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0f0c24',
  },
  pressableArea: {
    position: 'absolute',
    bottom: 50,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
  },
  instructionText: {
    color: 'white',
    fontSize: 18,
  },
});

export default BreathingExercise;