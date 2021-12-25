import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import colors from "../config/colors";

function MainScreen(props) {
  const [todos, setTodos] = React.useState([
    { id: 1, task: "First todo", completed: true },
    { id: 2, task: "Second todo", completed: true },
  ]);

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
          <TouchableOpacity style={styles.actionIcon}>
            <Icon name="done" size={20} color={colors.white}></Icon>
          </TouchableOpacity>
        )}
        <TouchableOpacity
          style={(styles.actionIcon, { backgroundColor: "red" })}
        >
          <Icon name="delete" size={20} color={colors.white}></Icon>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.background}>
      <View style={styles.header}>
        <Text style={styles.title}>TODO APP</Text>
        <Icon name="delete" size={25} color="red" />
      </View>
      <FlatList
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ padding: 20, paddingBottom: 100 }}
        data={todos}
        renderItem={({ item }) => <ListItem todo={item} />}
      />
      <View style={styles.footer}>
        <View style={styles.inputContainer}>
          <TextInput placeholder="Add Todo" />
        </View>
        <TouchableOpacity>
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
    fontsize: 20,
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

export default MainScreen;
