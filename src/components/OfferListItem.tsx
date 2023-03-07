import {Alert, Image, Pressable, StyleSheet, Text, View} from 'react-native';
import common from '@styles/common';
import {GRAY} from '@styles/colors';
import {iconPath} from '@util/iconPath';
import {useEffect, useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

type offerProps = {
  offer: any[];
  button: boolean;
};

function OfferListItem({offer, button}: offerProps) {
  const [resArr, setResArr] = useState(offer);
  const [isMore, setIsMore] = useState(false);
  const [showingItems, setShowingItems] = useState(offer);

  useEffect(() => {
    setShowingItems([...resArr.slice(0, 1)]);
    // if (resArr.length >= 4) {
    setIsMore(false);
    // }
  }, [resArr]);

  const moreLoad = () => {
    setShowingItems(resArr.slice(0, showingItems.length + 4));
    if (showingItems.length + 4 > resArr.length) {
      setIsMore(true);
    }
    if (isMore && showingItems.length + 4 > resArr.length) {
      setShowingItems(resArr.slice(0, 1));
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
            // onPress={() => Alert.alert('리스트', '링크이동')}
          >
            <Text
              style={[common.text_l, common.fwb, {width: '85%'}]}
              numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={[common.text_s, {color: GRAY.DARK}]}>
              {item.type} · {item.date} · {item.time}
            </Text>
            <Pressable
              onPress={() => Alert.alert('북마크', 'test')}
              hitSlop={10}
              style={styles.iconPosition}>
              <Image source={iconPath.BOOKMARK} style={common.size24} />
            </Pressable>
          </Pressable>
        );
      })}
      {/*
        더보기 버튼
        : 부모의 button true 일 경우 표시
      */}
      {button && (
        <Pressable onPress={moreLoad} style={styles.moreButton}>
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
}

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
