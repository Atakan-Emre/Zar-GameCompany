// Learn more https://docs.expo.io/guides/customizing-metro
const { getDefaultConfig } = require('expo/metro-config');

/** @type {import('expo/metro-config').MetroConfig} */
const config = getDefaultConfig(__dirname);

// GLB dosyalarını destekle
config.resolver.assetExts.push('glb');
config.resolver.assetExts.push('gltf');

module.exports = config; 