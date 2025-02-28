import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "../mixins";

const styles = StyleSheet.create({
  containers: {
    flex: 1,
  },
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
    justifyContent: "space-between",
  },

  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  //headerimizin oldugu yer
  header: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(12),
    gap: 12,
  },
  // resim ve textin kapsayicisi burasidir
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  //avatar resiminin oldugu yer burasi
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  //lolovy yazan kullanici adinin oldugu yer burasidir
  username: {
    fontSize: 14,
    lineHeight: 16.8,
    color: "#FFFFFF",
    fontFamily: "Poppins-SemiBold",
    marginLeft: 12,
  },
  // siyah izleyen sayisi bunu g,steriyoruz burada
  liveCount: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0, 0, 0, 0.16)",
    paddingVertical: verticalScale(6),
    borderRadius: 4,
    paddingHorizontal: horizontalScale(8),
    gap: 4,
  },
  // canli yayin ekrani yazan yer burasi burasi pembe olan canli yazan yer
  liveScreening: {
    width: 66,
    height: 29,
    borderRadius: 4,
    paddingVertical: verticalScale(6),
    paddingHorizontal: horizontalScale(12),
    marginHorizontal: horizontalScale(12),
  },
  // canli yazan text burasi
  liveText: {
    color: "white",
    lineHeight: 16.8,
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
  },

  //canli yayin 'zleme sayisinini icindeki 269 yazdigi yer burasidir
  viewers: {
    color: "rgba(255, 255, 255, 1)",
    fontFamily: "Poppins-SemiBold",
    fontSize: 14,
    lineHeight: 16.8,
    letterSpacing: 0,
    marginRight: 6,
  },

  closeButton: {
    padding: 8,
    gap: 10,
    width: 40,
    height: 40,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    borderRadius: 50,
  },
  // footer buttonlar ive inputlarin kapsayicisi en dis div
  footerContainer: {
    position: "absolute",
    width: "100%",
    bottom: verticalScale(18),
  },
  // buttonlarin
  footerButtons: {
    flexDirection: "row",
    marginHorizontal: horizontalScale(77.5),
    justifyContent: "center",
    paddingVertical: verticalScale(18),
  },
  footer: {
    alignItems: "center",
    flexDirection: "row",
    paddingHorizontal: horizontalScale(18),
    backgroundColor: "rgba(23, 23, 23, 1)",
  },
  // 5 adet bulunan touchableopacity buttonlar
  footerBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.16)",
    width: 38,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: horizontalScale(12),
    borderRadius: 50,
    padding: 8,
    gap: 10,
  },
  //burasi yazi yazilan inputun dis kapsayicisi
  InputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    height: 41,
    paddingHorizontal: 14,
    backgroundColor: "rgba(255,255,255,0.12)",
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
    flex: 1,
  },
  //yazi yazdigim ic input
  input: {
    flex: 1,
    fontFamily: "Poppins-Medium",
    lineHeight: 16.8,
    letterSpacing: 0,
    fontSize: 14,
    width: "100%",
    textAlign: "left",
    height: 17,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
});

export { styles };
