import React from 'react';
import { Row, Col, Dropdown, Card, Badge } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';
import { OverlayScrollbarsComponent } from 'overlayscrollbars-react';
import StatsHorizontal from './StatsHorizontal';
import KeywordsTable from './KeywordsTable';
import RequestsTable from './RequestsTable';

const Dashboard = () => {
  return (
    <div>
      <div className="page-title-container">
        <Row className="mb-5">
          {/* Title Start */}
          <Col md="7">
            <h1 className="mb-0 pb-0 display-4">Tableau de bord</h1>
          </Col>
          {/* Title End */}
        </Row>
      </div>
      <Row className=" mb-5">
        <h2 className="small-title">Statistiques</h2>
        <StatsHorizontal />
      </Row>
      <Row className="gx-4 gy-5 mb-4">
        <Col xl="6">
          <h2 className="small-title">Mots-clés les plus recherchés</h2>
          <KeywordsTable />
        </Col>
        {/* Top Selling Items End */}

        {/* Top Search Terms Start */}
        <Col xl="6">
          <h2 className="small-title">Requêtes les plus récentes</h2>
          <RequestsTable />
        </Col>
        {/* Top Search Terms End */}
      </Row>
    </div>
  );
};

export default Dashboard;
