import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TextInput } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

export default function AddScreen() {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <Text>ADD YOUR JOB</Text>
      <View style={styles.inputContainer}>
        <Image source={require("../img/Frame.png")} style={styles.icon} />
        <TextInput
          style={styles.input}
          placeholder="Input your job"
          placeholderTextColor="#999"
        />
      </View>
      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate("List")}>
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
