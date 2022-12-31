import React, { useEffect, useState } from 'react';

import { Card, Col, Row, Spinner } from 'react-bootstrap';

import axios from 'axios';
import { SERVICE_URL } from 'config';

const KeywordsTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVICE_URL}/request/mostSearched/4`, {
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

  const TalbeRow = ({ row }) => {
    return (
      <Card className="mb-2">
        <Row className="g-0 sh-14 sh-md-10">
          <Col>
            <Card.Body className="pt-0 pb-0 h-100">
              <Row className="g-0 h-100 align-content-center">
                <Col md="6" className="d-flex align-items-center mb-2 mb-md-0">
                  {row.label}
                </Col>
                <Col md="3" className="d-flex align-items-center text-muted text-medium">
                  {row.location}
                </Col>
                <Col md="3" className="d-flex align-items-center justify-content-md-end text-muted text-medium">
                  {row.searchCount}
                </Col>
              </Row>
            </Card.Body>
          </Col>
        </Row>
      </Card>
    );
  };

  const Table = ({ table }) => {
    return table.map((row, key) => {
      return <TalbeRow row={row} key={key} />;
    });
  };

  return (
    <>
      <div className="mb-n2">{data ? <Table table={data} /> : <Spinner animation="border" variant="primary" />}</div>
    </>
  );
};

export default KeywordsTable;
