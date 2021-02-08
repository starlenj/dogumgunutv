export function SetActiveUser(User) {
  return (dispatch) => {
    dispatch({ type: "SET_ACTIVE_USER", payload: User });
  };
}
