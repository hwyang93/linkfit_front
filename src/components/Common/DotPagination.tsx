import React from 'react';
import {View} from 'react-native';

interface DotPaginationProps {
  totalPages: number;
  currentPage: number;
}

const DotPagination: React.FC<DotPaginationProps> = ({
  totalPages,
  currentPage,
}) => {
  return (
    <View style={{flexDirection: 'row', marginVertical: 8}}>
      {new Array(totalPages).fill(0).map((_, index) => (
        <View
          key={index}
          style={{
            width: 8,
            height: 8,
            borderRadius: 4,
            backgroundColor: currentPage === index + 1 ? '#3962f3' : '#d3d3d3',
            marginRight: index === totalPages - 1 ? 0 : 4,
          }}
        />
      ))}
    </View>
  );
};

export default DotPagination;
