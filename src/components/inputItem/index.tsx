import { Picker } from '@react-native-picker/picker';
import React, { FC, memo, useMemo, useState } from 'react';
import { View, TextInput, Text } from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import { Colors } from '../../utils/colors';
import { regExPatterns } from '../../utils/validation';
import CustomPicker, { IsingelSelectData } from '../customPicker';
import CustomPressable from '../customPressable';
import { getStyle } from './styles';

interface IInputItem {
  inputTitle?: string;
  isNumeric?: boolean;
  placeHolder?: string;
  width: number;
  height: number;
  maxLength?: number;
  isMultiLine?: boolean;
  inputRef?: (r: any) => {};
  setValue: (text: string) => void;
  inputValue: string;
  id?: number;
  selectable?: boolean;
  selectableData?: { label: string; id: number; }[];
  isErorr?: boolean;
  titleColor?: string;
  isSearch?: boolean;
  backgroundColor?: string;
  isHaveAddButton?: boolean;
  addButtonTitle?: string;
  pickerDataKeyName: string;
  isPickerAddButton?: boolean;
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
    isHaveAddButton,
    addButtonTitle,
    pickerDataKeyName,
    isPickerAddButton
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

    const onChangeText = (text: string) => {
      const isNum = regExPatterns.IS_NUMERIC;
      if (isNumeric) {
        (isNum.test(text) || text === '') && setValue(text);
      } else {
        setValue(text);
      }
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
        return selectableData.map(({ id, label }) => ({ value: id, label }));
      } else {
        return [];
      }
    }, [selectableData?.length]);

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
          selectedItemStyle={[style.pickerItemStyle, { backgroundColor: Colors.METALLIC_GOLD }]}
          singleSelectMode
        />
      </>
      );
    }, [inputValue, dataForPicker.length, isErorr, isPickerAddButton, pickerDataKeyName]);


    return (
      <View style={{ margin: 5 }}>
        {!!inputTitle && (
          <Text style={style.inputTitle}>{`${inputTitle?.toUpperCase()} ${isErorr ? '*' : ''
            } `}</Text>
        )}
        {selectable ? renderCustomPicker
          :
          (
            <View style={{ justifyContent: 'center' }}>
              <TextInput
                key={id}
                style={style.textInput}
                ref={r => inputRef && inputRef(r)}
                onChangeText={onChangeText}
                value={inputValue}
                placeholder={placeHolder}
                multiline={isMultiLine}
                maxLength={maxLength}
                onFocus={onFocus}
                onBlur={onBlur}
              />
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
