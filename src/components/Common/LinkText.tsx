import THEME from '@/styles/theme';
import { Text, TextProps } from 'react-native';

interface LinkTextProps extends TextProps {}

export const LinkText: React.FC<LinkTextProps> = ({ children, style, ...props }) => {
  return (
    <Text
      style={[
        {
          color: THEME.PRIMARY,
          textDecorationLine: 'underline',
        },
        style,
      ]}
      {...props}>
      {children}
    </Text>
  );
};
