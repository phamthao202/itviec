import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormControl, Badge } from "react-bootstrap";
import moment from "moment";
const JobDetail = ({ name }) => {
  const [job, setJob] = useState(null);
  const { id } = useParams();
  const getDetailData = async () => {
    const url = `${process.env.REACT_APP_BACKEND_SERVER_URL}/${id}`;
    const response = await fetch(url);
    const data = await response.json();
    setJob(data);
  };

  useEffect(() => {
    getDetailData();
  }, []);
  if (job === null) return <div>Loading</div>;
  return (
    <div>
      {console.log(job)}
      <div className="job-detail-header">
        <img src="https://itviec.com/assets/logo-itviec-65afac80e92140efa459545bc1c042ff4275f8f197535f147ed7614c2000ab0f.png" />
      </div>
      <div>
        <div className="container job-detail-form">
          <div className="row">
            <div className="col-sm-3">
              <img src={job.img} />
            </div>
            <div className="col-sm-9">
              <h3>{job.title}</h3>
              <div>
                {job.tags.map((tag) => (
                  <Badge variant="secondary" className="badge-style">
                    {tag}
                  </Badge>
                ))}
              </div>
              <div>$ {job.salary}</div>
              <div className="jobcard-location">
                <div>{job.city}</div>
                <div>District {job.district}</div>
                <div className="job-time">{moment(job.time).fromNow()}</div>
                <div>
                  <h3>Benefit</h3>
                  <ul className="benefit-list">
                    {job.benefits.map((benefit) => (
                      <li>{benefit}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3>Description</h3>
                  <div>{job.description}</div>
                </div>
                <button className="job-detail-apply-button">Apply now</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
