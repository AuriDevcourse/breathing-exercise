import React from 'react';
import { View } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledGradient = styled(LinearGradient);

const MorphingBlob = () => {
  return (
    <StyledView className="relative min-h-[200px] min-w-[200px] w-[40vh] h-[40vh]">
      {/* Background gradient */}
      <StyledGradient
        colors={['rgba(112,58,199,0.2)', 'rgba(112,58,199,0.1)', 'rgba(112,58,199,0.05)', 'transparent']}
        locations={[0, 0.3, 0.6, 1]}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full rounded-full opacity-50"
      />
      
      {/* Morphing blob */}
      <StyledView 
        className="relative w-full h-full bg-blob-purple rounded-blob animate-blob [transform-style:preserve-3d] [perspective:1000px]"
      >
        {/* Inner shadows */}
        <StyledView 
          className="absolute inset-0 shadow-blob-inset" 
        />
      </StyledView>
    </StyledView>
  );
};

export default MorphingBlob;