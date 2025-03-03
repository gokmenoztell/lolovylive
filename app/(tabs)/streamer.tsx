import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera";
import { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { Video, ResizeMode } from "expo-av";
import { useNavigation } from "@react-navigation/native";

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
  const navigation = useNavigation();
  const [currentCommentIndex, setCurrentCommentIndex] = useState(0);
  const [facing, setFacing] = useState<CameraType>("front");
  const [permission, requestPermission] = useCameraPermissions();
  const [liked, setLiked] = useState(false);
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);
  const [viewers, setViewers] = useState(1);
  const [fadeAnim] = useState(new Animated.Value(1)); // Initial opacity value
  const [comments, setComments] = useState([
    {
      id: "1",
      user: "ibrahimkunut",
      text: "Abi Efsane yayın ya Mükemmel",
      image: require("../dataFile/images/chatuser.png"),
    },
    {
      id: "2",
      user: "elmasyaren",
      text: "Selamlar Lolovy'de bunu görmek süper",
      image: require("../dataFile/images/chatuser2.png"),
    },
    {
      id: "3",
      user: "senaozturk",
      text: "Lolovy'den mükemmel bir özellik daha",
      image: require("../dataFile/images/chatuser3.png"),
    },
    {
      id: "4",
      user: "elsaelsa",
      text: "Kameranın açısı çok iyi, ortam da baya güzelmiş.",
      image: require("../dataFile/images/chatuser4.png"),
    },
    {
      id: "5",
      user: "profile",
      text: "Müzik çok iyi, playlist paylaşır mısın?",
      image: require("../dataFile/images/chatuser5.png"),
    },
    {
      id: "6",
      user: "profiles",
      text: "Ben bu yayına abone oldum, bildirimleri açtım, destekliyorum!",
      image: require("../dataFile/images/chatuser6.png"),
    },
    {
      id: "7",
      user: "profiles",
      text: "Senin sayende günümüz güzelleşiyor, kral!",
      image: require("../dataFile/images/chatuser7.png"),
    },
    {
      id: "8",
      user: "profiles",
      text: "Burada kaç kişi var? Kaç izleyici olduk?",
      image: require("../dataFile/images/chatuser8.png"),
    },
    {
      id: "9",
      user: "ibrahimkunut",
      text: "Abi Efsane yayın ya Mükemmel",
      image: require("../dataFile/images/chatuser.png"),
    },
    {
      id: "10",
      user: "elmasyaren",
      text: "Selamlar Lolovy'de bunu görmek süper",
      image: require("../dataFile/images/chatuser2.png"),
    },
    {
      id: "11",
      user: "senaozturk",
      text: "Lolovy'den mükemmel bir özellik daha",
      image: require("../dataFile/images/chatuser3.png"),
    },
    {
      id: "12",
      user: "elsaelsa",
      text: "Kameranın açısı çok iyi, ortam da baya güzelmiş.",
      image: require("../dataFile/images/chatuser4.png"),
    },
    {
      id: "13",
      user: "ibrahimkunut",
      text: "Abi Efsane yayın ya Mükemmel",
      image: require("../dataFile/images/chatuser.png"),
    },
    {
      id: "14",
      user: "elmasyaren",
      text: "Selamlar Lolovy'de bunu görmek süper",
      image: require("../dataFile/images/chatuser2.png"),
    },
    {
      id: "15",
      user: "senaozturk",
      text: "Lolovy'den mükemmel bir özellik daha",
      image: require("../dataFile/images/chatuser3.png"),
    },
    {
      id: "16",
      user: "elsaelsa",
      text: "Kameranın açısı çok iyi, ortam da baya güzelmiş.",
      image: require("../dataFile/images/chatuser4.png"),
    },
    {
      id: "17",
      user: "profile",
      text: "Müzik çok iyi, playlist paylaşır mısın?",
      image: require("../dataFile/images/chatuser5.png"),
    },
  ]);

  const [visibleComments, setVisibleComments] = useState([comments[0]]);
  const [latestCommenter, setLatestCommenter] = useState(comments[0].user);

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
      setViewers((prevViewers) => {
        if (prevViewers >= 100) {
          return prevViewers + Math.floor(Math.random() * 11) + 22; // 22-32 arasında artış
        }
        return prevViewers + Math.floor(Math.random() * 6) + 7; // 7-12 arasında artış
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisibleComments((prevVisibleComments) => {
        if (currentCommentIndex >= comments.length) return prevVisibleComments; // Eğer tüm yorumlar eklendiyse, dur

        const newComment = comments[currentCommentIndex];

        // Eğer yorum zaten görünüyorsa, tekrar ekleme
        if (prevVisibleComments.some((comment) => comment.id === newComment.id)) {
          return prevVisibleComments;
        }

        setLatestCommenter(newComment.user); // Update latest commenter
        return [newComment, ...prevVisibleComments].slice(0, 4); // En fazla 4 yorum göster
      });

      setCurrentCommentIndex((prevIndex) => prevIndex + 1); // Burada index'i artır
    }, 2000); // Interval duration reduced to 2000ms

    return () => clearInterval(interval);
  }, [currentCommentIndex]);

  useEffect(() => {
    // Preload images
    comments.forEach(comment => {
      if (typeof comment.image === 'number') {
        Image.prefetch(Image.resolveAssetSource(comment.image).uri);
      }
    });
  }, [comments]);

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

  function handleClose() {
    setVisibleComments([comments[0]]);
    setCurrentCommentIndex(0);
    setViewers(1);
    navigation.goBack();
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

                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={handleClose}
                >
                  <SvgXml xml={closeIconXml} width={24} height={24} />
                </TouchableOpacity>
              </View>
            </View>

            {/* FOOTER */}

            <View
              style={[
                styles.footerContainer,
                isKeyboardVisible && { bottom: 0 },
                { backgroundColor: "transparent" },
              ]}
            >
              <Image
                source={require("../dataFile/images/kalps.gif")}
                style={{
                  width: 400,
                  height: 600,
                  position: "absolute",
                  left: 35,
                  bottom: 70,
                  resizeMode: "cover",
                  zIndex: 99
                }}
              />
              <FlatList
                data={visibleComments}
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
              <View
                style={{
                  paddingHorizontal: horizontalScale(18),
                 
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <View
                  style={{
                    backgroundColor: "rgba(255, 255, 255, 0.12)",
                    borderRadius: 4,
                    gap: 10,
                    padding: 4,
                  }}
                >
                  <SvgXml
                    xml={heartIconXml}
                    width={28}
                    height={28}
                    fill={liked ? "red" : "transparent"}
                  />
                </View>
                <Text
                  style={{
                    color: "white",
                    fontSize: 14,
                    fontFamily: "Poppins-Medium",
                    marginLeft: 8,
                  }}
                >
                  {latestCommenter} katıldı
                </Text>
              </View>
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
