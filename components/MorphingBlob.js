import React, { useEffect, useRef } from 'react';
import { View, Animated, Easing } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import tw from 'twrnc';

const MorphingBlob = () => {
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
          useNativeDriver: true,
        }),
        Animated.timing(movementAnim, {
          toValue: 0,
          duration: 32000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
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

  // Border radius interpolation
  const borderTopLeftRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: [63, 40, 54, 61, 61, 50, 46, 63]
  });

  const borderTopRightRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: [37, 60, 46, 39, 39, 50, 54, 37]
  });

  const borderBottomRightRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: [54, 54, 38, 55, 67, 34, 50, 54]
  });

  const borderBottomLeftRadius = transformAnim.interpolate({
    inputRange: [0, 0.14, 0.28, 0.42, 0.56, 0.70, 0.84, 1],
    outputRange: [46, 46, 62, 45, 33, 66, 50, 46]
  });

  // Movement interpolation
  const translateY = movementAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 20]
  });

  return (
    <View style={tw`relative min-h-[200px] min-w-[200px] w-[40vh] h-[40vh]`}>
      {/* Background gradient */}
      <LinearGradient
        colors={['rgba(112,58,199,0.2)', 'rgba(112,58,199,0.1)', 'rgba(112,58,199,0.05)', 'transparent']}
        locations={[0, 0.3, 0.6, 1]}
        style={[
          tw`absolute w-full h-full rounded-full opacity-50`,
          {
            transform: [
              { translateX: -100 }, 
              { translateY: -100 }
            ]
          }
        ]}
      />
      
      {/* Morphing blob */}
      <Animated.View 
        style={[
          tw`relative w-full h-full bg-[#bca5e3]`,
          {
            borderTopLeftRadius,
            borderTopRightRadius,
            borderBottomRightRadius,
            borderBottomLeftRadius,
            transform: [
              { translateY }
            ],
            shadowColor: '#a174db',
            shadowOffset: { width: 10, height: 0 },
            shadowRadius: 40,
            shadowOpacity: 0.5,
            elevation: 10,
          }
        ]}
      >
        {/* Inner shadow effects */}
        <View 
          style={[
            tw`absolute inset-0`,
            {
              shadowColor: '#40245e',
              shadowOffset: { width: -10, height: 0 },
              shadowRadius: 20,
              shadowOpacity: 0.5,
              backgroundColor: 'transparent'
            }
          ]}
        />
        <View 
          style={[
            tw`absolute inset-0`,
            {
              shadowColor: '#1b1648',
              shadowOffset: { width: -40, height: 10 },
              shadowRadius: 100,
              shadowOpacity: 0.5,
              backgroundColor: 'transparent'
            }
          ]}
        />
      </Animated.View>
    </View>
  );
};

export default MorphingBlob;