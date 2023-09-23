import CheckBox from '@react-native-community/checkbox';
import React, {FC, memo, useMemo, useState} from 'react';
import {View, TextInput, Text, TextInputProps} from 'react-native';
import Icon from 'react-native-vector-icons/Entypo';
import CustomPicker, {IsingelSelectData} from '../../containers/customPicker';
import DateTimePicker from '../../containers/dateTimePicker';
import HELP from '../../services/helpers';
import {Colors} from '../../utils/colors';
import {regExPatterns} from '../../utils/validation';
import {getStyle} from './styles';

interface IInputItem extends TextInputProps {
  inputTitle?: string;
  isNumeric?: boolean;
  placeHolder?: string;
  width?: number;
  height?: number;
  maxLength?: number;
  isMultiLine?: boolean;
  inputRef?: (r: any) => {};
  setValue: (value: unknown) => void;
  inputValue: unknown;
  id?: number;
  selectable?: boolean;
  selectableData?: Array<IsingelSelectData & {id?: number;}>;
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
  isDatePicker?: boolean;
  disabledForEdit?: boolean;
  canSelectParent?: boolean;
}

export const InputItem = memo(
  ({
    inputTitle,
    isNumeric,
    placeHolder,
    width,
    height,
    maxLength,
    isMultiLine,
    setValue,
    inputValue,
    id,
    isErorr,
    titleColor,
    isSearch,
    backgroundColor,
    isCheckBox,
    isDatePicker,
    disabledForEdit,
    ...rest
  }: IInputItem) => {


    const style = useMemo(
      () => getStyle(height, width, isErorr, titleColor, backgroundColor),
      [isErorr, titleColor, height, width, backgroundColor],
    );
    const [isFocused, setIsFocused] = useState<boolean>(false);
    const isShowMagnify = useMemo(
      () => (typeof inputValue === 'string') && !isFocused && isSearch && !inputValue.length,
      [isFocused, isSearch, inputValue]);

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

    const onFocus = () => {
      setIsFocused(true);
    };

    const onBlur = () => {
      setIsFocused(false);
    };


    const renderTextInput = useMemo(() => {
      if (!isCheckBox && !isDatePicker) {
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
            editable={!disabledForEdit}
            caretHidden={disabledForEdit}
            {...rest}
          />);
      } else {
        return null;
      }

    }, [id, onChangeText, inputValue, placeHolder, isMultiLine, maxLength, onFocus, onBlur, isCheckBox, isDatePicker, disabledForEdit, rest]);

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


    const renderDatePicker = useMemo(() => {
      if (isDatePicker) {
        return <DateTimePicker dateValue={inputValue as Date} getDate={(date) => setValue(date)} />;
      } else {
        return null;
      }

    }, [isDatePicker, inputValue]);

    return (
      <View style={{margin: 5, opacity: disabledForEdit ? 0.6 : 1}}>
        {!!inputTitle && (
          <Text style={style.inputTitle}>{`${inputTitle?.toUpperCase()} ${isErorr ? '*' : ''} `}</Text>
        )
        }
        {chekBoxInput}
        {renderDatePicker}
        <View style={{justifyContent: 'center'}} >
          {renderTextInput}
          {isShowMagnify && (
            <View
              style={style.magnify}>
              <Icon name="magnifying-glass" size={16} color={'white'} />
            </View>
          )}
        </View>
      </View >
    );
  }
);
