import React, { useMemo, useCallback, memo } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { SelectedCardDisplayProps, ReadingType } from '../types';
import { CARD_BACK_IMAGE, CARD_IMAGE_MAPPING } from '../constants/cards';
import { getCardPosition, getCardOrientationText } from '../utils/cardUtils';

const { width } = Dimensions.get('window');
const CARD_SIZE = (width - 120) / 3;
const CARD_ASPECT_RATIO = 0.5;

export const SelectedCardDisplay: React.FC<SelectedCardDisplayProps> = memo(({
  selectedCards,
  cards,
  cardOrientations,
  type,
  onReadingSubmit,
  isLoading,
}) => {
  if (selectedCards.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyText}>
          {type === 'single' 
            ? 'Lütfen bir kart seçin' 
            : 'Lütfen üç kart seçin'
          }
        </Text>
      </View>
    );
  }

  const getCardImage = useCallback((cardIndex: number) => {
    if (cards.length === 0 || !cards[cardIndex]) return CARD_BACK_IMAGE;
    
    const card = cards[cardIndex];
    const cardImage = CARD_IMAGE_MAPPING[card.name];
    return cardImage || CARD_BACK_IMAGE;
  }, [cards]);

  const isCardReversed = useCallback((cardIndex: number) => {
    return cardOrientations[cardIndex] || false;
  }, [cardOrientations]);

  const getCardMeaning = useCallback((cardIndex: number) => {
    if (cards.length === 0 || !cards[cardIndex]) return '';
    
    const card = cards[cardIndex];
    const isReversed = isCardReversed(cardIndex);
    
    return isReversed ? card.meaning_reversed : card.meaning_upright;
  }, [cards, isCardReversed]);

  const getCardKeywords = useCallback((cardIndex: number) => {
    if (cards.length === 0 || !cards[cardIndex]) return [];
    
    const card = cards[cardIndex];
    return card.keywords || [];
  }, [cards]);

  const getCardDetailedMeaning = useCallback((cardIndex: number) => {
    if (cards.length === 0 || !cards[cardIndex]) return '';
    
    const card = cards[cardIndex];
    const isReversed = isCardReversed(cardIndex);
    
    return isReversed ? card.meaning_reversed : card.detailed_meaning;
  }, [cards, isCardReversed]);

  const getCardAdvice = useCallback((cardIndex: number) => {
    if (cards.length === 0 || !cards[cardIndex]) return '';
    
    const card = cards[cardIndex];
    return card.advice || '';
  }, [cards]);

  const getCardSymbolism = useCallback((cardIndex: number) => {
    if (cards.length === 0 || !cards[cardIndex]) return '';
    
    const card = cards[cardIndex];
    return card.symbolism || '';
  }, [cards]);

  return (
    <ScrollView 
      style={styles.container}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.scrollContent}
      removeClippedSubviews={true}
      scrollEventThrottle={16}
    >
      <Text style={styles.title}>
        {type === 'single' ? 'Seçilen Kart' : 'Seçilen Kartlar'}
      </Text>

      <View style={styles.cardsContainer}>
        {selectedCards.map((cardIndex, index) => {
          const card = cards[cardIndex];
          if (!card) return null;

          return (
            <View key={`selected-${cardIndex}`} style={styles.cardWrapper}>
              <View style={styles.cardContainer}>
                <Image
                  source={getCardImage(cardIndex)}
                  style={[
                    styles.cardImage,
                    isCardReversed(cardIndex) && styles.reversedCard,
                  ]}
                  resizeMode="cover"
                  fadeDuration={0}
                  defaultSource={CARD_BACK_IMAGE}
                />
              </View>

              <View style={styles.cardInfo}>
                <Text style={styles.cardName}>
                  {card.turkish_name}
                </Text>
                
                {type === 'three' && (
                  <Text style={styles.positionText}>
                    {getCardPosition(index)}
                  </Text>
                )}

                <Text style={styles.orientationText}>
                  {getCardOrientationText(isCardReversed(cardIndex))}
                </Text>

                <View style={styles.keywordsContainer}>
                  <Text style={styles.keywordsTitle}>Anahtar Kelimeler:</Text>
                  <View style={styles.keywordsList}>
                    {getCardKeywords(cardIndex).map((keyword, idx) => (
                      <Text key={idx} style={styles.keyword}>
                        • {keyword}
                      </Text>
                    ))}
                  </View>
                </View>

                <View style={styles.detailContainer}>
                  <Text style={styles.detailTitle}>
                    {isCardReversed(cardIndex) ? 'Ters Anlamı:' : 'Detaylı Anlam:'}
                  </Text>
                  <Text style={styles.detailText}>
                    {getCardDetailedMeaning(cardIndex)}
                  </Text>
                </View>

                {getCardAdvice(cardIndex) && (
                  <View style={styles.adviceContainer}>
                    <Text style={styles.adviceTitle}>Tavsiye:</Text>
                    <Text style={styles.adviceText}>
                      {getCardAdvice(cardIndex)}
                    </Text>
                  </View>
                )}

                {getCardSymbolism(cardIndex) && (
                  <View style={styles.symbolismContainer}>
                    <Text style={styles.symbolismTitle}>Sembolizm:</Text>
                    <Text style={styles.symbolismText}>
                      {getCardSymbolism(cardIndex)}
                    </Text>
                  </View>
                )}
              </View>
            </View>
          );
        })}
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
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  emptyText: {
    color: '#e5e7eb',
    fontSize: 16,
    textAlign: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
    textAlign: 'center',
    marginBottom: 24,
  },
  cardsContainer: {
    gap: 20,
  },
  cardWrapper: {
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    borderRadius: 16,
    padding: 24,
    borderWidth: 2,
    borderColor: 'rgba(245, 158, 11, 0.7)',
    marginBottom: 20,
  },
  cardContainer: {
    alignItems: 'center',
    marginBottom: 12,
    position: 'relative',
  },
  cardImage: {
    width: CARD_SIZE,
    height: CARD_SIZE / CARD_ASPECT_RATIO,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  reversedCard: {
    transform: [{ rotate: '180deg' }],
  },
  reversedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#ef4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  reversedBadgeText: {
    color: '#ffffff',
    fontSize: 10,
    fontWeight: 'bold',
  },
  cardInfo: {
    alignItems: 'center',
    marginTop: 12,
  },
  cardName: {
    color: '#f59e0b',
    fontSize: 22,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  positionText: {
    color: '#f59e0b',
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 4,
  },
  orientationText: {
    color: '#e5e7eb',
    fontSize: 12,
    marginBottom: 8,
  },
  meaningText: {
    color: '#ffffff',
    fontSize: 18,
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
  },
  summaryContainer: {
    marginTop: 24,
    padding: 16,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(245, 158, 11, 0.2)',
  },
  summaryTitle: {
    color: '#f59e0b',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  summaryText: {
    color: '#e5e7eb',
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 4,
  },
  keywordsContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  keywordsTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  keywordsList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  keyword: {
    color: '#e5e7eb',
    fontSize: 14,
    backgroundColor: 'rgba(245, 158, 11, 0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginBottom: 4,
  },
  detailContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  detailTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  detailText: {
    color: '#e5e7eb',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  adviceContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  adviceTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  adviceText: {
    color: '#e5e7eb',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  symbolismContainer: {
    marginTop: 16,
    marginBottom: 16,
  },
  symbolismTitle: {
    color: '#f59e0b',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  symbolismText: {
    color: '#e5e7eb',
    fontSize: 14,
    lineHeight: 20,
    textAlign: 'justify',
  },
  submitContainer: {
    marginTop: 24,
    paddingHorizontal: 16,
  },
  submitButton: {
    backgroundColor: '#f59e0b',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#f59e0b',
  },
  submitButtonDisabled: {
    backgroundColor: '#6b7280',
    borderColor: '#6b7280',
  },
  submitButtonText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 