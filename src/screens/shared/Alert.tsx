import { Alert } from "react-native";

type AlertType = {
  title: string;
  message?: string;
  onOkPress?: () => void;
  onCancelPress?: () => void;
};

export const TwoButtonAlert = (props: AlertType) => {
  const {title, message, onOkPress, onCancelPress} = props;
  Alert.alert(
    title,
    message,
    [
      {
        text: 'Cancel',
        onPress: onCancelPress,
        style: 'cancel',
      },
      {text: 'OK', onPress: onOkPress},
    ],
    {cancelable: false},
  );
};
