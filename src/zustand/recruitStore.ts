import {create} from 'zustand';

interface Filters {
  currentTab: number;
  position: string;
  currentPosition: string;
  type: string;
  currentType: string;
  date: string;
  currentDate: string;
}

export const recruitStore = create(() => ({
  filters: {
    currentTab: 1,
    position: '포지션',
    currentPosition: '포지션',
    type: '채용형태',
    currentType: '채용형태',
    date: '수업시간',
    currentDate: '수업시간',
  },
}));

export const recruitAction = {
  // filter 값 수정
  filtersSet: (filters: Filters) => {
    recruitStore.setState({filters});
  },
  onFilter: () => {
    // 모달창에서 필터적용 버튼 눌렀을때
    console.log(recruitStore.getState());
    const {filters} = recruitStore.getState();
    if (filters.currentTab === 1) {
      filters.position = filters.currentPosition;
      recruitStore.setState({filters});
    }
  },
};
