export interface Landmark {
  name: string;
  description: string;
  imageUrl: string;
  arModelUrl?: string;
  facts: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
}

export interface City {
  id: string;
  name: string;
  country: string;
  description: string;
  imageUrl: string;
  arModelUrl?: string;
  facts: string[];
  coordinates: {
    latitude: number;
    longitude: number;
  };
  landmark: Landmark;
}

export const cities: City[] = [
  { 
    id: 'istanbul', 
    name: 'İstanbul', 
    country: 'Türkiye',
    description: 'İstanbul, Türkiye\'nin en büyük şehri ve kültürel merkezidir.',
    imageUrl: 'https://example.com/istanbul.jpg',
    arModelUrl: 'models/istanbul.glb',
    facts: [
      'İstanbul, iki kıtayı birbirine bağlayan tek şehirdir.',
      'Ayasofya, dünyanın en eski katedrallerinden biridir.',
      'Topkapı Sarayı, Osmanlı İmparatorluğu\'nun 400 yıl boyunca yönetim merkeziydi.',
    ],
    coordinates: {
      latitude: 41.0082,
      longitude: 28.9784,
    },
    landmark: {
      name: 'Ayasofya',
      description: 'Ayasofya, İstanbul\'da bulunan tarihi bir yapıdır.',
      imageUrl: 'https://example.com/ayasofya.jpg',
      arModelUrl: 'models/ayasofya.glb',
      facts: [
        '532-537 yılları arasında inşa edilmiştir.',
        'Dünyanın en eski katedrallerinden biridir.',
        '1453\'te camiye dönüştürülmüştür.',
        '1935\'te müzeye çevrilmiştir.',
        '2020\'de tekrar cami statüsüne kavuşmuştur.',
      ],
      coordinates: {
        latitude: 41.0086,
        longitude: 28.9802,
      },
    }
  },
  { 
    id: 'paris', 
    name: 'Paris', 
    country: 'Fransa',
    description: 'Paris, Fransa\'nın başkenti ve en büyük şehridir.',
    imageUrl: 'https://example.com/paris.jpg',
    arModelUrl: 'models/paris.glb',
    facts: [
      'Paris, dünyanın en çok ziyaret edilen şehirlerinden biridir.',
      'Eyfel Kulesi, Paris\'in en ünlü simgelerinden biridir.',
      'Paris, İtalya\'daki Viyana ve İspanya\'daki Madrid arasındaki en uzun hükümet arasındadır.',
    ],
    coordinates: {
      latitude: 48.8566,
      longitude: 2.3522,
    },
    landmark: {
      name: 'Eyfel Kulesi',
      description: 'Eyfel Kulesi, Paris\'in en ünlü simgesidir.',
      imageUrl: 'https://example.com/eiffel.jpg',
      arModelUrl: 'models/eiffel.glb',
      facts: [
        '1889 yılında inşa edilmiştir.',
        '324 metre yüksekliğindedir.',
        'Gustave Eiffel tarafından tasarlanmıştır.',
        'Dünyanın en çok ziyaret edilen ücretli anıtıdır.',
      ],
      coordinates: {
        latitude: 48.8584,
        longitude: 2.2945,
      },
    }
  },
  { 
    id: 'newyork', 
    name: 'New York', 
    country: 'ABD',
    description: 'New York, ABD\'nin en büyük şehridir ve dünyanın en önemli finansal, ticari ve kültürel merkezlerinden biridir.',
    imageUrl: 'https://example.com/newyork.jpg',
    arModelUrl: 'models/newyork.glb',
    facts: [
      'New York, dünyanın en büyük şehirlerinden biridir.',
      'Özgürlük Heykeli, Fransa tarafından ABD\'ye hediye edilmiştir.',
      '93 metre yüksekliğindedir.',
      'Dünyanın en ünlü heykellerinden biridir.',
    ],
    coordinates: {
      latitude: 40.7128,
      longitude: -74.0060,
    },
    landmark: {
      name: 'Özgürlük Heykeli',
      description: 'Özgürlük Heykeli, New York\'ta bulunan ünlü bir anıttır.',
      imageUrl: 'https://example.com/statue.jpg',
      arModelUrl: 'models/statue.glb',
      facts: [
        '1886 yılında açılmıştır.',
        'Fransa tarafından ABD\'ye hediye edilmiştir.',
        '93 metre yüksekliğindedir.',
        'Dünyanın en ünlü heykellerinden biridir.',
      ],
      coordinates: {
        latitude: 40.6892,
        longitude: -74.0445,
      },
    }
  },
  { 
    id: 'tokyo', 
    name: 'Tokyo', 
    country: 'Japonya',
    description: 'Tokyo, Japonya\'nın başkenti ve en büyük şehridir.',
    imageUrl: 'https://example.com/tokyo.jpg',
    arModelUrl: 'models/tokyo.glb',
    facts: [
      'Tokyo, dünyanın en büyük şehirlerinden biridir.',
      'Tokyo Kulesi, Japonya\'nın en ünlü simgelerinden biridir.',
      '333 metre yüksekliğindedir.',
      'Eyfel Kulesi\'nden esinlenerek tasarlanmıştır.'
    ],
    coordinates: {
      latitude: 35.6895,
      longitude: 139.6917,
    },
    landmark: {
      name: 'Tokyo Kulesi',
      description: 'Tokyo Kulesi, Japonya\'nın en ünlü simgelerinden biridir.',
      imageUrl: 'https://example.com/tokyo-tower.jpg',
      arModelUrl: 'models/tokyo-tower.glb',
      facts: [
        '1958 yılında inşa edilmiştir.',
        '333 metre yüksekliğindedir.',
        'Eyfel Kulesi\'nden esinlenerek tasarlanmıştır.',
        'Japonya\'nın en ünlü simgelerinden biridir.'
      ],
      coordinates: {
        latitude: 35.6586,
        longitude: 139.7454,
      }
    }
  },
  { 
    id: 'london', 
    name: 'Londra', 
    country: 'İngiltere',
    description: 'Londra, İngiltere\'nin başkenti ve en büyük şehridir.',
    imageUrl: 'https://example.com/london.jpg',
    arModelUrl: 'models/london.glb',
    facts: [
      'Londra, dünyanın en büyük şehirlerinden biridir.',
      'Big Ben, Londra\'nın en ünlü simgelerinden biridir.',
      '1859 yılında tamamlanmıştır.',
      '96 metre yüksekliğindedir.',
      'Dünyanın en ünlü saat kulesidir.',
      'Aslında Big Ben, kulenin çanının adıdır.'
    ],
    coordinates: {
      latitude: 51.5074,
      longitude: -0.1278,
    },
    landmark: {
      name: 'Big Ben',
      description: 'Big Ben, Londra\'nın en ünlü simgelerinden biridir.',
      imageUrl: 'https://example.com/bigben.jpg',
      arModelUrl: 'models/bigben.glb',
      facts: [
        '1859 yılında tamamlanmıştır.',
        '96 metre yüksekliğindedir.',
        'Dünyanın en ünlü saat kulesidir.',
        'Aslında Big Ben, kulenin çanının adıdır.'
      ],
      coordinates: {
        latitude: 51.5007,
        longitude: -0.1246,
      }
    }
  },
  { 
    id: 'rome', 
    name: 'Roma', 
    country: 'İtalya',
    description: 'Roma, İtalya\'nın başkenti ve en eski şehridir.',
    imageUrl: 'https://example.com/rome.jpg',
    arModelUrl: 'models/rome.glb',
    facts: [
      'Roma, dünyanın en eski şehirlerinden biridir.',
      'Kolezyum, Antik Roma\'nın en büyük amfitiyatrosudur.',
      'MS 80 yılında inşa edilmiştir.',
      '50.000 seyirci kapasitelidir.',
      'Dünyanın Yeni Yedi Harikası\'ndan biridir.'
    ],
    coordinates: {
      latitude: 41.9028,
      longitude: 12.4964,
    },
    landmark: {
      name: 'Kolezyum',
      description: 'Kolezyum, Antik Roma\'nın en büyük amfitiyatrosudur.',
      imageUrl: 'https://example.com/colosseum.jpg',
      arModelUrl: 'models/colosseum.glb',
      facts: [
        'MS 80 yılında inşa edilmiştir.',
        'Antik Roma\'nın en büyük amfitiyatrosudur.',
        '50.000 seyirci kapasitelidir.',
        'Dünyanın Yeni Yedi Harikası\'ndan biridir.'
      ],
      coordinates: {
        latitude: 41.8902,
        longitude: 12.4922,
      }
    }
  },
  { 
    id: 'dubai', 
    name: 'Dubai', 
    country: 'BAE',
    description: 'Dubai, Birleşik Arap Emirlikleri\'nde bulunan bir şehirdir.',
    imageUrl: 'https://example.com/dubai.jpg',
    arModelUrl: 'models/dubai.glb',
    facts: [
      'Dubai, dünyanın en yüksek binasıdır.',
      'Burj Khalifa, 2010 yılında tamamlanmıştır.',
      '828 metre yüksekliğiyle dünyanın en yüksek binasıdır.',
      '160 katlıdır.',
      'Yapımında 330.000 metreküp beton kullanılmıştır.'
    ],
    coordinates: {
      latitude: 25.276987,
      longitude: 55.296237,
    },
    landmark: {
      name: 'Burj Khalifa',
      description: 'Burj Khalifa, dünyanın en yüksek binasıdır.',
      imageUrl: 'https://example.com/burjkhalifa.jpg',
      arModelUrl: 'models/burjkhalifa.glb',
      facts: [
        '2010 yılında tamamlanmıştır.',
        '828 metre yüksekliğiyle dünyanın en yüksek binasıdır.',
        '160 katlıdır.',
        'Yapımında 330.000 metreküp beton kullanılmıştır.'
      ],
      coordinates: {
        latitude: 25.1972,
        longitude: 55.2744,
      }
    }
  },
  { 
    id: 'sydney', 
    name: 'Sidney', 
    country: 'Avustralya',
    description: 'Sidney, Avustralya\'nın en büyük şehridir ve başkenti New South Wales eyaletidir.',
    imageUrl: 'https://example.com/sydney.jpg',
    arModelUrl: 'models/sydney.glb',
    facts: [
      'Sidney, dünyanın en büyük şehirlerinden biridir.',
      'Sidney Opera Binası, Avustralya\'nın en önemli mimari eserlerinden biridir.',
      '1973 yılında tamamlanmıştır.',
      'Danimarkalı mimar Jørn Utzon tarafından tasarlanmıştır.',
      'UNESCO Dünya Mirası listesindedir.'
    ],
    coordinates: {
      latitude: -33.8688,
      longitude: 151.2153,
    },
    landmark: {
      name: 'Sidney Opera Binası',
      description: 'Sidney Opera Binası, Avustralya\'nın en önemli mimari eserlerinden biridir.',
      imageUrl: 'https://example.com/operahouse.jpg',
      arModelUrl: 'models/operahouse.glb',
      facts: [
        '1973 yılında tamamlanmıştır.',
        'Danimarkalı mimar Jørn Utzon tarafından tasarlanmıştır.',
        'UNESCO Dünya Mirası listesindedir.',
        'Modern mimarinin en önemli eserlerinden biridir.'
      ],
      coordinates: {
        latitude: -33.8568,
        longitude: 151.2153,
      }
    }
  },
  { 
    id: 'barcelona', 
    name: 'Barselona', 
    country: 'İspanya',
    description: 'Barselona, İspanya\'nın başkenti ve en büyük şehridir.',
    imageUrl: 'https://example.com/barcelona.jpg',
    arModelUrl: 'models/barcelona.glb',
    facts: [
      'Barselona, İspanya\'nın en büyük şehirlerinden biridir.',
      'Sagrada Familia, Antoni Gaudí tarafından tasarlanmıştır.',
      '1882 yılında inşasına başlanmıştır.',
      'Hala inşaatı devam etmektedir.',
      'UNESCO Dünya Mirası listesindedir.'
    ],
    coordinates: {
      latitude: 41.3851,
      longitude: 2.1734,
    },
    landmark: {
      name: 'Sagrada Familia',
      description: 'Sagrada Familia, Antoni Gaudí\'nin başyapıtıdır.',
      imageUrl: 'https://example.com/sagradafamilia.jpg',
      arModelUrl: 'models/sagradafamilia.glb',
      facts: [
        '1882 yılında inşasına başlanmıştır.',
        'Antoni Gaudí tarafından tasarlanmıştır.',
        'Hala inşaatı devam etmektedir.',
        'UNESCO Dünya Mirası listesindedir.'
      ],
      coordinates: {
        latitude: 41.4036,
        longitude: 2.1744,
      }
    }
  },
  { 
    id: 'amsterdam', 
    name: 'Amsterdam', 
    country: 'Hollanda',
    description: 'Amsterdam, Hollanda\'nın başkenti ve en büyük şehridir.',
    imageUrl: 'https://example.com/amsterdam.jpg',
    arModelUrl: 'models/amsterdam.glb',
    facts: [
      'Amsterdam, dünyanın en büyük şehirlerinden biridir.',
      'Rijksmuseum, Hollanda\'nın en büyük sanat müzesidir.',
      '1800 yılında kurulmuştur.',
      'Rembrandt\'ın Gece Devriyesi tablosuna ev sahipliği yapar.',
      'Yılda 2 milyondan fazla ziyaretçi ağırlar.'
    ],
    coordinates: {
      latitude: 52.3702,
      longitude: 4.8952,
    },
    landmark: {
      name: 'Rijksmuseum',
      description: 'Rijksmuseum, Hollanda\'nın en büyük sanat müzesidir.',
      imageUrl: 'https://example.com/rijksmuseum.jpg',
      arModelUrl: 'models/rijksmuseum.glb',
      facts: [
        '1800 yılında kurulmuştur.',
        'Hollanda\'nın en büyük sanat müzesidir.',
        'Rembrandt\'ın Gece Devriyesi tablosuna ev sahipliği yapar.',
        'Yılda 2 milyondan fazla ziyaretçi ağırlar.'
      ],
      coordinates: {
        latitude: 52.3600,
        longitude: 4.8852,
      }
    }
  }
]; 