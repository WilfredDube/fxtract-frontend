import { ActionTypes } from "./Types";
import { data as phData } from "./PlaceholderData";

export const loadData = (dataType) => {
  console.log(dataType);
  return {
    type: ActionTypes.DATA_LOAD,
    payload: {
      dataType: dataType,
      data: phData[dataType],
    },
  };
};
