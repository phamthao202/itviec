const initialState = {
  originalJobList: [],
};

const jobReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "GET_JOB_SUCCESS":
    //   console.log("data is here", data);
      state.originalJobList = [...payload]; //tai sao lai thanh payload
      return { ...state };
    default:
      return { ...state };
  }
};
export default jobReducer; //tai sao phai co export default
