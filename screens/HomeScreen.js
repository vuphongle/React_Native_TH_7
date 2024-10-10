import React from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Image source={require("../img/Image 95.png")} style={styles.mainImage} />
      <Text style={styles.title}>MANAGE YOUR TASK</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../img/Frame.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Enter your name"
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress = {() => navigation.navigate('List')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 20, // Thêm padding nếu cần
  },
  mainImage: {
    width: 300,
    height: 300,
    resizeMode: "cover", // Giúp ảnh không bị méo khi thay đổi kích thước
  },
  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 20,
    textAlign: "center", // Căn giữa văn bản
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5, // Thêm padding dọc để tăng kích thước container
    marginTop: 20,
    borderRadius: 5, // Thêm bo góc nếu muốn
    width: "100%", // Đảm bảo inputContainer chiếm toàn bộ chiều ngang có sẵn
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
    resizeMode: "contain",
  },
  input: {
    flex: 1,
    height: 40,
    paddingVertical: 0,
    fontSize: 16,
    color: "#000",
  },
  button: {
    backgroundColor: "#43bed8",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});
