import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated } from 'react-native';

const FlatCard = ({ word, definition }) => {
  const [flipped, setFlipped] = useState(false);
  const rotation = useState(new Animated.Value(0))[0]; // Giá trị khởi tạo cho animation

  // Hàm xoay thẻ
  const flipCard = () => {
    Animated.timing(rotation, {
      toValue: flipped ? 0 : 1,
      duration: 300,
      useNativeDriver: true,
    }).start(() => setFlipped(!flipped));
  };

  // Interpolation để xoay mặt trước
  const frontInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  // Interpolation để xoay mặt sau
  const backInterpolate = rotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['180deg', '360deg'],
  });

  return (
    <View style={styles.cardContainer}>
      <TouchableOpacity onPress={flipCard} activeOpacity={0.9}>
        {/* Mặt trước */}
        <Animated.View style={[styles.card, { transform: [{ rotateY: frontInterpolate }] }]}>
          <Text style={styles.cardText}>{word ? word : 'No Word'}</Text>
        </Animated.View>
        {/* Mặt sau */}
        <Animated.View style={[styles.card, styles.cardBack, { transform: [{ rotateY: backInterpolate }] }]}>
          <Text style={styles.cardText}>{definition ? definition : 'No Definition'}</Text>
        </Animated.View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    height: 200,
    width: 200,
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  card: {
    width: 300,
    height: '100%',
    backgroundColor: '#0F469A',
    justifyContent: 'center',
    alignItems: 'center',
    backfaceVisibility: 'hidden',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  cardBack: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: 300,
    height: '100%',
    backgroundColor: '#E05254',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  cardText: {
    fontSize: 22,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default FlatCard;
