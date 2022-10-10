import { useFocusEffect, useIsFocused, useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import React, { FC, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Text, View } from 'react-native';
import { useToast } from 'react-native-rooster';
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
} from '../../modules/redux/itemsSlicer';
import { RootState, useAppDispatch } from '../../modules/redux/store';
import HELP from '../../services/helpers';
import { AddItemInterface } from '../../types/Item';
import { Item } from '../../types/ItemsQuery';
import { Colors } from '../../utils/colors';
import { inputsConfig } from './configs';
import { getStyle } from './styles';

interface AddItemProps { }

const AddItemСontainer: FC<AddItemProps> = ({ }) => {
  const navigation = useNavigation<StackNavigationProp<any>>();
  const style = getStyle();
  const { addToast } = useToast();
  const { currentData: inputsData } = useGetItemInputsQuery(undefined, {
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
  const itemForPosting: AddItemInterface = useSelector((state: RootState) => state.itemsSlicer.itemforPost, shallowEqual);
  const [itemForEdit, setItemForEdit] = useState({});
  const dispatch = useAppDispatch();
  const inputRef = useRef<any>([]);


  const postItem = async () => {
    try {
      const response = await apiAdditem(itemForPosting);
      if (response?.error) {
        throw response?.error;
      }
      await addToast({
        type: 'success',
        title: 'Success',
        message: `${itemForPosting.name} Added`.toLowerCase()
      });
      dispatch(clearItemForPosting());
      setErrorMessages({});
      // navigation.navigate('Items');
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
      errorMessage[objectKey] &&
      setErrorMessages(prev => {
        delete prev[objectKey];
        return { ...prev };
      });
    dispatch(
      setItemValueForPost({
        key: objectKey,
        value: inputValue,
      }),
    );
  };

  useEffect(() => {
    if (isItemForEdit) {
      setItemForEdit(itemForPosting);
    }
  }, [isItemForEdit]);
  console.log("asdad", AddItemСontainer.displayName);
  const onPressSave = async () => {
    try {
      const response = await apiEditItem(itemForPosting);
      if (response?.error) {
        throw response?.error;
      }
      dispatch(setIsItemForEdit(false));
      await addToast({
        type: 'success',
        title: 'Success',
        message: `${itemForPosting.name} saved!`.toLowerCase()
      });
      setItemForEdit({});
      navigation.navigate('Items');
    } catch (error) {
      setErrorMessages(HELP.modifieErrorMessage(error));
      console.log("AddItemСontainer==>>onPressSave==>>>", error);
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
          requiredText,
          requiredDataDtoKey,
          dtoKey,
          selectableDataKey
        } = config;
        const inputValue: string = itemForPosting[dtoKey as keyof AddItemInterface] ?? (selectable ? '0' : '');
        const selectableData = selectable && inputsData ? (!!requiredDataName ? inputsData[selectableDataKey!!]?.filter((data: { [key: string]: any; }) => (data?.[requiredDataDtoKey!!] ? data?.[requiredDataDtoKey!!] : data?.[requiredDataDtoKey?.toLowerCase()!!]) == itemForPosting[requiredDataDtoKey as keyof AddItemInterface]) : inputsData[selectableDataKey!!]) : [];
        const isError = !!errorMessage[dtoKey!!]?.length;
        const pickerDataKeyName = selectable ? selectableDataKey : '';
        const disabled = !!requiredDataName && !itemForPosting[requiredDataDtoKey as keyof AddItemInterface];
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
              setItemValueForPosting(inputValue, dtoKey, selectable)
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
  }, [itemForPosting, errorMessage, inputsData]);

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
