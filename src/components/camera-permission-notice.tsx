import { type PermissionResponse } from 'expo';
import { StyleSheet, View } from 'react-native';

import { Button } from '@/components/button';
import { ThemedText } from '@/components/themed-text';
import { Spacing } from '@/constants/theme';
import { changePermission } from '@/utils/permissions';

type CameraPermissionNoticeProps = {
  message: string;
  permission: PermissionResponse;
  requestPermission: () => Promise<PermissionResponse>;
};

// Shown on the camera screens when camera access is off.
export function CameraPermissionNotice({
  message,
  permission,
  requestPermission,
}: CameraPermissionNoticeProps) {
  return (
    <View style={styles.notice}>
      <ThemedText type="caption" color="onInverseSecondary" style={styles.centered}>
        {message}
      </ThemedText>
      <Button
        label={permission.canAskAgain ? 'Allow camera' : 'Open Settings'}
        onPress={() => changePermission(permission, requestPermission)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  notice: {
    alignSelf: 'stretch',
    gap: Spacing.lg,
    paddingHorizontal: Spacing.xl,
  },
  centered: {
    textAlign: 'center',
  },
});
