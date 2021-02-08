const initialState = { SelectData: [] };
const DataTableReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_SELECT_DATA":
      return {
        ...state,
        SelectData: action.payload,
      };
    default:
      return state;
  }
};
export default DataTableReducer;
