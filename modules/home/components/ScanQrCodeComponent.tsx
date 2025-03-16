import React, { useState, useEffect, useCallback } from "react";
import { View, StyleSheet, Text, Alert, Platform } from "react-native";
import { Camera, useCameraDevices } from "react-native-vision-camera";
import { request, PERMISSIONS, RESULTS } from "react-native-permissions";
import { useThemeStore } from "@/globalStore";
import H2 from "@/components/Typography/H2";
import P2 from "@/components/Typography/P2";
import Divider from "@/components/Divider";
import LinearGradientSVG from "../assets/linearGradient.svg";
import ButtonTextSm from "@/components/ButtonTextSm";
import CommonTextInputSm from "@/components/CommonTextInputSm";
import globalStore from "@/globalStore/globalStore";

const { colors } = useThemeStore.getState().theme;

const ScanQrCodeComponent = () => {
  const devices = useCameraDevices();
  const device = devices.find((d) => d.position === "back");
  const [hasPermission, setHasPermission] = useState(false);
  const [code, setCode] = useState("");
  const closeModal = globalStore.use.closeModal();

  useEffect(() => {
    const checkPermissions = async () => {
      let permission;
      if (Platform.OS === "ios") {
        permission = await request(PERMISSIONS.IOS.CAMERA);
      } else {
        permission = await request(PERMISSIONS.ANDROID.CAMERA);
      }

      setHasPermission(permission === RESULTS.GRANTED);

      if (permission !== RESULTS.GRANTED) {
        Alert.alert("Permission Denied", "Camera access is required to scan QR codes.");
      }
    };

    checkPermissions();
  }, []);

  const handleCodeScanned = ((codes:any) => {
    const scannedValue = codes[0]?.value;
    if (scannedValue) {
      setCode(scannedValue);
      Alert.alert("QR Code Scanned", `Code: ${scannedValue}`);
      closeModal();
    }
  });

  const handleContinue = useCallback(() => {
    if (code) {
      closeModal();
    }
  }, [code, closeModal]);

  return (
    <View style={styles.container}>
      <View style={styles.secondaryContainer}>
        <H2 customStyles={styles.centerText}>Scan QR Code</H2>
        <Divider height={8} />
        <P2 textColor="textSecondary" customStyles={styles.centerText}>
          Scan the QR code or enter the scooter number manually
        </P2>
      </View>

      <Divider height={20} />

      <View style={styles.qrScannerContainer}>
        {device && hasPermission ? (
          <Camera style={styles.qrScanner} device={device} isActive={true} codeScanner={{ codeTypes: ["qr"], onCodeScanned: handleCodeScanned }} />
        ) : (
          <Text>No camera available</Text>
        )}
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
        <Divider height={8} />
      </View>

      <Divider height={16} />
      <View style={styles.wrapper}>
        <View style={styles.textInputContainer}>
          <CommonTextInputSm placeholder="Enter Number" customStyle={styles.inputCustom} value={code} onChangeText={setCode} />
        </View>
        <View style={styles.buttonContainer}>
          <ButtonTextSm onPress={handleContinue} variant="highlight">
            Continue
          </ButtonTextSm>
        </View>
      </View>
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
  qrScannerContainer: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#296AEB",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  qrScanner: {
    width: "110%",
    height: "110%",
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
  wrapper: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    columnGap: 8,
  },
  textInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "70%",
  },
  buttonContainer: {
    width: "27%",
  },
  inputCustom: {
    textAlign: "center",
  },
});

export default ScanQrCodeComponent;
