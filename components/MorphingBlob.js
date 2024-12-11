import React, { useState, useEffect, useRef } from 'react';
import { View, Text, Animated, Pressable, StyleSheet, Dimensions, Platform, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

const MorphingBlob = ({ isHolding, scale }) => {
  const transformAnim = useRef(new Animated.Value(0)).current;
  const movementAnim = useRef(new Animated.Value(0)).current;
  const colorAnim = useRef(new Animated.Value(0)).current;

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

    // Movement animation with more subtle movement
    const movementAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(movementAnim, {
          toValue: 1,
          duration: 40000, // Slower movement
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(movementAnim, {
          toValue: 0,
          duration: 40000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        })
      ])
    );

    // Color animation
    const colorAnimation = Animated.loop(
      Animated.sequence([
        Animated.timing(colorAnim, {
          toValue: 1,
          duration: 20000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        }),
        Animated.timing(colorAnim, {
          toValue: 0,
          duration: 20000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: false,
        })
      ])
    );

    transformAnimation.start();
    movementAnimation.start();
    colorAnimation.start();

    return () => {
      transformAnimation.stop();
      movementAnimation.stop();
      colorAnimation.stop();
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

  // Movement interpolation with reduced values for subtlety
  const translateY = movementAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 15] // Reduced movement range
  });

  const rotateY = movementAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '5deg'] // Reduced rotation
  });

  // Color interpolation
  const backgroundColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#bca5e3', '#b298e0'] // Subtle color shift
  });

  const shadowColor = colorAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#a174db', '#9665d3']
  });

  return (
    <View style={{
      position: 'absolute',
      width: '100%',
      height: '100%',
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Enhanced backlight with multiple gradients */}
      <LinearGradient
        colors={[
          'rgba(112,58,199,0.25)', 
          'rgba(112,58,199,0.15)', 
          'rgba(112,58,199,0.08)', 
          'transparent'
        ]}
        locations={[0, 0.3, 0.6, 1]}
        style={{
          position: 'absolute',
          width: 400, // Larger gradient
          height: 400,
          borderRadius: 200,
          top: '50%',
          left: '50%',
          transform: [{ translateX: -200 }, { translateY: -200 }],
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
          backgroundColor,
          shadowColor,
          shadowOffset: { width: 15, height: 0 },
          shadowRadius: 50,
          shadowOpacity: 0.6,
          elevation: 10,
          overflow: 'hidden',
        }}
      >
        {/* Enhanced inset shadow effects */}
        <View 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            shadowColor: '#f7e1ef',
            shadowOffset: { width: -15, height: 0 },
            shadowRadius: 25,
            shadowOpacity: 0.6,
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
            shadowOffset: { width: -50, height: 15 },
            shadowRadius: 120,
            shadowOpacity: 0.6,
            backgroundColor: 'transparent',
          }}
        />
      </Animated.View>
    </View>
  );
};

export default MorphingBlob;