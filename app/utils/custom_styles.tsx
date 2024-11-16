// dynamicStyles.ts
import { StyleSheet } from "react-native";

interface Btn {
  borderRadius?: number;
  borderWidth?: number;
  backgroundColor?: string;
  borderColor?: string;
  borderStyle?: "solid" | "dotted" | "dashed";
}

export const BtnStyles = ({
  borderRadius = 20,
  borderWidth = 0,
  backgroundColor = "",
  borderColor = "",
  borderStyle = "solid",
}: Btn) =>
  StyleSheet.create({
    btnIcon: {
      borderWidth: borderWidth,
      borderColor: borderColor,
      borderStyle: borderStyle, // Now correctly typed
      backgroundColor: backgroundColor,
      borderRadius: borderRadius,
      alignItems: "center",
      justifyContent: "center",
      width: 60,
      height: 60,
    },
  });
