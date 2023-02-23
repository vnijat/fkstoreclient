import React, { FC, useCallback, useMemo } from 'react';
import { Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomPressable from '../../../../components/customPressable';
import { Imeta } from '../../../../types/common/common';
import { Colors } from '../../../../utils/colors';
import CustomPicker, { IsingelSelectData } from '../../../customPicker';
import PageButton from '../pageButton';
import PagesContainer from '../pagesContainer';

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
  const styles = useMemo(() => getStyle(), []);

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

  const onChangeTakeParams = (item: IsingelSelectData) => {
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
      <View style={styles.paginationLeftContainer}>
        {renderLeftButtons}
        <PagesContainer pageCount={pageCount ?? 0} currentPage={page ?? 0} setNewPage={onPressPageNumber} />
        {renderRightButtons}
      </View>
      <View
        style={styles.paginationRightContainer}>
        <Text style={styles.pageInfoText}>
          {showedItemCount > 0
            ? `page ${page} of ${pageCount} | showed ${showedItemsCount} of ${showedItemCount}`
            : 'No Data'}
        </Text>
        <View style={styles.pickerContainer}>
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
