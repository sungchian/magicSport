import {
  omit,
  filter,
  isEmpty,
  isNil,
  keys,
  pipe,
  includes,
  pluck,
  join,
} from "ramda";

export const removeEmptyKeys = (obj) =>
  omit(filter((key) => isEmpty(obj[key]) || isNil(obj[key]))(keys(obj)))(obj);

export const getRoleStr = (idList, roleList) =>
  pipe(
    filter(({ id }) => includes("" + id, idList)),
    pluck("name"),
    join(", ")
  )(roleList);

export const convertCurrency = (currencyDigits) => {
  // Constants:
  var MAXIMUM_NUMBER = 999999999999;
  // Predefine the radix characters and currency symbols for output:
  var CN_ZERO = "零";
  var CN_ONE = "壹";
  var CN_TWO = "貳";
  var CN_THREE = "參";
  var CN_FOUR = "肆";
  var CN_FIVE = "伍";
  var CN_SIX = "陸";
  var CN_SEVEN = "柒";
  var CN_EIGHT = "捌";
  var CN_NINE = "玖";
  var CN_TEN = "拾";
  var CN_HUNDRED = "佰";
  var CN_THOUSAND = "仟";
  var CN_TEN_THOUSAND = "萬";
  var CN_HUNDRED_MILLION = "億";

  // Variables:
  var outputCharacters; // The output result.
  var digits, radices, bigRadices;
  var zeroCount;
  var i, p, d;
  var quotient, modulus;

  if (isNaN(parseInt(currencyDigits))) return "";
  currencyDigits = Math.abs(parseInt(currencyDigits));

  // Validate input string:
  currencyDigits = currencyDigits.toString();
  if (currencyDigits == "") {
    // alert("Empty input!");
    return "";
  }
  if (currencyDigits.match(/[^,.\d]/) != null) {
    // alert("Invalid characters in the input string!");
    return "";
  }
  if (
    currencyDigits.match(
      /^((\d{1,3}(,\d{3})*(.((\d{3},)*\d{1,3}))?)|(\d+(.\d+)?))$/
    ) == null
  ) {
    // alert("Illegal format of digit number!");
    return "";
  }

  // Normalize the format of input digits:
  currencyDigits = currencyDigits.replace(/,/g, ""); // Remove comma delimiters.
  currencyDigits = currencyDigits.replace(/^0+/, ""); // Trim zeros at the beginning.
  // Assert the number is not greater than the maximum number.
  if (Number(currencyDigits) > MAXIMUM_NUMBER) {
    // alert("Too large a number to convert!");
    return "";
  }

  // Prepare the characters corresponding to the digits:
  digits = new Array(
    CN_ZERO,
    CN_ONE,
    CN_TWO,
    CN_THREE,
    CN_FOUR,
    CN_FIVE,
    CN_SIX,
    CN_SEVEN,
    CN_EIGHT,
    CN_NINE
  );
  radices = new Array("", CN_TEN, CN_HUNDRED, CN_THOUSAND);
  bigRadices = new Array("", CN_TEN_THOUSAND, CN_HUNDRED_MILLION);
  // Start processing:
  outputCharacters = "";
  // Process integral part if it is larger than 0:
  if (Number(currencyDigits) > 0) {
    zeroCount = 0;
    for (i = 0; i < currencyDigits.length; i++) {
      p = currencyDigits.length - i - 1;
      d = currencyDigits.substr(i, 1);
      quotient = p / 4;
      modulus = p % 4;
      if (d == "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0) {
          outputCharacters += digits[0];
        }
        zeroCount = 0;
        outputCharacters += digits[Number(d)] + radices[modulus];
      }
      if (modulus == 0 && zeroCount < 4) {
        outputCharacters += bigRadices[quotient];
      }
    }
  }

  if (Number(currencyDigits) === 0) {
    return CN_ZERO;
  }

  return outputCharacters;
};
