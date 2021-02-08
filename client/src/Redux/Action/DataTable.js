export function SetSelectData(Data) {
  return (dispatch) => {
    dispatch({ type: "SET_SELECT_DATA", payload: Data });
  };
}
