
const url = process.env.REACT_APP_BACKEND_SERVER_URL;

const getJobData = () => async (dispatch) => {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log("Data", data);
    //setOriginalList(data);
    dispatch({ type: "GET_JOB_SUCCESS", payload: data });
    // setJobList(data);
  } catch (err) {
    console.log(err.message);
  }
};
export const jobAction = {
  getJobData,
};
