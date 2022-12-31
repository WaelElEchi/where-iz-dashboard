import React, { useEffect, useState } from 'react';

import { Card, Spinner, Badge } from 'react-bootstrap';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';

import axios from 'axios';
import { SERVICE_URL } from 'config';

const RequestsTable = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    axios
      .get(`${SERVICE_URL}/request/mostRecent/8`, {
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
      <div className="d-flex flex-row align-items-center justify-content-between mb-2">
        <div className="d-flex flex-column">
          <div>{row.request}</div>
        </div>
        <div className="d-flex">
          <Badge bg="outline-secondary">{row.count}</Badge>
        </div>
      </div>
    );
  };

  const Table = ({ table }) => {
    return table.map((row, key) => {
      return <TalbeRow row={row} key={key} />;
    });
  };

  return (
    <>
      <Card className="sh-35 h-xl-100-card">
        <Card.Body className="h-100 scroll-out">
          <OverlayScrollbarsComponent options={{ scrollbars: { autoHide: 'leave' }, overflowBehavior: { x: 'hidden', y: 'scroll' } }} className="h-100 mb-n2">
            {data ? <Table table={data} /> : <Spinner animation="border" variant="primary" />}
          </OverlayScrollbarsComponent>
        </Card.Body>
      </Card>
    </>
  );
};

export default RequestsTable;
