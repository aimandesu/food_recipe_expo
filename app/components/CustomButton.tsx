import { Animated, Pressable, StyleSheet, Text } from "react-native";

interface CustomBtn {
  text: string;
  onTap: () => void;
}

const CustomButton: React.FC<CustomBtn> = ({ text, onTap }) => {
  // 1. Animated value
  const backgroundColorRef = new Animated.Value(0);

  // 2. The handlers
  const handlePress = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 1,
      duration: 60,
      useNativeDriver: true,
    }).start();
    onTap();
  };
  const handleRelease = () => {
    Animated.timing(backgroundColorRef, {
      toValue: 0,
      duration: 60,
      useNativeDriver: true,
    }).start();
  };

  // Interpolate the background color
  const backgroundColor = backgroundColorRef.interpolate({
    inputRange: [0, 1],
    outputRange: ["#EAB68F", "#D98E73"],
  });

  // Applying the interpolated backgroundColor
  return (
    <Pressable onPressIn={handlePress} onPressOut={handleRelease}>
      <Animated.View style={[styles.buttonContainer, { backgroundColor }]}>
        <Text style={styles.buttonText}>{text}</Text>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    alignItems: "center",
    backgroundColor: "#EAB68F",
    borderRadius: 5,
    marginHorizontal: 10,
    // padding: 15,
  },
  buttonText: {
    color: "black",
    fontSize: 20,
  },
});

export default CustomButton;
