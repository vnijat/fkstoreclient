import React, { FC, useMemo } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomPressable from '../../../../components/customPressable';
import { Imeta } from '../../../../types/common/common';
import { Colors } from '../../../../utils/colors';
import CustomPicker from '../../../customPicker';

import { IpaginationTakeOptions, paginationTakeOptions } from './configs';
import { getStyle } from './styles';




interface IPagePAgination {
  page?: number;
  take?: number;
  pageCount?: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  showedItemCount?: number;
  onPressToFirst: (query: Imeta) => void;
  onPressToLast: (query: Imeta) => void;
  onPressPrevious: (query: Imeta) => void;
  onPressNext: (query: Imeta) => void;
  onSelectTakeValue?: (query: Imeta) => void;
  setPage: (query: Imeta) => void;
}

export const PagePagination: FC<IPagePAgination> = ({
  page,
  pageCount,
  take = 0,
  hasNextPage,
  hasPreviousPage,
  showedItemCount = 0,
  onPressToFirst,
  onPressToLast,
  onPressPrevious,
  onPressNext,
  onSelectTakeValue,
  setPage
}) => {
  const styles = getStyle();
  const pageCountToNumbers = useMemo(() => {
    let pageArray = [];
    if (pageCount) {
      for (let num = 1; num <= pageCount; num++) {
        pageArray.push(num);
      }
    }
    return pageArray;
  }, [pageCount]);

  const showedItemsCount = useMemo(
    () =>
      showedItemCount > 0
        ? !hasNextPage && showedItemCount % take > 0
          ? showedItemCount % take
          : take
        : 0,
    [take, showedItemCount, hasNextPage],
  );

  const onPressPageNumber = (pageNumber: number) => {
    setPage({ page: pageNumber });
  };

  const renderPageNumbers = useMemo(() => {
    if (page && pageCountToNumbers?.length) {
      let diffFromMax = 2;
      let diff = pageCount! - page;
      if (diff <= 2) {
        for (let i = 5; diff >= 0; i--) {
          diff--;
          diffFromMax = i;
        }
      }
      const sliceStart = page >= 5 ? page - diffFromMax : 0;
      const sliceEnd = page >= 5 ? page + 3 : 5;

      return pageCountToNumbers
        ?.slice(sliceStart, sliceEnd)
        .map((item, index) => {
          const selectedPage = item === page;
          return (
            <CustomPressable
              onHoverOpacity
              key={index}
              onPress={() => onPressPageNumber(Number(item))}
              style={[
                {
                  backgroundColor: selectedPage
                    ? Colors.DEFAULT_TEXT_COLOR
                    : Colors.CARD_COLOR,
                },
                styles.pageButtons,
              ]}
              pressedStyle={{ backgroundColor: Colors.CARD_HEADER_COLOR }}>
              <Text style={[styles.pageText, !selectedPage && { color: Colors.DEFAULT_TEXT_COLOR }]} key={`${index}-${item}`}>
                {item}
              </Text>
            </CustomPressable>
          );
        });
    } else {
      return null;
    }
  }, [page, pageCountToNumbers.length, pageCount]);

  const renderPages = useMemo(() => {
    return (
      <View
        style={{ flexDirection: 'row', width: 160, justifyContent: 'center' }}>
        {renderPageNumbers}
      </View>
    );
  }, [pageCountToNumbers.length, page]);

  const onPressAlignLeft = () => {
    const toFirstPage = page! + 1 - page!;
    onPressToFirst({ page: toFirstPage });
  };

  const onPressLeft = () => {
    onPressPrevious({ page: page! - 1 });
  };

  const onPressRight = () => {
    onPressNext({ page: page! + 1 });
  };

  const onPressAlignRight = () => {
    const toLastPage = pageCount;
    onPressToLast({ page: toLastPage });
  };

  const onChangeTakeParams = (item: IpaginationTakeOptions) => {
    onSelectTakeValue && onSelectTakeValue({ take: Number(item.value), page: 1 });
  };

  const renderLeftButtons = useMemo(() => {
    const iconColor = hasPreviousPage ? Colors.DEFAULT_TEXT_COLOR : Colors.CARD_COLOR;
    return (
      <>
        <CustomPressable
          onHoverOpacity
          onPress={onPressAlignLeft}
          style={styles.buttonsStyle}
          disabled={!hasPreviousPage}>
          <Icon name="align-left" size={17} color={iconColor} />
        </CustomPressable>
        <CustomPressable
          onHoverOpacity
          onPress={onPressLeft}
          style={styles.buttonsStyle}
          disabled={!hasPreviousPage}>
          <Icon name="chevron-small-left" size={20} color={iconColor} />
        </CustomPressable>
      </>
    );
  }, [page, hasPreviousPage]);

  const renderRightButtons = useMemo(() => {
    const iconColor = hasNextPage ? Colors.DEFAULT_TEXT_COLOR : Colors.CARD_COLOR;
    return (
      <>
        <CustomPressable
          onHoverOpacity
          onPress={onPressRight}
          style={styles.buttonsStyle}
          disabled={!hasNextPage}>
          <Icon name="chevron-small-right" size={20} color={iconColor} />
        </CustomPressable>
        <CustomPressable
          onHoverOpacity
          onPress={onPressAlignRight}
          style={styles.buttonsStyle}
          disabled={!hasNextPage}>
          <Icon name="align-right" size={17} color={iconColor} />
        </CustomPressable>
      </>
    );
  }, [page, hasNextPage]);

  return (
    <View style={styles.paginationContainer}>
      <View style={{ flexDirection: 'row' }}>
        {renderLeftButtons}
        {renderPages}
        {renderRightButtons}
      </View>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
        }}>
        <Text style={{ color: Colors.DEFAULT_TEXT_COLOR, fontSize: 12 }}>
          {showedItemCount > 0
            ? `page ${page} of ${pageCount} | showed ${showedItemsCount} of ${showedItemCount}`
            : 'No Data'}
        </Text>
        <View style={{ marginLeft: 10 }}>
          <CustomPicker
            singleSelectMode
            singleSelectData={paginationTakeOptions}
            singleSelected={take}
            singleOnSelect={onChangeTakeParams}
            buttonStyle={styles.pickerButton}
            title={'show'}
          />
        </View>
      </View>
    </View>
  );
};
