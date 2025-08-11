import React, { memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import { ReadingResultProps } from '../types';

const { width } = Dimensions.get('window');

export const ReadingResult: React.FC<ReadingResultProps> = memo(({
  reading,
  isLoading,
  onReset,
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text style={styles.loadingText}>Falınız hazırlanıyor...</Text>
        <Text style={styles.loadingSubtext}>
          AI tarafından özel olarak hazırlanıyor
        </Text>
      </View>
    );
  }

  if (!reading) {
    return null;
  }

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      removeClippedSubviews={true}
      scrollEventThrottle={16}
    >
      <View style={styles.resultContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>🔮 Tarot Falınız</Text>
          <Text style={styles.subtitle}>
            AI tarafından özel olarak hazırlandı
          </Text>
        </View>

        <View style={styles.readingContainer}>
          <Text style={styles.readingText}>{reading}</Text>
        </View>

        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.resetButton}
            onPress={onReset}
            activeOpacity={0.7}
          >
            <Text style={styles.resetButtonText}>Yeni Fal Baktır</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  scrollContent: {
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
    marginTop: 16,
    textAlign: 'center',
  },
  loadingSubtext: {
    color: '#e5e7eb',
    fontSize: 14,
    marginTop: 8,
    textAlign: 'center',
  },
  resultContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 20,
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.3)',
  },
  header: {
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
  },
  readingContainer: {
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  readingText: {
    color: '#ffffff',
    fontSize: 16,
    lineHeight: 26,
    textAlign: 'justify',
  },

  actionContainer: {
    marginBottom: 24,
  },
  resetButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  resetButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: '600',
  },

}); 