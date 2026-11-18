import React, { useRef, useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, View, TouchableOpacity, Image, Animated } from "react-native";
import * as MediaLibrary from "expo-media-library";
import {
  CameraView,
  useCameraPermissions,
  useMicrophonePermissions,
} from "expo-camera";

const COLORS = {
  background: "#F1EBFD",
  primary: "#6F66FF",
  pill: "#E4DCFA",
  textDark: "#2A1B6B",
  orange: "#FF8A00",
  record: "#FFB35C",
  white: "#FFFFFF",
  navy: "#1B2459",
  navyDeep: "#3B3A8C",
  purple: "#6F4BFF",
};

export default function HomeScreen() {
  const cameraRef = useRef(null);
  const [isRecording, setRecording] = useState(false);

  // Permissions caméra / micro
  const [camPerm, requestCamPerm] = useCameraPermissions();
  const [micPerm, requestMicPerm] = useMicrophonePermissions();

  const startRecording = async () => {
    try {
      setRecording(true);
      const video = await cameraRef.current?.recordAsync({ maxDuration: 9 });
      console.log("Vidéo enregistrée :", video?.uri);
    } catch (error) {
      alert(error);
    } finally {
      setRecording(false);
    }
  };

  const stopRecording = () => {
    cameraRef.current?.stopRecording();
  };

  // Chargement des permissions
  if (!camPerm || !micPerm) return <View />;

  if (!camPerm.granted || !micPerm.granted) {
    return (
      <View style={styles.center}>
        <Text>Caméra et micro nécessaires.</Text>
        <TouchableOpacity
          style={styles.btn}
          onPress={async () => {
            await requestCamPerm();
            await requestMicPerm();
          }}
        >
          <Text style={styles.btnText}>Autoriser</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* Zone principale */}
      <View style={styles.content}>
        {/* Petite caméra en haut à gauche */}
        <View style={styles.camera}>
          <CameraView
            style={{ flex: 1 }}
            mode="video"
            facing="back"
            ref={cameraRef}
          />
        </View>

        <View style={styles.times}>
          <Text style={styles.timerText}>02:35</Text>
          <View style={styles.redDot} />
        </View>

        {/* Graphique en bas */}
        <View style={styles.chart}>
          <View style={styles.chartLine} />
        </View>
      </View>

      {/* Dégradé violet tout en bas */}
      {/* <LinearGradient
        pointerEvents="none"
        colors={["rgba(185, 184, 235, 0)", "#f4f4f8d0"]}
        style={styles.bottomGlow}
      /> */}

      {/* Barre du bas */}
      <View style={styles.bottomBar}>
        {/* Retour */}
        <TouchableOpacity style={styles.bottomItem}>
          <View style={styles.sideCircle}>
            <Ionicons name="arrow-back" size={26} color="#fff" />
          </View>
        </TouchableOpacity>

        {/* Enregistrer */}
        <TouchableOpacity
          style={styles.recordWrapper}
          onPress={isRecording ? stopRecording : startRecording}
        >
          <View
            style={[
              styles.spark,
              { top: 2, right: 14, transform: [{ rotate: "15deg" }] },
            ]}
          />
          <View
            style={[
              styles.spark,
              { top: 10, right: 2, transform: [{ rotate: "55deg" }] },
            ]}
          />
          <View
            style={[
              styles.spark,
              { top: 24, right: -6, transform: [{ rotate: "75deg" }] },
            ]}
          />

          <LinearGradient
            colors={["#6038e6", "#4A22C4"]}
            style={styles.recordRing}
          >
            <View style={styles.recordButton}>
              <Image
                style={styles.recordIcon}
                source={require("../../assets/images/Aura.png")}
              />
            </View>
          </LinearGradient>

          {/* <LinearGradient
            colors={["#6B4BEF", "#4E2FC2"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={styles.recordLabel}
          >
            {/* <Text style={styles.bottomTextBold}>
              {isRecording ? "Arrêter" : "Enregistrer"}
            </Text> */}
          {/* </LinearGradient> */} 
        </TouchableOpacity>

        {/* Paramètres */}
        <TouchableOpacity style={styles.bottomItem}>
          <View style={styles.sideCircle}>
            <Ionicons name="settings-sharp" size={24} color="#fff" />
          </View>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  center: { flex: 1, justifyContent: "center", alignItems: "center", gap: 12 },

  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  btn: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  btnText: {
    color: COLORS.white,
  },

  timerText: {
    color: COLORS.textDark,
    fontSize: 16,
    fontWeight: "bold",
  },
  redDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.orange,
  },
  recordIcon: {
    width: 48,
    height: 48,
    resizeMode: "contain",
  },

  /* Contenu */
  content: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  camera: {
    position: "absolute",
    top: 15,
    left: 15,
    width: 150,
    height: 300,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#2563EB",
    backgroundColor: COLORS.pill,
    overflow: "hidden",
    zIndex: 10,
    elevation: 10,
  },
  times: {
    position: "absolute",
    top: 15,
    right: 15,
    padding: 5,
    borderRadius: 10,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: COLORS.pill,
  },

  /* Graphique */
  chart: {
    position: "absolute",
    bottom: 170,
    left: 0,
    right: 0,
    height: 130,
    justifyContent: "center",
    backgroundColor: "#f8f8f90f",
  },
  chartLine: {
    height: 3,
    marginHorizontal: 15,
    backgroundColor: COLORS.orange,
  },

  /* Barre du bas */
  bottomBar: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 140,
    paddingVertical : 80,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#ffff",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 12,
  },
  bottomItem: {
    alignItems: "center",
    gap: 6,
    marginBottom: 14,
  },
  bottomText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "500",
  },
  bottomTextBold: {
    color: "white",
    fontSize: 12,
    fontWeight: "bold",
  },
  recordWrapper: {
    alignItems: "center",
  },
  recordButton: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  sideCircle: {
    width: 52,
    height: 52,
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#3B3A8C",
  },
  recordRing: {
    width: 96,
    height: 96,
    borderRadius: 48,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#7C55FF",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 14,
    elevation: 10,
  },
  recordLabel: {
    marginTop: 4,
    paddingVertical: 6,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  spark: {
    position: "absolute",
    width: 3,
    height: 12,
    borderRadius: 2,
    backgroundColor: COLORS.orange,
  },
  bottomGlow: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 110,
  },
});
