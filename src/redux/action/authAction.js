const login = (user) => (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST", payload: null });

  try {
    if (!user.email || !user.password) {
      console.log("in FAIL");
      dispatch({ type: "LOGIN_FAIL", payload: "You need Email and Password" });

      return;
    }
    dispatch({ type: "LOGIN_SUCCESS", payload: user });
  } catch (err) {
    dispatch({ type: "LOGIN_FAIL", payload: err.message });
  }
};
const logout = () => (dispatch) => {};
export const authAction = {
  login,
  logout,
};
