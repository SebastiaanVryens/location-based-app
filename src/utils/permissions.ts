import { type PermissionResponse } from 'expo';
import { Linking } from 'react-native';

// Asks for the permission if the phone still allows asking. After the user has answered,
// only the app's page in Settings can change it, so that page is opened instead.
export function changePermission(
  permission: PermissionResponse | null,
  requestPermission: () => Promise<PermissionResponse>,
) {
  if (permission && !permission.granted && permission.canAskAgain) {
    requestPermission();
  } else {
    Linking.openSettings();
  }
}

// A short status for a settings row, like "Off". Undefined while it is still loading.
export function describePermission(permission: PermissionResponse | null, grantedLabel: string) {
  if (!permission) return undefined;
  if (permission.granted) return grantedLabel;
  return permission.status === 'undetermined' ? 'Not set' : 'Off';
}
