import React, { useState } from 'react';
import { View, Text, Pressable } from 'react-native';
import { styled } from 'nativewind';
import MorphingBlob from '../components/MorphingBlob';

const StyledView = styled(View);
const StyledText = styled(Text);
const StyledPressable = styled(Pressable);

const BreathingExercise = () => {
  const [isHolding, setIsHolding] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  const handlePressIn = () => {
    setIsHolding(true);
    setIsCompleted(false);
    // Add your existing animation logic here
  };

  const handlePressOut = () => {
    if (!isCompleted) {
      setIsHolding(false);
      // Add your existing animation reset logic here
    }
  };

  return (
    <StyledView className="flex-1 justify-center items-center bg-blob-background">
      <StyledText className="text-2xl mb-10 text-center text-white font-semibold">
        {isCompleted ? "Congratulations!" : "Hold for 10 seconds and breathe"}
      </StyledText>
      
      <StyledPressable 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        className="w-[200px] h-[200px] justify-center items-center"
      >
        <MorphingBlob />
      </StyledPressable>
    </StyledView>
  );
};

export default BreathingExercise;