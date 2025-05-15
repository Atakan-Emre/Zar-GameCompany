export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  cityId: string;
}

export const quizData: QuizQuestion[] = [
  {
    id: 'rome_1',
    question: 'Roma\'nın simgesi olan antik amfi tiyatronun adı nedir?',
    options: ['Kolezyum', 'Pantheon', 'Roma Forumu', 'Trevi Çeşmesi'],
    correctAnswer: 0,
    cityId: 'rome',
  },
  {
    id: 'rome_2',
    question: 'Roma\'da bulunan en küçük bağımsız devlet hangisidir?',
    options: ['Vatikan', 'San Marino', 'Monako', 'Liechtenstein'],
    correctAnswer: 0,
    cityId: 'rome',
  },
  {
    id: 'paris_1',
    question: 'Paris\'in simgesi olan demir kule hangisidir?',
    options: ['Eyfel Kulesi', 'Montparnasse Kulesi', 'Tour Saint-Jacques', 'Tour Montparnasse'],
    correctAnswer: 0,
    cityId: 'paris',
  },
  {
    id: 'paris_2',
    question: 'Paris\'te bulunan dünyanın en büyük sanat müzesi hangisidir?',
    options: ['Louvre Müzesi', 'Orsay Müzesi', 'Pompidou Merkezi', 'Grand Palais'],
    correctAnswer: 0,
    cityId: 'paris',
  },
  {
    id: 'istanbul_1',
    question: 'İstanbul\'da bulunan, hem kilise hem cami olarak kullanılmış tarihi yapı hangisidir?',
    options: ['Ayasofya', 'Sultanahmet Camii', 'Süleymaniye Camii', 'Yeni Camii'],
    correctAnswer: 0,
    cityId: 'istanbul',
  },
  {
    id: 'istanbul_2',
    question: 'İstanbul\'u Avrupa ve Asya kıtalarına bağlayan boğazın adı nedir?',
    options: ['İstanbul Boğazı', 'Çanakkale Boğazı', 'Marmara Boğazı', 'Karadeniz Boğazı'],
    correctAnswer: 0,
    cityId: 'istanbul',
  },
  {
    id: 'tokyo_1',
    question: 'Tokyo\'nun en eski ve en ünlü Budist tapınağı hangisidir?',
    options: ['Senso-ji Tapınağı', 'Meiji Tapınağı', 'Asakusa Tapınağı', 'Shiba Tapınağı'],
    correctAnswer: 0,
    cityId: 'tokyo',
  },
  {
    id: 'tokyo_2',
    question: 'Tokyo\'nun simgesi olan, Eyfel Kulesi\'nden esinlenerek yapılan kule hangisidir?',
    options: ['Tokyo Kulesi', 'Tokyo Skytree', 'Roppongi Hills Mori Tower', 'Shinjuku Park Tower'],
    correctAnswer: 0,
    cityId: 'tokyo',
  },
  {
    id: 'newyork_1',
    question: 'New York limanında bulunan, Fransa\'nın ABD\'ye hediye ettiği heykel hangisidir?',
    options: ['Özgürlük Heykeli', 'Washington Anıtı', 'Lincoln Anıtı', 'Jefferson Anıtı'],
    correctAnswer: 0,
    cityId: 'newyork',
  },
  {
    id: 'newyork_2',
    question: 'New York\'un en ünlü meydanı, dev ekranları ve reklam panolarıyla tanınan yer neresidir?',
    options: ['Times Square', 'Central Park', 'Rockefeller Center', 'Union Square'],
    correctAnswer: 0,
    cityId: 'newyork',
  },
];