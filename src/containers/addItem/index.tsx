import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { shallowEqual, useSelector } from 'react-redux';
import { InputItem } from '../../components/inputItem';
import { PrimaryButton } from '../../components/primaryButton';
import {
  useAddItemMutation,
  useEditItemMutation,
  useGetItemInputsQuery,
} from '../../modules/api/apiSlice';
import {
  clearItemForPosting,
  setIsItemForEdit,
  setItemForPost,
  setItemValueForPost,
} from '../../modules/redux/ItemsSlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import HELP from '../../services/helpers';
import { Item } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import { inputsConfig } from './configs';
import { getStyle } from './styles';

interface AddItemProps { }

const AddItemСontainer: FC<AddItemProps> = ({ }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const style = getStyle();
  const { currentData } = useGetItemInputsQuery(undefined, {
    selectFromResult: ({ isLoading, isUninitialized, error, currentData }) => ({
      error,
      isLoading: isUninitialized ? true : isLoading,
      currentData
    }),
    pollingInterval: 5000,
  });
  const isItemForEdit = useSelector((state: RootState) => state.itemsSlicer.isItemForEdit, shallowEqual);
  const [apiAdditem] = useAddItemMutation();
  const [apiEditItem] = useEditItemMutation();
  const [errorMessage, setErrorMessages] = useState<{ [key: string]: string[]; }>(
    {},
  );
  const itemForPosting: any = useSelector((state: RootState) => state.itemsSlicer.itemforPost, shallowEqual);
  const [itemForEdit, setItemForEdit] = useState({});
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>([]);


  const postItem = async () => {
    try {
      const response = await apiAdditem(itemForPosting);
      if (response?.error) {
        throw response?.error;
      }
      dispatch(clearItemForPosting());
      setErrorMessages({});
      navigation.navigate('Items');
    } catch (error) {
      setErrorMessages(HELP.modifieErrorMessage(error));
    }
  };

  const onPressReset = () => {
    setErrorMessages({});
    if (isItemForEdit) {
      dispatch(setItemForPost(itemForEdit));
    } else {
      dispatch(clearItemForPosting());
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        if (isItemForEdit) {
          setItemForEdit({});
          dispatch(clearItemForPosting());
          setErrorMessages({});
          dispatch(setIsItemForEdit(false));
        }
      };
    }, [isItemForEdit])
  );


  const setItemValueForPosting = (
    inputValue: string,
    objectKey: string,
    selectableInput?: boolean,
  ) => {
    !!inputValue.length &&
      errorMessage[`${objectKey}${selectableInput ? 'Id' : ''}`] &&
      setErrorMessages(prev => {
        delete prev[`${objectKey}${selectableInput ? 'Id' : ''}`];
        return { ...prev };
      });
    dispatch(
      setItemValueForPost({
        key: `${objectKey}${selectableInput ? 'Id' : ''}`,
        value: inputValue,
      }),
    );
  };

  useEffect(() => {
    if (isItemForEdit) {
      setItemForEdit(itemForPosting);
    }
  }, [isItemForEdit]);

  const onPressSave = async () => {
    try {
      const response = await apiEditItem(itemForPosting);
      if (response?.error) {
        throw response?.error;
      }
      dispatch(setIsItemForEdit(false));
      setItemForEdit({});
      navigation.navigate('Items');
    } catch (error) {
      setErrorMessages(HELP.modifieErrorMessage(error));
      console.log("ERORRRRRREDIT==>>>", error);
    }
  };

  const renderInputs = useMemo(() => {
    {
      return inputsConfig.map((config, id) => {
        const {
          title,
          isNumeric,
          placeHolder,
          width,
          height,
          multiLine,
          maxLength,
          selectable,
          requiredDataName,
          filterKeyName,
          requiredText
        } = config;
        const [firstWord, ...restWords] = title.split(' ');
        const titleAsObjectKey = firstWord.toLowerCase() + restWords.join('');
        const inputValue: string = itemForPosting[selectable ? titleAsObjectKey + 'Id' : titleAsObjectKey] ?? (selectable ? '0' : '');
        const toolTip: string = inputValue.length ? inputValue : title;
        inputRef?.current[id] &&
          inputRef?.current[id]?.setNativeProps({
            tooltip: toolTip,
            selectionColor: Colors.JASMINE,
          });
        const selectableData = selectable && currentData ? (!!requiredDataName ? currentData[titleAsObjectKey]?.filter((item: Item) => (item?.[filterKeyName] ? item?.[filterKeyName] : item?.[filterKeyName.toLowerCase()]) == itemForPosting[filterKeyName]) : currentData[titleAsObjectKey]) : [];
        const isError = !!errorMessage[`${titleAsObjectKey}${selectable ? 'Id' : ''}`]?.length;
        const pickerDataKeyName = selectable ? title.toLowerCase() : '';
        const disabled = !!requiredDataName && !itemForPosting[filterKeyName];
        return (
          <InputItem
            inputTitle={title}
            key={id}
            isNumeric={isNumeric}
            placeHolder={placeHolder}
            width={width}
            height={height}
            isMultiLine={multiLine}
            maxLength={maxLength}
            inputRef={r => (inputRef.current[id] = r)}
            inputValue={inputValue}
            setValue={inputValue =>
              setItemValueForPosting(inputValue, titleAsObjectKey, selectable)
            }
            id={id}
            selectable={selectable}
            selectableData={selectableData}
            isErorr={isError}
            titleColor={Colors.DEFAULT_TEXT_COLOR}
            isPickerAddButton={selectable}
            pickerDataKeyName={pickerDataKeyName}
            isPickerSearchEnabled={selectable}
            isPickerItemEditable={selectable}
            isDisabled={disabled}
            requiredText={requiredText}
          />
        );
      });
    }
  }, [itemForPosting, errorMessage, currentData]);

  return (
    <View style={style.container}>
      <View style={style.inputsContainer}>{renderInputs}</View>
      <View style={style.buttonsContainer}>
        <PrimaryButton
          title={'Reset'.toUpperCase()}
          onPress={onPressReset}
          buttonColor={Colors.CARD_COLOR}
          textColor={Colors.DEFAULT_TEXT_COLOR}
          pressedColor={Colors.CARD_HEADER_COLOR}
          height={30}
          width={80}
        />
        {isItemForEdit ? <PrimaryButton
          title={'Save'.toUpperCase()}
          onPress={onPressSave}
          buttonColor={Colors.DEFAULT_TEXT_COLOR}
          textColor={Colors.CARD_COLOR}
          pressedColor={Colors.CARD_HEADER_COLOR}
          height={30}
          width={80}
        />
          : <PrimaryButton
            title={'Add'.toUpperCase()}
            onPress={postItem}
            buttonColor={Colors.DEFAULT_TEXT_COLOR}
            textColor={Colors.CARD_COLOR}
            pressedColor={Colors.CARD_HEADER_COLOR}
            height={30}
            width={80}
          />}
      </View>
    </View>
  );
};

export default AddItemСontainer;
