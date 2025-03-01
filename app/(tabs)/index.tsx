import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Video, ResizeMode } from "expo-av";

import {
  Animated,
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  TextInput,
  Share,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  Keyboard,
  FlatList,
} from "react-native";
import { Ionicons, Feather } from "@expo/vector-icons";
import { SvgXml } from "react-native-svg";
import { useFonts } from "expo-font";
import { styles } from "../dataFile/styles/styles";
import {
  cameraIconXml,
  galleryIconXml,
  emojisIconXml,
  microphoneIconXml,
  returnIconXml,
  shareIconXml,
  heartIconXml,
  userIconXml,
  closeIconXml,
} from "../dataFile/iconImport/icons.import";
import { horizontalScale, verticalScale } from "../dataFile/mixins";

export default function App() {
  const [fontsLoaded] = useFonts({
    "Poppins-SemiBold": require("../dataFile/fonts/Poppins-SemiBold.ttf"),
  });

  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [liked, setLiked] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [viewers, setViewers] = useState(269);
  const [comments, setComments] = useState([
    {
      id: "1",
      user: "ibrahimkunut",
      text: "Abi Efsane yayın ya Mükemmel",
      image: require("../dataFile/images/chatuser3.png"),
    },
    {
      id: "2",
      user: "elmasyaren",
      text: "Selamlar Lolovy'de bunu görmek süper",
      image: require("../dataFile/images/chatuser.png"),
    },
    {
      id: "3",
      user: "elsaelsa",
      text: "Lolovy'den mükemmel bir özellik daha",
      image: require("../dataFile/images/chatuser4.jpg"),
    },
    {
      id: "4",
      user: "elsaelsa",
      text: "ALOOOOOOO",
      image: require("../dataFile/images/chatuser4.jpg"),
    },
  ]);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setViewers(
        (prevViewers) => prevViewers + Math.floor(Math.random() * 10) - 2
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setComments((prevComments) => {
        const newComments = [...prevComments];
        const shiftedComment = newComments.shift();
        if (shiftedComment) {
          newComments.push(shiftedComment);
        }
        return newComments;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"));
  }

  function handleLike() {
    setLiked(!liked);
  }

  async function handleShare() {
    try {
      await Share.share({
        message: "Canlı yayını izlemek için Lolovy'ye katıl!",
      });
    } catch (error) {
      console.error("Paylaşım hatası:", error);
    }
  }

  return (
    <CameraView style={styles.camera} facing={facing}>
      <KeyboardAvoidingView
        style={styles.keyboardAvoidingView}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0} // Ensure the offset is set correctly
      >
        <SafeAreaView style={styles.containers}>
          <View style={styles.container}>
            {/* HEADER */}
            <View style={styles.header}>
              <View style={styles.userInfo}>
                <Image source={require("../dataFile/images/Avatar.png")} />
                <Text style={styles.username}>lolovy</Text>
              </View>
              <View
                style={{
                  flexDirection: "row",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <View style={styles.liveCount}>
                  <SvgXml xml={userIconXml} width={14} height={14} />
                  <Text style={styles.viewers}>{viewers}</Text>
                </View>
                <View>
                  <LinearGradient
                    style={styles.liveScreening}
                    colors={["rgba(255, 64, 96, 1)", "rgba(255, 24, 104, 1)"]}
                    start={{ x: 0, y: 0.5 }}
                    end={{ x: 1, y: 0.5 }}
                  >
                    <Text style={styles.liveText}>CANLI</Text>
                  </LinearGradient>
                </View>

                <TouchableOpacity style={styles.closeButton}>
                  <SvgXml xml={closeIconXml} width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>

            {/* FOOTER */}

            <View
              style={[
                styles.footerContainer,
                isKeyboardVisible && { bottom: 0 },
                { backgroundColor: 'transparent' } 
              ]}
            >
              <Image
                source={require("../dataFile/images/kalps.gif")}
                style={{ width: 400, height: 600, position: 'absolute', left: 35, bottom: 70,  resizeMode: 'cover', }}
              />
              <FlatList
                data={comments}
                keyExtractor={(item) => item.id}
                style={{ paddingHorizontal: horizontalScale(18) }}
                renderItem={({ item }) => (
                  <View style={styles.commentUser}>
                    <View style={{ flexDirection: "row" }}>
                      <Image
                        source={item.image}
                        style={{ width: 34, height: 34, borderRadius: 50 }}
                      />
                      <View
                        style={{ flexDirection: "column", paddingLeft: 10 }}
                      >
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            letterSpacing: 0,
                            lineHeight: 14.4,
                            fontFamily: "Poppins-Medium",
                          }}
                        >
                          {item.user}
                        </Text>
                        <Text
                          style={{
                            color: "white",
                            fontSize: 12,
                            letterSpacing: 0,
                            lineHeight: 19.2,
                            fontFamily: "Poppins-Medium",
                          }}
                        >
                          {item.text}
                        </Text>
                      </View>
                    </View>
                  </View>
                )}
                inverted
              />
              <View style={{ paddingHorizontal: horizontalScale(18) }}></View>
              <View style={styles.footerButtons}>
                <TouchableOpacity style={styles.footerBtn}>
                  <SvgXml xml={galleryIconXml} width={24} height={24} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerBtn}>
                  <SvgXml xml={microphoneIconXml} width={24} height={24} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerBtn}>
                  <SvgXml xml={cameraIconXml} width={24} height={24} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.footerBtn}
                  onPress={toggleCameraFacing}
                >
                  <SvgXml xml={returnIconXml} width={24} height={24} />
                </TouchableOpacity>

                <TouchableOpacity style={styles.footerBtn}>
                  <SvgXml xml={emojisIconXml} width={24} height={24} />
                </TouchableOpacity>
              </View>
              <View
                style={[
                  styles.footer,
                  isKeyboardVisible
                    ? {
                        backgroundColor: "rgba(23, 23, 23, 1)",
                        paddingVertical: verticalScale(18),
                      }
                    : { backgroundColor: "transparent" },
                ]}
              >
                <View style={styles.InputContainer}>
                  <TextInput
                    placeholder="Yorum yap"
                    placeholderTextColor="rgba(172, 180, 195, 1)"
                    style={[styles.input, { color: "white" }]}
                    onFocus={() => setKeyboardVisible(true)}
                    onBlur={() => setKeyboardVisible(false)}
                  />
                </View>
                <View style={{ flexDirection: "row" }}>
                  <TouchableOpacity
                    onPress={handleShare}
                    style={{ paddingHorizontal: horizontalScale(14) }}
                  >
                    <SvgXml xml={shareIconXml} width={28} height={28} />
                  </TouchableOpacity>

                  <TouchableOpacity onPress={handleLike}>
                    <SvgXml
                      xml={heartIconXml}
                      width={28}
                      height={28}
                      fill={liked ? "red" : "transparent"}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </KeyboardAvoidingView>
    </CameraView>
  );
}
