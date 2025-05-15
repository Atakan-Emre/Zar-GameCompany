export const COLORS = {
  primary: '#4E89FF',     // Main blue
  primaryDark: '#3A6AD4', // Darker blue
  secondary: '#FFD451',   // Yellow
  secondaryDark: '#F9C22E', // Darker yellow
  accent: '#FF70A6',      // Pink
  accentDark: '#FF4D8D',  // Darker pink
  
  success: '#4EB964',     // Green for correct answers
  warning: '#FFA726',     // Orange for warnings
  error: '#FF626D',       // Red for incorrect answers
  
  dark: '#333333',
  darkGray: '#707070',
  gray: '#9E9E9E',
  lightGray: '#E5E5E5',
  white: '#FFFFFF',
  
  background: '#F5F8FF',  // Light background with blue tint
};

export const SIZES = {
  // Font sizes
  extraSmall: 10,
  small: 12,
  medium: 16,
  large: 20,
  extraLarge: 24,
  
  // Radius
  radius: 12,
  
  // Screen padding
  screenPadding: 16,
};

export const SPACING = {
  small: 8,
  medium: 16,
  large: 24,
  extraLarge: 32,
};

export const SHADOWS = {
  small: {
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 2,
  },
  medium: {
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 6,
  },
  large: {
    shadowColor: COLORS.dark,
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
};