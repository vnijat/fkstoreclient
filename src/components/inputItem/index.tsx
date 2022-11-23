import CheckBox from '@react-native-community/checkbox';
import React, { FC, memo, useMemo, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomPicker, { IsingelSelectData } from '../../containers/customPicker';
import HELP from '../../services/helpers';
import { Colors } from '../../utils/colors';
import { regExPatterns } from '../../utils/validation';
import { getStyle } from './styles';

interface IInputItem {
  inputTitle?: string;
  isNumeric?: boolean;
  placeHolder?: string;
  width?: number;
  height?: number;
  maxLength?: number;
  isMultiLine?: boolean;
  inputRef?: (r: any) => {};
  setValue: (text: string | boolean) => void;
  inputValue: string | boolean;
  id?: number;
  selectable?: boolean;
  selectableData?: Array<IsingelSelectData & { id?: number; }>;
  isErorr?: boolean;
  titleColor?: string;
  isSearch?: boolean;
  backgroundColor?: string;
  addButtonTitle?: string;
  pickerDataKeyName?: string;
  isPickerAddButton?: boolean;
  isPickerSearchEnabled?: boolean;
  isPickerItemEditable?: boolean;
  isDisabled?: boolean;
  requiredText?: string;
  pickerOnPressEditButton?: (dataId: number, dataKeyName?: string) => void;
  pickerOnPressAddButton?: (dataKeyName: string) => void;
  disablePickerActionButtons?: boolean;
  errorDetail?: string;
  isCheckBox?: boolean;
}

export const InputItem: FC<IInputItem> = memo(
  ({
    inputTitle,
    isNumeric,
    placeHolder,
    width,
    height,
    maxLength,
    isMultiLine,
    inputRef,
    setValue,
    inputValue,
    id,
    selectable,
    selectableData,
    isErorr,
    titleColor,
    isSearch,
    backgroundColor,
    addButtonTitle,
    pickerDataKeyName,
    isPickerAddButton,
    isPickerSearchEnabled,
    isPickerItemEditable,
    isDisabled,
    requiredText,
    pickerOnPressEditButton,
    pickerOnPressAddButton,
    disablePickerActionButtons,
    errorDetail,
    isCheckBox
  }) => {
    const style = useMemo(
      () => getStyle(height, width, isErorr, titleColor, backgroundColor),
      [isErorr, titleColor, height, width, backgroundColor],
    );
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const isShowMagnify = useMemo(
      () => !isFocused && isSearch && !inputValue.length,
      [isFocused, isSearch, inputValue],
    );
    const errorMessage = useMemo(() => isErorr ? errorDetail : inputTitle, [isErorr, errorDetail]);

    const onChangeText = (text: string) => {
      const isNum = regExPatterns.IS_NUMERIC;
      if (isNumeric) {
        (isNum.test(text) || text === '') && setValue(text);
      } else {
        setValue(text);
      }
    };

    const onCheckBoxValueChange = () => {
      setValue(!inputValue);
    };

    const onValueChange = (item: IsingelSelectData) => {
      setValue(item.value.toString());
    };

    const onFocus = () => {
      setIsFocused(true);
    };

    const onBlur = () => {
      setIsFocused(false);
    };

    const dataForPicker = useMemo(() => {
      if (selectableData?.length) {
        const singleSelectData = HELP.flatNestedCategories(selectableData).map((item) => (item.id ? { value: item.id, label: item.label } : item));
        return singleSelectData as IsingelSelectData[];
      } else {
        return [];
      }
    }, [selectableData]);

    const renderCustomPicker = useMemo(() => {
      return (<>
        < CustomPicker
          dataKeyName={pickerDataKeyName}
          singleSelected={inputValue}
          singleOnSelect={onValueChange}
          singleSelectData={dataForPicker}
          isAddButton={isPickerAddButton}
          buttonStyle={style.pickerButtonStyle}
          itemStyle={style.pickerItemStyle}
          selectedItemStyle={[style.pickerItemStyle, { backgroundColor: Colors.CARD_HEADER_COLOR }]}
          singleSelectMode
          isEditable={isPickerItemEditable}
          isDataSearchEnabled={isPickerSearchEnabled}
          isDisabled={isDisabled}
          requiredText={requiredText}
          onPressEditButton={pickerOnPressEditButton}
          onPressAddButton={pickerOnPressAddButton}
          disablePickerActionButtons={disablePickerActionButtons}
        />
      </>
      );
    }, [inputValue, dataForPicker, isErorr, isPickerItemEditable, isDisabled, disablePickerActionButtons]);


    const renderTextInput = useMemo(() => {
      if (!isCheckBox) {
        return (
          <TextInput
            key={id}
            style={style.textInput}
            onChangeText={onChangeText}
            value={inputValue}
            placeholder={placeHolder}
            multiline={isMultiLine}
            maxLength={maxLength}
            onFocus={onFocus}
            onBlur={onBlur}
          />);
      } else {
        return null;
      }

    }, [id, onChangeText, inputValue, placeHolder, isMultiLine, maxLength, onFocus, onBlur, isCheckBox]);




    const chekBoxInput = useMemo(() => {
      if (isCheckBox) {
        return (
          <CheckBox
            value={!!inputValue}
            tintColor={Colors.CARD_COLOR}
            onValueChange={onCheckBoxValueChange}
            onCheckColor={Colors.CARD_HEADER_COLOR}
            onTintColor={Colors.CARD_HEADER_COLOR}
            onFillColor={Colors.CULTURED}
          />
        );
      } else {
        return null;
      }
    }, [isCheckBox, inputValue]);



    return (
      <View style={{ margin: 5 }} tooltip={errorMessage}>
        {!!inputTitle && (
          <Text style={style.inputTitle}>{`${inputTitle?.toUpperCase()} ${isErorr ? '*' : ''
            } `}</Text>
        )
        }
        {chekBoxInput}
        {selectable ? renderCustomPicker
          :
          (
            <View style={{ justifyContent: 'center' }} >
              {renderTextInput}
              {isShowMagnify && (
                <View
                  style={style.magnify}>
                  <Icon name="magnifying-glass" size={16} color={'white'} />
                </View>
              )}
            </View>
          )
        }
      </View >
    );
  },
);
