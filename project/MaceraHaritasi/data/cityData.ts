export interface Landmark {
  name: string;
  description: string;
  modelUrl: string;
  imageUrl: string;
  facts: string[];
  audioNarration?: string; // URL to audio file
}

export interface City {
  id: string;
  name: string;
  country: string;
  continent: string;
  population: string;
  language: string;
  description: string;
  imageUrl: string;
  landmark: Landmark;
  difficulty: 'easy' | 'medium' | 'hard';
  ageRange: '8-10' | '10-12' | 'all';
}

export const cities: City[] = [
  // Existing cities...
  {
    id: 'rome',
    name: 'Roma',
    country: 'İtalya',
    continent: 'Avrupa',
    population: '4.3 milyon',
    language: 'İtalyanca',
    difficulty: 'medium',
    ageRange: 'all',
    description: "Roma, İtalya'nın başkenti ve en büyük şehridir. Antik Roma İmparatorluğu'nun merkezi olan şehir, tarihi yapıları ve sanat eserleriyle ünlüdür.",
    imageUrl: 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg',
    landmark: {
      name: 'Kolezyum',
      description: 'Kolezyum, Roma şehrinin merkezinde yer alan oval bir amfitiyatrodur. Traverten kireçtaşı, tüf ve tuğla yüzlü betondan inşa edilmiştir ve yapıldığı dönemde dünyanın en büyük amfitiyatrosuydu.',
      modelUrl: 'https://example.com/models/colosseum.glb',
      imageUrl: 'https://images.pexels.com/photos/753639/pexels-photo-753639.jpeg',
      facts: [
        'Kolezyum 50.000-80.000 seyirci kapasitesine sahipti',
        'İnşaatı İmparator Vespasian döneminde MS 72 yılında başladı',
        'Dünyanın en büyük antik amfitiyatrosudur',
        'Kolezyum gladyatör dövüşleri ve halka açık gösteriler için kullanılıyordu',
        'Günümüzde en popüler turistik yerlerden biridir'
      ]
    }
  },
  {
    id: 'beijing',
    name: 'Pekin',
    country: 'Çin',
    continent: 'Asya',
    population: '21.5 milyon',
    language: 'Mandarin',
    difficulty: 'medium',
    ageRange: 'all',
    description: "Pekin, Çin'in başkenti ve en büyük şehirlerinden biridir. 3 bin yıllık tarihe sahip olan şehir, hem modern mimarisi hem de antik yapıları ile tanınır.",
    imageUrl: 'https://images.pexels.com/photos/2846001/pexels-photo-2846001.jpeg',
    landmark: {
      name: 'Çin Seddi',
      description: 'Çin Seddi, eski Çin devletlerinin ve İmparatorluk Çin\'in tarihi kuzey sınırları boyunca inşa edilmiş bir dizi tahkimattan oluşur.',
      modelUrl: 'https://example.com/models/great_wall.glb',
      imageUrl: 'https://images.pexels.com/photos/2846001/pexels-photo-2846001.jpeg',
      facts: [
        'Çin Seddi 20.000 kilometre uzunluğundadır',
        'İnşaatı birçok hanedanlık döneminde gerçekleşmiştir',
        'Yaygın inanışın aksine, uzaydan görülemez',
        'Seddin bazı bölümleri 2.500 yıldan daha eskidir',
        'İnşaatı sırasında 1 milyondan fazla insan hayatını kaybetmiştir'
      ]
    }
  },
  {
    id: 'paris',
    name: 'Paris',
    country: 'Fransa',
    continent: 'Avrupa',
    population: '2.2 milyon',
    language: 'Fransızca',
    difficulty: 'easy',
    ageRange: 'all',
    description: "Paris, Fransa'nın başkenti ve en büyük şehridir. Moda, sanat ve kültürün merkezi olan şehir, romantik atmosferiyle ünlüdür.",
    imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
    landmark: {
      name: 'Eyfel Kulesi',
      description: 'Eyfel Kulesi, Paris\'teki Champ de Mars\'ta bulunan dövme demir kafes kuledir. Dünyanın en tanınmış simgelerinden biridir.',
      modelUrl: 'https://example.com/models/eiffel_tower.glb',
      imageUrl: 'https://images.pexels.com/photos/338515/pexels-photo-338515.jpeg',
      facts: [
        'Eyfel Kulesi 1889 yılında tamamlanmıştır',
        '324 metre (1.063 ft) yüksekliğindedir',
        '1889 Dünya Fuarı için inşa edilmiştir',
        'Kule geçici olarak tasarlanmıştı ve radyo anteni sayesinde kurtarılmıştır',
        'Dünyanın en çok ziyaret edilen ücretli anıtıdır'
      ]
    }
  },
  {
    id: 'istanbul',
    name: 'İstanbul',
    country: 'Türkiye',
    continent: 'Avrupa/Asya',
    population: '15.5 milyon',
    language: 'Türkçe',
    difficulty: 'medium',
    ageRange: 'all',
    description: "İstanbul, Türkiye'nin en büyük şehri ve kültürel merkezidir. Asya ve Avrupa kıtalarını birbirine bağlayan şehir, zengin tarihi ve kültürel mirasıyla ünlüdür.",
    imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
    landmark: {
      name: 'Ayasofya',
      description: 'Ayasofya, Yunan Ortodoks kilisesi, Osmanlı camisi ve şimdi müze olarak hizmet veren tarihi bir anıttır. Devasa kubbesi ve etkileyici Bizans mimarisiyle ünlüdür.',
      modelUrl: 'https://example.com/models/hagia_sophia.glb',
      imageUrl: 'https://images.pexels.com/photos/1770809/pexels-photo-1770809.jpeg',
      facts: [
        'MS 537\'de Justinian I döneminde inşa edilmiştir',
        'Kubbesi 55.6 metre yüksekliğinde ve 31.24 metre çapındadır',
        '916 yıl kilise ve 481 yıl cami olarak hizmet vermiştir',
        'Hem Bizans hem de Osmanlı mimarisini etkilemiştir',
        'Hristiyan ve İslami unsurların karışımını içerir'
      ]
    }
  },
  {
    id: 'tokyo',
    name: 'Tokyo',
    country: 'Japonya',
    continent: 'Asya',
    population: '37 milyon',
    language: 'Japonca',
    difficulty: 'hard',
    ageRange: 'all',
    description: "Tokyo, Japonya'nın başkenti ve en büyük şehridir. Modern teknoloji ve geleneksel kültürün bir arada yaşadığı metropol.",
    imageUrl: 'https://images.pexels.com/photos/34142/pexels-photo.jpg',
    landmark: {
      name: 'Senso-ji Tapınağı',
      description: 'Tokyo Skytree, Tokyo\'da bulunan bir yayın ve gözlem kulesidir. Dünyanın en yüksek kulesi ve Burj Khalifa\'dan sonra dünyanın en yüksek ikinci yapısıdır.',
      modelUrl: 'https://example.com/models/tokyo_skytree.glb',
      imageUrl: 'https://images.pexels.com/photos/34142/pexels-photo.jpg',
      facts: [
        '634 metre (2.080 ft) yüksekliğindedir',
        'İnşaatı 2012 yılında tamamlanmıştır',
        'Depreme dayanıklı özelliklere sahiptir',
        'Tasarımı geleneksel Japon estetiğinden esinlenmiştir',
        'Hem televizyon kulesi hem de turistik cazibe merkezi olarak hizmet vermektedir'
      ]
    }
  },
  {
    id: 'new-york',
    name: 'New York',
    country: 'ABD',
    continent: 'Kuzey Amerika',
    population: '8.4 milyon',
    language: 'İngilizce',
    difficulty: 'medium',
    ageRange: 'all',
    description: "New York şehri, Hudson Nehri'nin Atlantik Okyanusu ile buluştuğu yerde yer alan 5 ilçeden oluşur. Merkezinde Manhattan, dünyanın en önemli ticari, finansal ve kültürel merkezleri arasında yer alan yoğun nüfuslu bir ilçedir.",
    imageUrl: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
    landmark: {
      name: 'Özgürlük Heykeli',
      description: 'Özgürlük Heykeli, New York Limanı\'ndaki Liberty Adası\'nda bulunan devasa neoklasik bir heykeldir. Bakır heykel, Fransız halkının Amerika Birleşik Devletleri\'ne bir hediyesiydi.',
      modelUrl: 'https://example.com/models/statue_of_liberty.glb',
      imageUrl: 'https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg',
      facts: [
        'Heykel 28 Ekim 1886\'da açılmıştır',
        '93 metre (305 ft) yüksekliğindedir',
        'Yüz, heykeltıraşın annesinden modellenmiştir',
        'Taçtaki yedi dikenli çıkıntı, yedi kıtayı temsil eder',
        'Meşale aydınlanmayı simgeler'
      ]
    }
  },
  {
    id: 'dubai',
    name: 'Dubai',
    country: 'Birleşik Arap Emirlikleri',
    continent: 'Asya',
    population: '3.3 milyon',
    language: 'Arapça',
    difficulty: 'hard',
    ageRange: 'all',
    description: "Dubai, lüks alışveriş, ultra modern mimari ve canlı gece hayatıyla bilinen Birleşik Arap Emirlikleri\'nde bir şehir ve emirliktir.",
    imageUrl: 'https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg',
    landmark: {
      name: 'Burç Halife',
      description: 'Burç Halife, Dubai\'de bulunan ve dünyanın en yüksek binası olan bir gökdelendir. Çok amaçlı kullanıma sahip bir kuledir.',
      modelUrl: 'https://example.com/models/burj_khalifa.glb',
      imageUrl: 'https://images.pexels.com/photos/618079/pexels-photo-618079.jpeg',
      facts: [
        '828 metre (2.717 ft) yüksekliğindedir',
        'İnşaatı 2004\'te başlayıp 2009\'da tamamlanmıştır',
        '163 kata sahiptir',
        'Bina, BAE\'nin başkanının adını taşımaktadır',
        '95 kilometre uzaktan görülebilmektedir'
      ]
    }
  },
  {
    id: 'rio',
    name: 'Rio de Janeiro',
    country: 'Brezilya',
    continent: 'Güney Amerika',
    population: '6.7 milyon',
    language: 'Portekizce',
    difficulty: 'medium',
    ageRange: 'all',
    description: "Rio de Janeiro, Brezilya\'da bulunan büyük bir sahil şehridir. Copacabana ve Ipanema plajları, Corcovado Dağı üzerindeki Kurtarıcı İsa heykeli ve Şeker Loafu Dağı ile ünlüdür.",
    imageUrl: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg',
    landmark: {
      name: 'Kurtarıcı İsa Heykeli',
      description: 'Kurtarıcı İsa, Brezilya\'nın Rio de Janeiro şehrinde bulunan Art Deco tarzında bir İsa heykelidir. Dünyanın Yeni Yedi Harikası\'ndan biridir.',
      modelUrl: 'https://example.com/models/christ_the_redeemer.glb',
      imageUrl: 'https://images.pexels.com/photos/2868242/pexels-photo-2868242.jpeg',
      facts: [
        'Heykel 38 metre (125 ft) yüksekliğindedir',
        '1931 yılında tamamlanmıştır',
        'Betonarme ve sabun taşından yapılmıştır',
        '635 ton ağırlığındadır',
        'Yıllık yaklaşık 2 milyon ziyaretçi ağırlamaktadır'
      ]
    }
  },
  {
    id: 'sydney',
    name: 'Sidney',
    country: 'Avustralya',
    continent: 'Okyanusya',
    population: '5.3 milyon',
    language: 'İngilizce',
    difficulty: 'easy',
    ageRange: 'all',
    description: "Sidney, Yeni Güney Galler eyaletinin başkenti ve Avustralya\'nın en büyük şehirlerinden biridir. Yelken benzeri tasarımıyla dikkat çeken Sidney Opera Binası ile ünlüdür.",
    imageUrl: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
    landmark: {
      name: 'Sidney Opera Binası',
      description: 'Sidney Opera Binası, çok mekanlı bir gösteri sanatları merkezidir. 20. yüzyılın en belirgin ve ünlü binalarından biri ve dünyanın en ünlü gösteri mekanlarından biridir.',
      modelUrl: 'https://example.com/models/sydney_opera_house.glb',
      imageUrl: 'https://images.pexels.com/photos/1878293/pexels-photo-1878293.jpeg',
      facts: [
        '1973 yılında açılmıştır',
        'Bina Jorn Utzon tarafından tasarlanmıştır',
        '1 milyondan fazla çatı kiremidine sahiptir',
        'Her yıl 1.500\'den fazla performans sergilemektedir',
        '2007 yılında UNESCO Dünya Mirası Listesi\'ne eklenmiştir'
      ]
    }
  }
  // Add more cities here...
];

export const getCityById = (id: string): City | undefined => {
  return cities.find(city => city.id === id);
};

export const getCitiesByDifficulty = (difficulty: City['difficulty']): City[] => {
  return cities.filter(city => city.difficulty === difficulty);
};

export const getCitiesByAgeRange = (ageRange: City['ageRange']): City[] => {
  return cities.filter(city => ageRange === 'all' || city.ageRange === ageRange);
};