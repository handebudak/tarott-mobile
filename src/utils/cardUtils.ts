import { Card } from '../types';
import { CARD_IMAGE_MAPPING, CARD_BACK_IMAGE } from '../constants/cards';

export const shuffleArray = <T>(array: T[]): T[] => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const getCardImage = (card: Card) => {
  if (!card) return CARD_BACK_IMAGE;
  
  const cardImage = CARD_IMAGE_MAPPING[card.name];
  return cardImage || CARD_BACK_IMAGE;
};

export const mapApiImageToPublicPath = (card: Card) => {
  if (!card) return CARD_BACK_IMAGE;
  
  return getCardImage(card);
};

export const getCardName = (cardIndex: number, cards: Card[]) => {
  if (cards.length === 0) return `Kart ${cardIndex + 1}`;
  
  const card = cards[cardIndex];
  if (!card) return `Kart ${cardIndex + 1}`;
  
  return card.name;
};

export const getCardNameWithTranslation = (cardIndex: number, cards: Card[]) => {
  if (cards.length === 0) return "Kart";
  
  const card = cards[cardIndex];
  if (!card) return "Kart";
  
  const englishName = card.name;
  const turkishName = card.turkish_name || getTurkishCardName(englishName);
  
  return `${englishName} (${turkishName})`;
};

export const getTurkishCardName = (englishName: string) => {
  const translations: { [key: string]: string } = {
    // Major Arcana
    "The Fool": "Deli",
    "The Magician": "Büyücü",
    "The High Priestess": "Başrahibe",
    "The Empress": "İmparatoriçe",
    "The Emperor": "İmparator",
    "The Hierophant": "Başrahip",
    "The Lovers": "Aşıklar",
    "The Chariot": "Savaş Arabası",
    "Strength": "Güç",
    "The Hermit": "Münzevi",
    "Wheel of Fortune": "Şans Çarkı",
    "Justice": "Adalet",
    "The Hanged Man": "Asılı Adam",
    "Death": "Ölüm",
    "Temperance": "Ölçülülük",
    "The Devil": "Şeytan",
    "The Tower": "Kule",
    "The Star": "Yıldız",
    "The Moon": "Ay",
    "The Sun": "Güneş",
    "Judgement": "Yargı",
    "The World": "Dünya",
    
    // Minor Arcana - Swords
    "Ace of Swords": "Kılıçlar Ası",
    "Two of Swords": "Kılıçlar İkili",
    "Three of Swords": "Kılıçlar Üçlü",
    "Four of Swords": "Kılıçlar Dörtlü",
    "Five of Swords": "Kılıçlar Beşli",
    "Six of Swords": "Kılıçlar Altılı",
    "Seven of Swords": "Kılıçlar Yedili",
    "Eight of Swords": "Kılıçlar Sekizli",
    "Nine of Swords": "Kılıçlar Dokuzlu",
    "Ten of Swords": "Kılıçlar Onlu",
    "Page of Swords": "Kılıçlar Uşak",
    "Knight of Swords": "Kılıçlar Şövalye",
    "Queen of Swords": "Kılıçlar Kraliçe",
    "King of Swords": "Kılıçlar Kral",
    
    // Minor Arcana - Cups
    "Ace of Cups": "Kupa Ası",
    "Two of Cups": "Kupa İkili",
    "Three of Cups": "Kupa Üçlü",
    "Four of Cups": "Kupa Dörtlü",
    "Five of Cups": "Kupa Beşli",
    "Six of Cups": "Kupa Altılı",
    "Seven of Cups": "Kupa Yedili",
    "Eight of Cups": "Kupa Sekizli",
    "Nine of Cups": "Kupa Dokuzlu",
    "Ten of Cups": "Kupa Onlu",
    "Page of Cups": "Kupa Uşak",
    "Knight of Cups": "Kupa Şövalye",
    "Queen of Cups": "Kupa Kraliçe",
    "King of Cups": "Kupa Kral",
    
    // Minor Arcana - Pentacles
    "Ace of Pentacles": "Para Ası",
    "Two of Pentacles": "Para İkili",
    "Three of Pentacles": "Para Üçlü",
    "Four of Pentacles": "Para Dörtlü",
    "Five of Pentacles": "Para Beşli",
    "Six of Pentacles": "Para Altılı",
    "Seven of Pentacles": "Para Yedili",
    "Eight of Pentacles": "Para Sekizli",
    "Nine of Pentacles": "Para Dokuzlu",
    "Ten of Pentacles": "Para Onlu",
    "Page of Pentacles": "Para Uşak",
    "Knight of Pentacles": "Para Şövalye",
    "Queen of Pentacles": "Para Kraliçe",
    "King of Pentacles": "Para Kral",
    
    // Minor Arcana - Wands
    "Ace of Wands": "Değnek Ası",
    "Two of Wands": "Değnek İkili",
    "Three of Wands": "Değnek Üçlü",
    "Four of Wands": "Değnek Dörtlü",
    "Five of Wands": "Değnek Beşli",
    "Six of Wands": "Değnek Altılı",
    "Seven of Wands": "Değnek Yedili",
    "Eight of Wands": "Değnek Sekizli",
    "Nine of Wands": "Değnek Dokuzlu",
    "Ten of Wands": "Değnek Onlu",
    "Page of Wands": "Değnek Uşak",
    "Knight of Wands": "Değnek Şövalye",
    "Queen of Wands": "Değnek Kraliçe",
    "King of Wands": "Değnek Kral"
  };
  
  return translations[englishName] || englishName;
};

export const getSelectedCardMeaning = (cardIndex: number, cards: Card[], cardOrientations: boolean[]): string => {
  if (cards.length === 0) return "";
  
  const card = cards[cardIndex];
  if (!card) return "";
  
  const isReversed = cardOrientations[cardIndex] || false;
  
  return isReversed ? card.meaning_reversed : card.meaning_upright;
};

export const getCardPosition = (index: number) => {
  const positions = ["Geçmiş", "Şimdi", "Gelecek"];
  return positions[index] || "Bilinmeyen";
};

export const getCardOrientationText = (isReversed: boolean) => {
  return isReversed ? "Ters" : "Düz";
};

export const getCardCategory = (card: Card) => {
  return card.suit || "Bilinmeyen";
};

export const getCardKeywords = (card: Card) => {
  return card.keywords || [];
};

export const getCardDetailedMeaning = (card: Card) => {
  return card.detailed_meaning || "";
};

export const getCardAdvice = (card: Card) => {
  return card.advice || "";
};

export const getCardSymbolism = (card: Card) => {
  return card.symbolism || "";
}; 