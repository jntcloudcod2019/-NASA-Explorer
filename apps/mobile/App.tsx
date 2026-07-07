import './global.css';
import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { useFonts } from 'expo-font';
import { Archivo_700Bold } from '@expo-google-fonts/archivo';
import { OpenSans_400Regular, OpenSans_600SemiBold } from '@expo-google-fonts/open-sans';
import {
  ApodCard,
  GalaxyBackground,
  HamburgerButton,
  SideMenu,
  TextType,
  type SideMenuItem,
} from './src/components';

const MENU_ITEMS: SideMenuItem[] = [
  { label: 'Início', route: 'home' },
  { label: 'Imagem do Dia', route: 'apod' },
  { label: 'Asteroides', route: 'neo' },
  { label: 'Clima Espacial', route: 'donki' },
  { label: 'Terra ao Vivo', route: 'epic' },
  { label: 'Galeria NASA', route: 'images' },
  { label: 'Configurações', route: 'settings' },
];

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [fontsLoaded] = useFonts({
    Archivo_700Bold,
    OpenSans_400Regular,
    OpenSans_600SemiBold,
  });

  if (!fontsLoaded) return null;

  return (
    <View className="relative flex-1 bg-space-950">
      <GalaxyBackground
        hueShift={240}
        saturation={0.4}
        glowIntensity={0.3}
        twinkleIntensity={0.3}
        rotationSpeed={0.05}
        density={1}
        starSpeed={0.5}
        mouseInteraction
        mouseRepulsion
        transparent
      />

      <View className="flex-1 items-center justify-center gap-md px-lg">
        <TextType
          text="NASA Explorer"
          variant="display-sm"
          typingSpeed={70}
          initialDelay={300}
          loop={false}
          cursorCharacter="_"
        />
        <TextType
          text="Explore o universo como nunca antes."
          variant="body"
          tone="muted"
          typingSpeed={25}
          initialDelay={1600}
          loop={false}
          showCursor={false}
        />

        <ApodCard className="mt-lg w-full" />
      </View>

      <View className="absolute left-lg top-lg z-40">
        <HamburgerButton onPress={() => setMenuOpen(true)} />
      </View>

      <SideMenu open={menuOpen} onClose={() => setMenuOpen(false)} items={MENU_ITEMS} />

      <StatusBar style="light" />
    </View>
  );
}
