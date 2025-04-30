import React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { ViroARSceneNavigator, ViroARScene, Viro3DObject, ViroMaterials } from '@viro-community/react-viro';
import { COLORS, SIZES, SPACING } from '@/constants/theme';

interface ARModelViewProps {
  modelUrl: string;
  scale?: [number, number, number];
  position?: [number, number, number];
}

// Materyalleri tanımla
ViroMaterials.createMaterials({
  white: {
    diffuseColor: 'rgba(255,255,255,1)',
  },
});

const ARScene = (props: ARModelViewProps) => {
  const { modelUrl, scale = [0.1, 0.1, 0.1], position = [0, 0, -2] } = props;

  return (
    <ViroARScene>
      <Viro3DObject
        source={{ uri: modelUrl }}
        position={position}
        scale={scale}
        type="OBJ"
        materials={["white"]}
        animation={{ name: "rotate", run: true, loop: true }}
      />
    </ViroARScene>
  );
};

const ARModelView: React.FC<ARModelViewProps> = (props) => {
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
        Modeli görmek için kamera izni verin ve telefonunuzu yavaşça hareket ettirin
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.dark,
  },
  arView: {
    flex: 1,
  },
  instructionText: {
    position: 'absolute',
    bottom: SPACING.large,
    left: SPACING.medium,
    right: SPACING.medium,
    textAlign: 'center',
    color: COLORS.white,
    fontFamily: 'Nunito-Regular',
    fontSize: SIZES.medium,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: SPACING.medium,
    borderRadius: SIZES.radius,
  },
});

export default ARModelView; 