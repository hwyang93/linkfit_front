import {iconPath} from '@/utils/iconPath';
import {NavigationProp, useNavigation} from '@react-navigation/native';
import {GRAY} from '@styles/colors';
import common from '@styles/common';
import {useEffect, useState} from 'react';
import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {LoggedInParamList} from '../../AppInner';

interface OfferListItemProps {
  offer: any[];
  button: boolean;
}

const OfferListItem: React.FC<OfferListItemProps> = ({offer, button}) => {
  const [isMore, setIsMore] = useState(false);
  const [showingItems, setShowingItems] = useState(offer);

  const navigation = useNavigation<NavigationProp<LoggedInParamList>>();

  useEffect(() => {
    setShowingItems([...offer.slice(0, 1)]);
    setIsMore(false);
  }, [offer]);

  const loadMore = () => {
    if (!isMore) {
      setShowingItems(offer.slice(0, offer.length));
      setIsMore(true);
    } else {
      setShowingItems(offer.slice(0, 1));
      setIsMore(false);
    }
  };

  return (
    <View>
      {showingItems.map((item, index) => {
        return (
          <Pressable
            style={styles.offer}
            key={index}
            onPress={() =>
              navigation.navigate('JobPost', {recruitSeq: item.seq})
            }>
            <Text
              style={[common.text_l, common.fwb, {width: '85%'}]}
              numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[common.text_s, {color: GRAY.DARK}]}>
              {item.recruitType} ·
              {item.dates.map((date: any) => {
                return ` ${date.day}·${date.time} `;
              })}
            </Text>
            <Pressable
              onPress={() => Alert.alert('북마크', 'test')}
              hitSlop={10}
              style={styles.iconPosition}>
              {item.isBookmark === 'Y' ? (
                <Image source={iconPath.BOOKMARK_ON} style={common.size24} />
              ) : (
                <Image source={iconPath.BOOKMARK} style={common.size24} />
              )}
            </Pressable>
          </Pressable>
        );
      })}
      {/* TODO: 부모의 button true 일 경우 더보기 버튼 표시 */}
      {button && (
        <Pressable onPress={loadMore} style={styles.moreButton}>
          <Text style={[common.text_m, common.tac, common.mr8]}>
            {isMore ? '접기' : '더보기'}
          </Text>
          <Icon
            name={isMore ? 'angle-up' : 'angle-down'}
            size={24}
            color="black"
          />
        </Pressable>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  offer: {
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: GRAY.DEFAULT,
    borderRadius: 8,
  },
  iconPosition: {
    position: 'absolute',
    top: 30,
    right: 30,
  },
  moreButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: GRAY.DEFAULT,
    borderRadius: 8,
  },
});

export default OfferListItem;
