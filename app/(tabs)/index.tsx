import { useRouter } from "expo-router";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

export default function Index() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Canlı Yayın Modu</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => router.push("/streamer")}
      >
        <Text style={styles.buttonText}>Yayıncı Modu</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.button, styles.viewerButton]}
        onPress={() => router.push("/viewer")}
      >
        <Text style={styles.buttonText2}>İzleyici Modu</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#ffe6f2", // Açık pembe arka plan
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ff007f", // Pembe renk
    marginBottom: 30,
  },
  button: {
    backgroundColor: "#ff007f", // Pembe buton
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 5,
  },
  viewerButton: {
    backgroundColor: "#fff", // İzleyici butonu beyaz
    borderWidth: 2,
    borderColor: "#ff007f",
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  buttonText2: {
    color: "#ff007f",
    fontSize: 18,
    fontWeight: "bold",
  },
});
