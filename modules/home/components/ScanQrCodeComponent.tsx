import React, { useEffect, useState } from "react";
import { View, PermissionsAndroid, Platform, StyleSheet, Text } from "react-native";
import { RNCamera } from "react-native-camera";
import globalStore from "@/globalStore/globalStore";

const ScanQrCodeComponent: React.FC = () => {
  const closeModal = globalStore.use.closeModal();
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const requestCameraPermission = async () => {
      if (Platform.OS === "android") {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.CAMERA
        );
        setHasPermission(granted === PermissionsAndroid.RESULTS.GRANTED);
      } else {
        setHasPermission(true);
      }
    };

    requestCameraPermission();
  }, []);

  const handleScanSuccess = (e: { data: string }) => {
    console.log("Scanned QR Code:", e.data);
    closeModal();
  };

  if (hasPermission === null) {
    return <Text>Requesting Camera Permission...</Text>;
  }

  if (!hasPermission) {
    return <Text>Camera permission denied</Text>;
  }

  return (
    <View style={styles.container}>
      <RNCamera
        style={styles.camera}
        type={RNCamera.Constants.Type.back}
        flashMode={RNCamera.Constants.FlashMode.auto}
        onBarCodeRead={handleScanSuccess}
        captureAudio={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    flex: 1,
  },
  camera: {
    width: "100%",
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default ScanQrCodeComponent;
