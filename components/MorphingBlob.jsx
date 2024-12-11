import React from 'react';
import { View, Animated } from 'react-native';
import { tw } from 'twrnc';

const MorphingBlob = ({ scale = 1 }) => {
  return (
    <Animated.View 
      style={[
        tw`relative min-h-[200px] min-w-[200px] w-[40vw] h-[40vw]`,
        { transform: [{ scale }] }
      ]}
    >
      {/* Background gradient */}
      <View 
        style={tw`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full 
                 bg-purple-300/20 via-purple-300/10 to-transparent 
                 rounded-full blur-xl`}
      />
      
      {/* Morphing blob */}
      <View 
        style={tw`relative w-full h-full
                 bg-[#fdfbfd] dark:bg-[#bca5e3]
                 animate-blob
                 [transform-style:preserve-3d]
                 [perspective:1000px]`}
      >
        {/* Inner shadows */}
        <View 
          style={tw`absolute inset-0
                  shadow-[inset_10px_0_40px_#f7f8fc,inset_-10px_0_20px_#f7e1ef,inset_-40px_10px_100px_#c3c5ea]
                  dark:shadow-[inset_10px_0_40px_#a174db,inset_-10px_0_20px_#40245e,inset_-40px_10px_110px_#1b1648]`} 
        />
      </View>
    </Animated.View>
  );
};

export default MorphingBlob;
