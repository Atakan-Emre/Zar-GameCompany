import React from 'react';
import { TextInput as RNTextInput, TextInputProps, StyleSheet } from 'react-native';
import { COLORS, SIZES } from '@/constants/theme';

export default function TextInput(props: TextInputProps) {
  return (
    <RNTextInput
      style={[styles.input, props.style]}
      placeholderTextColor={COLORS.gray}
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.small + 2,
    color: COLORS.dark,
    flex: 1,
  },
});