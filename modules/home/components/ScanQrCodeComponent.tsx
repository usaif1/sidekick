import React from "react";
import { View, StyleSheet, Text } from "react-native";
import H2 from "@/components/Typography/H2";
import P2 from "@/components/Typography/P2";
import Divider from "@/components/Divider";
import { useThemeStore } from "@/globalStore";
import LinearGradientSVG from "../assets/linearGradient.svg";

const { colors } = useThemeStore.getState().theme;

const ScanQrCodeComponent = () => {
  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>
        <H2 customStyles={styles.centerText}>Scan QR Code</H2>
        <Divider height={5} />
        <P2 textColor="textSecondary" customStyles={styles.centerText}>
          Please scan the QR Code in the middle of the Scooter’s handle
        </P2>
      </View>

      <Divider height={12} />
      <View style={styles.separatorContainer}>
        <LinearGradientSVG style={styles.gradientLeft} />
        <Text style={styles.orText}>or</Text>
        <LinearGradientSVG style={styles.gradientRight} />
      </View>
      <Divider height={12} />

      <View style={styles.secondaryContainer}>
        <H2 customStyles={styles.centerText}>Enter Scooter Number</H2>
        <Divider height={5} />
        <P2 textColor="textSecondary" customStyles={styles.centerText}>
          Please enter the number you see
        </P2>
      </View>
      <Divider height={12} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  secondaryContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 40,
  },
  centerText: {
    textAlign: "center",
  },
  separatorContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  gradientLeft: {
    width: 47,
    height: 4,
    marginRight: 10,
  },
  gradientRight: {
    width: 47,
    height: 4,
    marginLeft: 10,
    transform: [{ rotate: "180deg" }],
  },
  orText: {
    fontWeight: "600",
    fontSize: 14,
    color: colors.textPrimary,
  },
});

export default ScanQrCodeComponent;
