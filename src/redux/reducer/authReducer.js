const initialState = {
  user: null,
  loading: false,
  error: "",
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case "LOGIN_REQUEST":
      state.loading = true;
      console.log("LOGIN_REQUEST");
      return { ...state };
    case "LOGIN_SUCCESS":
      state.loading = false;
      state.user = { ...payload };
      console.log("LOGIN_SUCCESS", state.user);
      return { ...state };
    case "LOGIN_FAIL":
      state.loading = false;
      state.error = payload;
      console.log("LOGIN_FAIL", state.error);
      return { ...state };
    case "SIGN_OUT":
      state.user = null;
      return { ...state };

    default:
      return { ...state };
  }
};
export default authReducer;
