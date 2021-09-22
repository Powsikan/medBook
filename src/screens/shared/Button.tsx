/* eslint-disable prettier/prettier */
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from 'react-native';
// import {LinearGradient} from 'react-native-linear-gradient';
import {COLORS, FONTSIZE} from '../../utils/theme';
import React from 'react';
import {Res} from './Responsive';

type ButtonType = {
  onPress?: () => void;
  children: any;
  mode?: 'outlined' | 'fill';
  width?: number;
  disabled?: boolean;
  loading?: boolean;
};

export const Button = (props: ButtonType) => {
  const {onPress, children, mode, width, disabled, loading} = props;
  const outlined = (
    <Pressable
      onPress={onPress}
      style={[
        styles.signIn,
        {
          borderColor: COLORS.primary,
          borderWidth: 1,
          marginVertical: 7,
          width: width ? `${width}%` : '100%',
          opacity: disabled ? 0.3 : 1,
        },
      ]}
      disabled={disabled || loading}>
      {({pressed}) => (
        <View style={pressed ? styles.touchable : null}>
          <Text style={[styles.textSign, {color: COLORS.primary}]}>
            {loading ? (
              <ActivityIndicator color={COLORS.primary} size="small" />
            ) : (
              children
            )}
          </Text>
        </View>
      )}
    </Pressable>
  );

  const fill = (
    <Pressable style={styles.signIn} onPress={onPress}>
      <View>{children}</View>
    </Pressable>
  );

  switch (mode) {
    case 'outlined':
      return outlined;
    case 'fill':
      return fill;
    default:
      return outlined;
  }

  // else {
  //     return (
  //         <Pressable
  //             style={styles.signIn}
  //             onPress={onPress}>
  //             {/*{({pressed}) => (*/}
  //             {/*    <View>*/}
  //
  //             {/*// <LinearGradient*/}
  //             {/*//     colors={[COLORS.primaryLight, COLORS.primaryDark]}*/}
  //             {/*//     style={[styles.signIn, {opacity: pressed ? 0.9 : 1}]}*/}
  //             {/*// >*/}
  //
  //             {/*        <Text style={styles.textSign}>*/}
  //             {/*            11{children}*/}
  //             {/*        </Text>*/}
  //             {/*    </View>*/}
  //             {/*)}*/}
  //             {({pressed}) => (
  //                 <View style={pressed ? styles.touchable : null}>
  //                     <Text style={[styles.textSign, {color: COLORS.primary}]}>
  //                         {children}
  //                     </Text>
  //                 </View>
  //             )}
  //         </Pressable>
  //     );
  // }
};

const styles = StyleSheet.create({
  signIn: {
    width: '100%',
    height: Res * 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    marginVertical: Res * 5,
  },
  touchable: {
    backgroundColor: '#f1eded',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialSignIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.white,
    marginTop: 15,
    // borderWidth: 1,
    flexDirection: 'row',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textSign: {
    fontSize: FONTSIZE.large,
    fontWeight: 'bold',
    color: COLORS.themWhite,
  },
  socialTextSign: {
    fontSize: FONTSIZE.large,
    flex: 10,
    fontWeight: 'bold',
  },
});
