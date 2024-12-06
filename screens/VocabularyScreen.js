import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform } from "react-native";

const VocabularyScreen = ({ navigation }) => {
  const [topic, setTopic] = useState("");

  const handleSearch = () => {
    if (topic.trim()) {
      navigation.navigate("VocabularyDetailScreen", { topicWord: topic.trim() });
    } else {
      alert("Please enter a topic!");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.innerContainer}>
        <Text style={styles.header}>Search Vocabulary Topic</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter a topic (e.g., nature, technology)"
          value={topic}
          onChangeText={setTopic}
          autoFocus={true}
        />
        <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
          <Text style={styles.searchButtonText}>Search</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default VocabularyScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    padding: 20,
  },
  innerContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
  },
  input: {
    height: 50,
    width: "100%",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#fff",
  },
  searchButton: {
    padding: 15,
    borderRadius: 8,
    backgroundColor: "#007BFF",
    alignItems: "center",
  },
  searchButtonText: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
});
