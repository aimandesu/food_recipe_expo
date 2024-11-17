// dynamicStyles.ts
import { StyleSheet, Platform, DimensionValue } from "react-native";

interface Btn {
  borderRadius?: number;
  borderWidth?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderStyle?: "solid" | "dotted" | "dashed";
  width?: DimensionValue;
  height?: DimensionValue;
}

export const BtnStyles = ({
  borderRadius = 20,
  borderWidth = 0,
  backgroundColor = "",
  borderColor = "",
  borderStyle = "solid",
  width = 60,
  height = 60,
}: Btn) =>
  StyleSheet.create({
    btnIcon: {
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderStyle: borderStyle, // Correctly typed
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      alignItems: "center",
      justifyContent: "center",
      width: width,
      height: height,
    },
  });

interface CustomShadow {
  elevation?: number;
  shadowColor?: string;
  shadowOffset?: { width: number; height: number };
  shadowOpacity?: number;
  shadowRadius?: number;
}

export const shadowStyles = ({
  elevation = 5,
  shadowColor = "#000",
  shadowOffset = { width: 0, height: 2 },
  shadowOpacity = 0.8,
  shadowRadius = 2,
}: CustomShadow) => ({
  ...Platform.select({
    ios: {
      shadowColor: shadowColor,
      shadowOffset: shadowOffset,
      shadowOpacity: shadowOpacity,
      shadowRadius: shadowRadius,
    },
    android: {
      elevation: elevation,
    },
  }),
});
