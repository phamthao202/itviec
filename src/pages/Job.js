import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Row, Col, Badge } from "react-bootstrap";
import moment from "moment";
import { Navbar, Form, FormControl, Button } from "react-bootstrap";
const Job = () => {
  const [jobList, setJobList] = useState([]);
  const history = useHistory();
  const url = process.env.REACT_APP_BACKEND_SERVER_URL;

  const getJobData = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log("Data", data);
      setJobList(data);
    } catch (err) {
      console.log(err.message);
    }
  };
  const gotoJobDetail = (id) => {
    history.push(`/detail/${id}`);
  };
  useEffect(() => {
    getJobData();
  }, []);

  return (
    <div className="toan-bo-web">
      <div className="header-logo-search">
        <div>
          <img src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png" />
        </div>
        <div className="search-bar">
          <Navbar bg="dark" variant="dark">
            {/* <Navbar.Brand href="#home"></Navbar.Brand> */}

            <Form inline>
              <FormControl
                type="text"
                placeholder="Keyword (skill, job tittle,...)"
                className="mr-sm-2 nav-input-search"
              />
              <Button variant="outline-info">Search</Button>
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
