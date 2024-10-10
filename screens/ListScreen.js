import React, { useCallback, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import { FlatList } from "react-native-gesture-handler";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Sử dụng các icon từ thư viện
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import axios from "axios";

export default function ListScreen() {
  const navigation = useNavigation(); 
  const [tasks, setTasks] = useState([]);
  
  // Trạng thái cho chỉnh sửa
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editedTitle, setEditedTitle] = useState("");

  const API_URL = "https://6707f41d8e86a8d9e42d968b.mockapi.io/TH7";

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      setTasks(response.data);
    } catch (error) {
      Alert.alert("Error", "Something went wrong!");
      console.error(error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      fetchTasks();
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
              await axios.delete(`${API_URL}/${id}`);
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

  // Hàm bắt đầu chỉnh sửa task
  const startEditing = (task) => {
    setEditingTaskId(task.id);
    setEditedTitle(task.title);
  };

  // Hàm hủy chỉnh sửa
  const cancelEditing = () => {
    setEditingTaskId(null);
    setEditedTitle("");
  };

  // Hàm lưu chỉnh sửa task
  const saveEditing = async (task) => {
    if (editedTitle.trim() === "") {
      Alert.alert("Lỗi", "Tên công việc không được để trống!");
      return;
    }

    try {
      await axios.put(`${API_URL}/${task.id}`, { title: editedTitle });
      setTasks((prevTasks) =>
        prevTasks.map((t) =>
          t.id === task.id ? { ...t, title: editedTitle } : t
        )
      );
      setEditingTaskId(null);
      setEditedTitle("");
    } catch (error) {
      Alert.alert("Lỗi", "Cập nhật công việc thất bại!");
      console.error(error);
    }
  };

  const addTask = () => {
    navigation.navigate("Add");
  };

  const renderItem = ({ item }) => {
    const isEditing = item.id === editingTaskId;
    return (
      <View style={styles.taskContainer}>
        {isEditing ? (
          <TextInput
            style={styles.input}
            value={editedTitle}
            onChangeText={setEditedTitle}
            onSubmitEditing={() => saveEditing(item)}
            returnKeyType="done"
          />
        ) : (
          <Text style={styles.task}>{item.title}</Text>
        )}
        <View style={styles.actionButtons}>
          {isEditing ? (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => saveEditing(item)}
              >
                <Ionicons name="save-outline" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={cancelEditing}
              >
                <Ionicons name="close-outline" size={24} color="#F44336" />
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => startEditing(item)}
              >
                <MaterialIcons name="edit" size={24} color="#4CAF50" />
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.actionButton}
                onPress={() => deleteTask(item.id)}
              >
                <Ionicons name="trash-outline" size={24} color="#F44336" />
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Danh Sách Công Việc</Text>
      <FlatList
        data={tasks}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        ListEmptyComponent={<Text style={styles.emptyText}>Không có công việc nào.</Text>}
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
    paddingBottom: 100, 
  },
  taskContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  task: {
    fontSize: 18,
    color: "#555",
    flex: 1,
  },
  input: {
    flex: 1,
    fontSize: 18,
    color: "#555",
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "#4CAF50",
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
    bottom: 30, 
    left: "50%",
    transform: [{ translateX: -30 }], 
    backgroundColor: "#4CAF50",
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  emptyText: {
    textAlign: "center",
    color: "#999",
    marginTop: 50,
    fontSize: 16,
  },
});
