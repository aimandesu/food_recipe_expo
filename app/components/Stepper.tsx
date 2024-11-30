import React from "react";
import { View, Text, StyleSheet, Animated, Dimensions } from "react-native";
import Svg, { Circle } from "react-native-svg";

const { width } = Dimensions.get("window");

type MerchantStepperProps = {
  currentStep: number;
  totalSteps: number;
  title: string;
  icon?: React.ReactNode;
  primaryColor?: string;
  backgroundColor?: string;
};

const MerchantStepper: React.FC<MerchantStepperProps> = ({
  currentStep,
  totalSteps,
  title,
  icon = null,
  primaryColor = "#4CAF50",
  backgroundColor = "#E0E0E0",
}) => {
  const progress = currentStep / totalSteps;

  // Animated value
  const animatedProgress = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progress,
      duration: 500,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const radius = 27; // Radius of the circle
  const strokeWidth = 5;
  const circumference = 2 * Math.PI * radius;
  const animatedStrokeDashoffset = animatedProgress.interpolate({
    inputRange: [0, 1],
    outputRange: [circumference, 0],
  });

  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.stepText}>
          STEP {currentStep} OUT OF {totalSteps}
        </Text>
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                backgroundColor: primaryColor,
                width: animatedProgress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0, 224],
                }),
              },
            ]}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  circularContainer: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  iconContainer: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    marginLeft: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
  },
  stepText: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: "500",
    color: "#757575",
  },
  progressBarContainer: {
    marginTop: 5,
    width: 224,
    height: 8,
    backgroundColor: "#E0E0E0",
    borderRadius: 4,
    overflow: "hidden",
  },
  progressBar: {
    height: 8,
    borderRadius: 4,
  },
});

export default MerchantStepper;
