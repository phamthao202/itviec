const login = (user) => (dispatch) => {
  dispatch({ type: "LOGIN_REQUEST", payload: null });

  try {
    if (!user.email || !user.password) {
      dispatch({ type: "LOGIN_FAIL", payload: "you need email and password" });
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
