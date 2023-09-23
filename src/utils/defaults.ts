import {
  areaMeasures,
  dimensionMeasures,
  volumeMeasures,
  weightMeasures,
} from '../enums/itemProperties';
import {AddItemInterface} from '../types/item';

export const ItemForPostDefaults: AddItemInterface = {
  name: '',
  description: '',
  properties: {
    dimensionMeasure: dimensionMeasures.MILLIMETRES,
    areaMeasure: areaMeasures.SQUARE_MILLIMETRE,
    volumeMeasure: volumeMeasures.MILLILITRE,
    weightMeasure: weightMeasures.GRAM,
    
  },
};
