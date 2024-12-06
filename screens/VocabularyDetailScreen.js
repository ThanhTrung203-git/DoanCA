import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Linking, ActivityIndicator, ScrollView } from "react-native";
import { Audio } from "expo-av";
import axios from "axios";

const VocabularyDetailScreen = ({ route }) => {
  const { topicWord } = route.params || {};
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  if (!topicWord) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No topic provided.</Text>
      </View>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://api.dictionaryapi.dev/api/v2/entries/en/${topicWord}`
        );
        setData(response.data[0]); // Lấy phần tử đầu tiên
      } catch (error) {
        console.error("Error fetching data:", error);
        setData(null);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [topicWord]);

  const playAudio = async (audioUrl) => {
    try {
      const { sound } = await Audio.Sound.createAsync({ uri: audioUrl });
      await sound.playAsync();
    } catch (error) {
      console.error("Error playing audio:", error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#007BFF" />
        <Text style={styles.loadingText}>Loading vocabulary details...</Text>
      </View>
    );
  }

  if (!data) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>No vocabulary data available.</Text>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.word}>{data.word}</Text>
        <Text style={styles.phonetic}>{data.phonetic}</Text>
      </View>

      {/* Phonetics Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Phonetics</Text>
        {data.phonetics.map((phonetic, index) => (
          <View key={index} style={styles.phoneticItem}>
            <Text style={styles.phoneticText}>{phonetic.text}</Text>
            {phonetic.audio && (
              <TouchableOpacity onPress={() => playAudio(phonetic.audio)}>
                <Text style={styles.playButton}>🔊 Play</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}
      </View>

      {/* Meanings Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Meanings</Text>
        {data.meanings.map((meaning, index) => (
          <View key={index} style={styles.meaningItem}>
            <Text style={styles.partOfSpeech}>{meaning.partOfSpeech}</Text>
            {meaning.definitions.map((definition, idx) => (
              <Text key={idx} style={styles.definition}>
                - {definition.definition}
              </Text>
            ))}
          </View>
        ))}
      </View>

      {/* Synonyms Section */}
      {data.meanings.some((m) => m.synonyms.length > 0) && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Synonyms</Text>
          <FlatList
            data={data.meanings.flatMap((m) => m.synonyms)}
            renderItem={({ item }) => <Text style={styles.synonym}>{item}</Text>}
            keyExtractor={(item, index) => index.toString()}
            horizontal
          />
        </View>
      )}

      {/* Source and License Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Source</Text>
        {data.sourceUrls.map((url, index) => (
          <Text
            key={index}
            style={styles.sourceLink}
            onPress={() => Linking.openURL(url)}
          >
            {url}
          </Text>
        ))}
        <Text style={styles.license}>
          License: {data.license?.name || "N/A"}
        </Text>
      </View>
    </ScrollView>
  );
};

export default VocabularyDetailScreen;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#fff" },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 20, // Optional, adds spacing at the bottom when content is small
    paddingHorizontal: 20
  },
  header: { alignItems: "center", marginBottom: 20 },
  word: { fontSize: 28, fontWeight: "bold" },
  phonetic: { fontSize: 18, color: "#555" },
  section: { marginBottom: 20 },
  sectionTitle: { fontSize: 22, fontWeight: "bold", marginBottom: 10 },
  phoneticItem: { flexDirection: "row", alignItems: "center", marginBottom: 5 },
  phoneticText: { fontSize: 16, marginRight: 10 },
  playButton: { color: "#007BFF" },
  meaningItem: { marginBottom: 15 },
  partOfSpeech: { fontSize: 18, fontWeight: "bold", color: "#333" },
  definition: { fontSize: 16, color: "#555", marginLeft: 10 },
  synonym: { fontSize: 16, color: "#007BFF", marginHorizontal: 5 },
  sourceLink: { color: "#007BFF", textDecorationLine: "underline" },
  license: { fontSize: 14, color: "#555" },
  errorText: { fontSize: 18, color: "red", textAlign: "center" },
  loadingText: { marginTop: 10, fontSize: 16, color: "#555", textAlign: "center" },
});
