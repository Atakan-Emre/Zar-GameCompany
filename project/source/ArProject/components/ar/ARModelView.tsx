import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, Dimensions, ActivityIndicator, Platform } from 'react-native';
import { ViroARSceneNavigator, ViroARScene, Viro3DObject, ViroMaterials, ViroAmbientLight, ViroSpotLight } from '@viro-community/react-viro';
import { COLORS, SIZES, SPACING } from '@/constants/theme';

const { width: SCREEN_WIDTH, height: SCREEN_HEIGHT } = Dimensions.get('window');

interface ARModelViewProps {
  modelUrl: string;
  scale?: [number, number, number];
  position?: [number, number, number];
  onLoadEnd?: () => void;
}

// Web platformunda ViroMaterials kullanımını kontrol et ve hata yakalama
const safeCreateMaterials = (materials: any) => {
  if (Platform.OS === 'web') {
    console.log('Web platformunda AR desteklenmez');
    return false;
  }

  try {
    if (!ViroMaterials) {
      console.error('ViroMaterials tanımlı değil');
      return false;
    }

    if (typeof ViroMaterials.createMaterials !== 'function') {
      console.error('ViroMaterials.createMaterials bir fonksiyon değil');
      return false;
    }

    ViroMaterials.createMaterials(materials);
    return true;
  } catch (error) {
    console.error('ViroMaterials.createMaterials çağrısı sırasında hata:', error);
    return false;
  }
};

// AR Bileşeni
const ARScene: React.FC<ARModelViewProps> = (props) => {
  const { modelUrl, scale = [0.5, 0.5, 0.5], position = [0, 0, -2], onLoadEnd } = props;
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [materialsInitialized, setMaterialsInitialized] = useState(false);

  useEffect(() => {
    // Materyal oluşturma işlemini useEffect içinde yap
    const initMaterials = async () => {
      try {
        // Materyal oluşturmayı dene
        const success = safeCreateMaterials({
          white: {
            diffuseColor: 'rgba(255, 255, 255, 1)',
          },
        });
        
        setMaterialsInitialized(success);
        
        if (!success) {
          console.warn('ViroMaterials başlatılamadı, model varsayılan materyal ile gösterilecek');
        }
      } catch (error) {
        console.error('Materyal başlatma hatası:', error);
      }
    };

    // Platform web değilse materyalleri başlat
    if (Platform.OS !== 'web') {
      initMaterials();
    }

    // Yükleme durumunu simüle et
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>Model yükleniyor...</Text>
      </View>
    );
  }

  // Güvenli materyal kullanımı
  const useMaterials = materialsInitialized ? ['white'] : undefined;

  return (
    <ViroARScene>
      <ViroAmbientLight color="#ffffff" intensity={200} />
      <ViroSpotLight
        innerAngle={5}
        outerAngle={90}
        direction={[0, -1, -0.2]}
        position={[0, 3, 1]}
        color="#ffffff"
        castsShadow={true}
        intensity={200}
      />
      <Viro3DObject
        source={{ uri: modelUrl }}
        position={position}
        scale={scale}
        type="GLB"
        materials={useMaterials}
        animation={{ name: 'rotate', run: true, loop: true }}
        dragType="FixedToWorld"
        onDrag={() => {}}
        onPinch={() => {}}
        onRotate={() => {}}
        onLoadStart={() => console.log('Model yüklenmeye başladı')}
        onLoadEnd={() => {
          console.log('Model yüklendi');
          if (onLoadEnd) onLoadEnd();
        }}
        onError={(error) => {
          console.error('Model yükleme hatası:', error);
          setError('Model yüklenirken bir hata oluştu');
        }}
      />
    </ViroARScene>
  );
};

// Ana AR bileşeni
function ARModelView(props: ARModelViewProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      // AR başlatma işlemi
      const timer = setTimeout(() => {
        setIsInitialized(true);
      }, 1000);

      return () => clearTimeout(timer);
    } catch (err) {
      setError('AR başlatılırken hata oluştu');
      console.error('AR başlatma hatası:', err);
    }
  }, []);

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!isInitialized) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color={COLORS.primary} />
        <Text style={styles.loadingText}>AR başlatılıyor...</Text>
      </View>
    );
  }

  if (Platform.OS === 'web') {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>AR özelliği yalnızca mobil cihazlarda kullanılabilir.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ViroARSceneNavigator
        autofocus={true}
        initialScene={{
          scene: () => <ARScene {...props} />,
        }}
        style={styles.arView}
      />
      <Text style={styles.instructionText}>
        Modeli hareket ettirmek için dokunun ve sürükleyin.{'\n'}
        Yakınlaştırmak/uzaklaştırmak için iki parmakla sıkıştırın.{'\n'}
        Döndürmek için iki parmakla döndürün.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  arView: {
    flex: 1,
  },
  loadingContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark,
  },
  loadingText: {
    color: COLORS.white,
    fontSize: SIZES.medium,
    marginTop: SPACING.medium,
  },
  errorContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.dark,
    padding: SPACING.large,
  },
  errorText: {
    color: COLORS.error,
    fontSize: SIZES.medium,
    textAlign: 'center',
  },
  instructionText: {
    position: 'absolute',
    bottom: SPACING.medium,
    left: SPACING.medium,
    right: SPACING.medium,
    color: COLORS.white,
    fontSize: SIZES.small,
    textAlign: 'center',
    fontFamily: 'Nunito-Regular',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SPACING.small,
    borderRadius: SIZES.radius,
  },
});

export default ARModelView;