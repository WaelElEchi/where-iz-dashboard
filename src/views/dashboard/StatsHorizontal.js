import React, { useEffect, useState } from 'react';
import { Card, Col, Row, Spinner } from 'react-bootstrap';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

import axios from 'axios';
import { SERVICE_URL } from 'config';

const StatsHorizontal = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVICE_URL}/request/stats`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
      })
      .then(({ data: res }) => {
        setData(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <>
      <Col xl="3">
        <Card className="hover-border-primary">
          <Card.Body className="py-4">
            <Row className="g-0 align-items-center">
              <Col xs="auto">
                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                  <CsLineIcons icon="chart-2" className="text-white" />
                </div>
              </Col>
              <Col>
                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Total number of received requests</div>
              </Col>
              <Col xs="auto" className="ps-3">
                <div className="display-5 text-primary">{data ? data.totalRequestsNumber : <Spinner animation="border" variant="primary" />}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
      <Col xl="3">
        <Card className="hover-border-primary">
          <Card.Body className="py-4">
            <Row className="g-0 align-items-center">
              <Col xs="auto">
                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                  <CsLineIcons icon="chart-4" className="text-white" />
                </div>
              </Col>
              <Col>
                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Requests received today</div>
              </Col>
              <Col xs="auto" className="ps-3">
                <div className="display-5 text-primary">{data ? data.requestsToday : <Spinner animation="border" variant="primary" />}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col xl="3">
        <Card className="hover-border-primary">
          <Card.Body className="py-4">
            <Row className="g-0 align-items-center">
              <Col xs="auto">
                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                  <CsLineIcons icon="plus" className="text-white" />
                </div>
              </Col>
              <Col>
                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Successful responses</div>
              </Col>
              <Col xs="auto" className="ps-3">
                <div className="display-5 text-primary">{data ? data.numberOfSuccess : <Spinner animation="border" variant="primary" />}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>

      <Col xl="3">
        <Card className="hover-border-primary">
          <Card.Body className="py-4">
            <Row className="g-0 align-items-center">
              <Col xs="auto">
                <div className="bg-gradient-light sw-6 sh-6 rounded-xl d-flex justify-content-center align-items-center">
                  <CsLineIcons icon="minus" className="text-white" />
                </div>
              </Col>
              <Col>
                <div className="heading mb-0 sh-8 d-flex align-items-center lh-1-25 ps-3">Failed responses</div>
              </Col>
              <Col xs="auto" className="ps-3">
                <div className="display-5 text-primary">{data ? data.numberOfFails : <Spinner animation="border" variant="primary" />}</div>
              </Col>
            </Row>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default StatsHorizontal;
