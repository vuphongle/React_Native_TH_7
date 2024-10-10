import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Sử dụng các icon từ thư viện
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function ListScreen() {
  const navigation = useNavigation(); 
  const [tasks, setTasks] = useState([]);

  const API_URL = "https://6707f41d8e86a8d9e42d968b.mockapi.io/TH7";

  const fetchTasks = async (url) => {
    try {
      const response = await axios.get(url);
      setTasks(response.data);
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks(API_URL);
    }, [])
  );

  // Hàm xóa task
  const deleteTask = (id) => {
    Alert.alert(
      "Xác nhận xóa",
      "Bạn có chắc chắn muốn xóa task này?",
      [
        { text: "Hủy", style: "cancel" },
        {
          text: "Xóa",
          style: "destructive",
          onPress: async () => {
            try {
              await axios.delete(`${API_URL}/${id}`)
              setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
            } catch (error) {
              Alert.alert("Lỗi", "Xảy ra lỗi khi xóa!");
              console.error(error);
            }
          }
        },
      ],
      { cancelable: true }
    );
  };

  const editTask = (task) => {
    // Điều hướng đến màn hình sửa task với dữ liệu task
    navigation.navigate("EditTask", { task });
  };

  const addTask = () => {
    navigation.navigate("Add");
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Hello Name</Text>
      <FlatList
        data={tasks}
        renderItem={({ item }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item.title}</Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => editTask(item)}
              >
                <MaterialIcons name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteTask(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="#F44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
      />
      <TouchableOpacity style={styles.addButton} onPress={addTask}>
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f2f2f2",
    paddingHorizontal: 20,
    paddingTop: 20,
    position: "relative",
  },
  title: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    marginBottom: 20,
    textAlign: "center",
  },
  listContent: {
    // marginBottom: 150,
  },
  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowOpacity: 0.1,
    shadowRadius: 5,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  task: {
    fontSize: 18,
    color: "#555",
    flex: 1,
  },
  actionButtons: {
    flexDirection: "row",
    marginLeft: 10,
  },
  actionButton: {
    marginLeft: 15,
  },
  addButton: {
    position: "absolute",
    bottom: 30, // Đặt cách đáy màn hình 30 đơn vị
    left: "50%", // Đặt nút ở giữa theo chiều ngang
    transform: [{ translateX: -30 }], // Dịch chuyển nút lên nửa chiều rộng để căn giữa hoàn hảo
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
