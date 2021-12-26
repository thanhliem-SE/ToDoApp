import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../config/colors";
import AsyncStorage from "@react-native-async-storage/async-storage"

function ToDoScreen(props) {

  const [textInput, setTextInput] = React.useState('')

  const [todos, setTodos] = React.useState([]);

  // React.useEffect(() => {
  //   getTodosFromUserDevice();
  // }, []);

  // React.useEffect(() => {
  //   saveTodoTouserDevice();
  // }, [todos]);

  const addTodo = () => {
    if (textInput == '') {
      Alert.alert('Error', 'Please input todo');
    } else {
      const newTodo = {
        id: Math.random(),
        task: textInput,
        completed: false,
      }
      setTodos([...todos, newTodo]);
      setTextInput('');
    }
  };

  const markTodoComplete = (todoId) => {
    const newTodos = todos.map(item => {
      if (item.id === todoId) {
        return { ...item, completed: true };
      }
      return item;
    });
    setTodos(newTodos);;
  }

  const deleteTodo = (todoId) => {
    const newTodos = todos.filter(item => item.id != todoId);
    setTodos(newTodos);
  }

  const ListItem = ({ todo }) => {
    return (
      <View style={styles.listItem}>
        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontWeight: "bold",
              fontSize: 15,
              color: colors.primary,
              textDecorationLine: todo?.completed ? "line-through" : "none",
            }}
          >
            {todo?.task}
          </Text>
        </View>
        {!todo?.completed && (
          <TouchableOpacity style={styles.actionIcon} onPress={() => markTodoComplete(todo?.id)}>
            <Icon name="done" size={20} color={colors.white}></Icon>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={(styles.actionIcon, { backgroundColor: "red" })}
        >
          <Icon name="delete" size={20} color={colors.white} onPress={() => deleteTodo(todo?.id)}></Icon>
        </TouchableOpacity>
      </View>
    );
  };

  const clearTodo = () => {
    Alert.alert("Confirm", "Clear todos?", [
      { text: "Yes", onPress: () => setTodos([]) },
      { text: "No" }
    ])
  }

  const saveTodoTouserDevice = async (todos) => {
    try {
      const stringifyTodos = JSON.stringify(todos)
      await AsyncStorage.setItem('todos', stringifyTodos)
    } catch (e) {
      // saving error
      console.log(e);
    };
  };

  const getTodosFromUserDevice = async () => {
    try {
      const todos = await AsyncStorage.getItem('todos');
      if (todos != null) {
        setTodos(JSON.parse(todos));
      }
    } catch (error) {
      console.log(error);
    };
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>TODO APP</Text>
        <Icon name="delete" size={25} color="red" onPress={() => clearTodo()} />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput
            placeholder="Add Todo on"
            value={textInput}
            onChangeText={text => setTextInput(text)}
          />
        </View>
        <TouchableOpacity onPress={addTodo}>
          <View style={styles.iconContainer}>
            <Icon name="add" color={colors.white} size={30} />
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: colors.white,
    flex: 1,
  },
  header: {
    padding: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    fontWeight: "bold",
    fontSize: 20,
    color: colors.primary,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    color: colors.white,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  inputContainer: {
    backgroundColor: colors.white,
    elevation: 40,
    flex: 1,
    height: 50,
    marginVertical: 20,
    marginRight: 20,
    borderRadius: 30,
    paddingHorizontal: 20,
  },
  iconContainer: {
    height: 50,
    width: 50,
    backgroundColor: colors.primary,
    borderRadius: 25,
    elevation: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  listItem: {
    padding: 20,
    backgroundColor: colors.white,
    flexDirection: "row",
    elevation: 12,
    borderRadius: 7,
    marginVertical: 10,
  },
  actionIcon: {
    height: 25,
    width: 25,
    backgroundColor: "green",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 5,
    borderRadius: 3,
  },
});

export default ToDoScreen;
