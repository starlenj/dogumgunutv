const initialState = { ActiveUser: [] };
const UserReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_ACTIVE_USER":
      return {
        ...state,
        ActiveUser: action.payload,
      };
    default:
      return state;
  }
};
export default UserReducer;
