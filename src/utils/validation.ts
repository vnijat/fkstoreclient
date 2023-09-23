export const regExPatterns = {
  IS_NUMERIC: /(?![\.])(^\d*\.?\d*)$/,
  IS_CODE: /^\d+$/,
  IS_BARCODE: /^(\d{4,6})-(\d{6})-(\d{6})/,
};
