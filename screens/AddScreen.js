import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput, Alert } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useState } from "react";

export default function AddScreen() {
  const navigation = useNavigation();
  const [job, setJob] = useState("");

  const API_URL = "https://6707f41d8e86a8d9e42d968b.mockapi.io/TH7";
  
  const addTask = async() => {
    if (job.trim() === "") {
      Alert.alert("Lỗi", "Vui lòng nhập công việc của bạn!");
      return;
    }
    try {
      const response = await axios.post(API_URL, {title: job });
      alert("Thêm công việc thành công!");
      navigation.navigate("List");
    } catch (error) {
      alert("Có lỗi xảy ra khi thêm công việc!");
      console.error(error);
    }
  }
  return (
    <View style={styles.container}>
      <Text>ADD YOUR JOB</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../img/Frame.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Input your job"
          placeholderTextColor="#999"
          value = {job}
          onChangeText = {setJob}
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={addTask}>
        <Text style={styles.textButton}>FINISH</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
      <Image
        source={require("../img/Image 95.png")}
        style={styles.mainImage}
      />  
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-around",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
    borderRadius: 5,
    width: "80%",
  },
  icon: {
    width: 20,
    height: 20,
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    color: "#333",
  },
  button: {
    backgroundColor: "#4fc4da",
    padding: 10,
    borderRadius: 10,
    marginTop: 20,
    width: 150,
  },
  textButton: 
  {
    textAlign: "center",
    color: "#fff",
    fontSize: 16,
  },
});
