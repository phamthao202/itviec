import React, { useState, useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import moment from "moment";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { jobAction } from "../redux/action/jobAction";
const Job = () => {
  const dispatch = useDispatch();
  const QUERYSTR_PREFIX = "q";
  let query = useQuery();
  const [jobList, setJobList] = useState([]);
  const history = useHistory();
  const [keyword, setKeyword] = useState(query.get(QUERYSTR_PREFIX));
  // const [originalList, setOriginalList] = useState([]);
  const originalList = useSelector((state) => state.job.originalJobList);
  console.log("original list", originalList);
  const url = process.env.REACT_APP_BACKEND_SERVER_URL;

  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

  const handleSearch = (event) => {
    let filterList = originalList;

    if (event) {
      event.preventDefault();
      history.push(`/?${QUERYSTR_PREFIX}=${encodeURIComponent(keyword)}`);
    }
    if (keyword) {
      filterList = originalList.filter((item) =>
        item.title.toLowerCase().includes(keyword.toLowerCase())
      );
    }

    setJobList(filterList);
  };

  const getJobData = async () => {
    dispatch(jobAction.getJobData());
  };

  const gotoJobDetail = (id) => {
    history.push(`/detail/${id}`);
  };

  useEffect(() => {
    handleSearch();
  }, [originalList]);

  useEffect(() => {
    getJobData();
  }, []);

  const user = useSelector((state) => state.auth.user);
  const logOut = (user) => {
    dispatch({ type: "SIGN_OUT", payload: null });
  };
  return (
    <div className="toan-bo-web">
      <div className="header-logo-search">
        <div>
          <img src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png" />
        </div>
        <div className="login-area">
          {user ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ color: "white" }}>Hi, {user.email}</p>
              <button
                style={{
                  width: "100px",
                  height: "30px",
                  borderRadius: "10px",
                  margin: "20px",
                }}
                onClick={() => logOut()}
              >
                Logout
              </button>
            </div>
          ) : (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <p style={{ color: "white" }}>
                Please login for more Job details
              </p>
              <button
                style={{
                  width: "100px",
                  height: "30px",
                  borderRadius: "10px",
                  margin: "20px",
                }}
                onClick={() => history.push("/login")}
              >
                Login
              </button>
            </div>
          )}
        </div>
        <div className="search-bar">
          <Navbar bg="dark" variant="dark">
            <Form inline onSubmit={(event) => handleSearch(event)}>
              <FormControl
                type="text"
                placeholder="Keyword (skill, job tittle,...)"
                className="mr-sm-2 nav-input-search"
                onChange={(event) => {
                  handleSearch(event);
                  setKeyword(event.target.value);
                  console.log(event.target.value);
                }}
              />
              <Button variant="outline-info" type="submit">
                Search
              </Button>
            </Form>
          </Navbar>
        </div>
      </div>
      <div className="boc-cuc-job">
        <div className="job-area">
          {jobList &&
            jobList.map((job) => (
              <div className="container">
                <div
                  className="job-content"
                  onClick={() => gotoJobDetail(job.id)}
                >
                  <Row>
                    <Col>
                      <div className="jobcard-logo">
                        <img src={job.img} />
                      </div>
                    </Col>
                    <Col xs={8}>
                      <div className="jobcard-descriptions">
                        <h2 className="jobcard-title">{job.title}</h2>
                        <div>$ {job.salary}</div>
                        <div>
                          <ul className="benefit-list">
                            {job.benefits.map((benefit) => (
                              <li>{benefit}</li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          {job.tags.map((tag) => (
                            <Badge variant="secondary" className="badge-style">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </Col>
                    <Col>
                      <div className="date-location-box">
                        {job.isHotjob ? (
                          <Badge variant="danger" className="badge-style">
                            Hot Job
                          </Badge>
                        ) : (
                          <div></div>
                        )}

                        <div className="jobcard-location">
                          <div>{job.city}</div>
                          <div>District {job.district}</div>
                        </div>
                        <div className="job-time">
                          {moment(job.time).fromNow()}
                        </div>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Job;
