import { Image, type ImageProps } from 'expo-image';
import { StyleSheet, View, type StyleProp, type ViewStyle } from 'react-native';

import { Icon, Icons } from '@/components/icon';
import { useTheme } from '@/hooks/use-theme';

type PhotoProps = {
  source?: ImageProps['source'];
  style?: StyleProp<ViewStyle>;
};

export function Photo({ source, style }: PhotoProps) {
  const theme = useTheme();

  return (
    <View style={[styles.frame, { backgroundColor: theme.surfaceMuted }, style]}>
      {source ? (
        <Image source={source} contentFit="cover" style={StyleSheet.absoluteFill} />
      ) : (
        <Icon name={Icons.food} color="textTertiary" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  frame: {
    justifyContent: 'center',
    alignItems: 'center',
    // Keeps the photo inside rounded corners.
    overflow: 'hidden',
  },
});
