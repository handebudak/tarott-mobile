import React, { useMemo, useCallback, memo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from 'react-native';
import { Card, CardGridProps } from '../types';
import { CARD_BACK_IMAGE } from '../constants/cards';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 100) / 8;
const CARD_ASPECT_RATIO = 0.667;

const CardItem = memo(({ 
  card, 
  index, 
  isSelected, 
  isReversed, 
  onPress 
}: {
  card: Card;
  index: number;
  isSelected: boolean;
  isReversed: boolean;
  onPress: () => void;
}) => (
  <TouchableOpacity
    style={[
      styles.cardContainer,
      isSelected && styles.selectedCard,
    ]}
    onPress={onPress}
    activeOpacity={0.8}
  >
    <Image
      source={CARD_BACK_IMAGE}
      style={[
        styles.cardImage,
        isReversed && styles.reversedCard,
      ]}
      resizeMode="cover"
      fadeDuration={0}
      defaultSource={CARD_BACK_IMAGE}
    />
    
    {isSelected && (
      <View style={styles.selectionOverlay}>
        <Text style={styles.selectionText}>✓</Text>
      </View>
    )}
  </TouchableOpacity>
));

export const CardGrid: React.FC<CardGridProps> = memo(({
  cards,
  selectedCards,
  onCardSelect,
  loadingCards,
  cardOrientations,
  onScrollToCards,
}) => {
  if (loadingCards) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f59e0b" />
        <Text style={styles.loadingText}>Kartlar yükleniyor...</Text>
      </View>
    );
  }

  const isCardSelected = useCallback((index: number) => {
    return selectedCards.includes(index);
  }, [selectedCards]);

  const isCardReversed = useCallback((index: number) => {
    return cardOrientations[index] || false;
  }, [cardOrientations]);

  const handleCardPress = useCallback((index: number) => {
    onCardSelect(index, onScrollToCards);
  }, [onCardSelect, onScrollToCards]);

  const memoizedCards = useMemo(() => cards, [cards]);

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      removeClippedSubviews={true}
      scrollEventThrottle={16}
    >
      <Text style={styles.title}>Tarot Kartlarını Seçin</Text>
      <Text style={styles.subtitle}>
        Sezgilerinize güvenerek size en uygun kartları seçin
      </Text>

      <View style={styles.grid}>
        {memoizedCards.map((card, index) => (
          <CardItem
            key={`${card.name}-${index}`}
            card={card}
            index={index}
            isSelected={isCardSelected(index)}
            isReversed={isCardReversed(index)}
            onPress={() => handleCardPress(index)}
          />
        ))}
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
    padding: 12,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  loadingText: {
    color: '#ffffff',
    fontSize: 16,
    marginTop: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: '#e5e7eb',
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 22,
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 8,
  },
  cardContainer: {
    width: CARD_SIZE,
    height: CARD_SIZE / CARD_ASPECT_RATIO,
    borderRadius: 8,
    overflow: 'hidden',
    backgroundColor: '#2a2a2a',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
    marginBottom: 3,
  },
  selectedCard: {
    borderColor: '#f59e0b',
    borderWidth: 3,
    shadowColor: '#f59e0b',
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 8,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    borderRadius: 8,
  },
  reversedCard: {
    transform: [{ rotate: '180deg' }],
  },
  selectionOverlay: {
    position: 'absolute',
    top: 4,
    right: 4,
    backgroundColor: '#f59e0b',
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1,
  },
  selectionText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardInfo: {
    padding: 8,
    alignItems: 'center',
  },
  cardName: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 14,
  },
  reversedText: {
    color: '#f59e0b',
    fontSize: 10,
    fontWeight: 'bold',
    marginTop: 2,
  },
  infoContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    alignItems: 'center',
  },
  infoText: {
    color: '#e5e7eb',
    fontSize: 14,
    marginBottom: 4,
  },
}); 