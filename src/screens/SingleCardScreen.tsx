import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  Dimensions,
} from 'react-native';
import { Header } from '../components/Header';
import { CardGrid } from '../components/CardGrid';
import { SelectedCardDisplay } from '../components/SelectedCardDisplay';
import { FormSection } from '../components/FormSection';
import { ReadingResult } from '../components/ReadingResult';
import { Modal } from '../components/Modal';
import { useTarotReading } from '../hooks/useTarotReading';
import { TAROTT_BACKGROUND } from '../constants/cards';

const { width, height } = Dimensions.get('window');

export const SingleCardScreen: React.FC = () => {
  const scrollViewRef = useRef<ScrollView>(null);
  
  const {
    name,
    setName,
    question,
    setQuestion,
    selectedCards,
    cards,
    loadingCards,
    isLoading,
    reading,
    cardOrientations,
    enableReversedState,
    modalConfig,
    setModalConfig,
    
    handleCardSelect,
    handleRandomSelect,
    handleSubmit,
    handleResetPage,
    setEnableReversed,
  } = useTarotReading({ enableReversed: true, type: 'single' });

  const handleScrollToCards = () => {
    scrollViewRef.current?.scrollTo({ y: 1600, animated: true });
  };

  useEffect(() => {
    if (selectedCards.length > 0) {
      scrollViewRef.current?.scrollTo({ y: 1600, animated: true });
    }
  }, [selectedCards]);

  const handleScrollToTop = () => {
    scrollViewRef.current?.scrollTo({ y: 0, animated: true });
  };

  const handleModalClose = () => {
    setModalConfig({ ...modalConfig, isOpen: false });
  };

  return (
    <View style={styles.container}>
      <Image 
        source={TAROTT_BACKGROUND} 
        style={styles.backgroundImage}
        resizeMode="cover"
      />
      
      <View style={styles.overlay} />

      <Header title="Tek Kart Falı" />

      <ScrollView 
        ref={scrollViewRef}
        style={styles.content}
        showsVerticalScrollIndicator={false}
        removeClippedSubviews={true}
        scrollEventThrottle={16}
      >
        {reading ? (
          <ReadingResult
            reading={reading}
            isLoading={isLoading}
            onReset={handleResetPage}
          />
        ) : (
          <>
            <View style={styles.section}>
              <FormSection
                name={name}
                setName={setName}
                question={question}
                setQuestion={setQuestion}
                isLoading={isLoading}
                selectedCards={selectedCards}
                type="single"
                onRandomSelect={() => handleRandomSelect(handleScrollToCards)}
                enableReversed={enableReversedState}
                setEnableReversed={setEnableReversed}
              />
            </View>

            <View style={styles.section}>
              <CardGrid
                cards={cards}
                selectedCards={selectedCards}
                onCardSelect={handleCardSelect}
                loadingCards={loadingCards}
                cardOrientations={cardOrientations}
                onScrollToCards={handleScrollToCards}
              />
            </View>

            {selectedCards.length > 0 && (
              <View style={styles.section}>
                <SelectedCardDisplay
                  selectedCards={selectedCards}
                  cards={cards}
                  cardOrientations={cardOrientations}
                  type="single"
                  onReadingSubmit={() => handleSubmit(handleScrollToTop)}
                  isLoading={isLoading}
                />
              </View>
            )}
          </>
        )}
      </ScrollView>

      <Modal config={modalConfig} onClose={handleModalClose} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  backgroundImage: {
    position: 'absolute',
    width: width,
    height: height,
    top: 0,
    left: 0,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },
  content: {
    flex: 1,
  },
  section: {
    marginBottom: 20,
  },
}); 