import React, { useState } from "react";
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
import { useNavigation } from "@react-navigation/native";

export default function ListScreen() {
  const navigation = useNavigation(); // Sử dụng hook để truy cập navigation
  const [tasks, setTasks] = useState([
    { id: "1", title: "Task 1" },
    { id: "2", title: "Task 2" },
    { id: "3", title: "Task 3" },
    { id: "4", title: "Task 4" },
    { id: "5", title: "Task 5" },
    { id: "6", title: "Task 6" },
    { id: "7", title: "Task 7" },
    { id: "8", title: "Task 8" },
    { id: "9", title: "Task 9" },
    { id: "10", title: "Task 10" },
    // Thêm nhiều task nếu cần
  ]);

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
          onPress: () => {
            setTasks((prevTasks) => prevTasks.filter((task) => task.id !== id));
          },
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
