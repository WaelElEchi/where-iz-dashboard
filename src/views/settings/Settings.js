import React, { useState, useRef } from 'react';
import { Row, Col, Card, Button, Form } from 'react-bootstrap';
import Select from 'react-select';
import HtmlHead from 'components/html-head/HtmlHead';
import CsLineIcons from 'cs-line-icons/CsLineIcons';

const AccountSettings = () => {
  const title = 'Paramétres';

  const languageOptions = [
    { value: 'Français', label: 'Français' },
    { value: 'English', label: 'English' },
  ];
  const [languageValue, setLanguageValue] = useState(languageOptions[1]);
  return (
    <>
      <HtmlHead title={title} />
      <Col>
        {/* Title Start */}
        <div className="page-title-container mb-3">
          <Row>
            <Col className="mb-2">
              <h1 className="mb-2 pb-0 display-4">{title}</h1>
            </Col>
          </Row>
        </div>
        {/* Title End */}

        {/* Language Settings Start */}
        <h2 className="small-title">Paramètres de l'assistant vocal</h2>
        <Card className="mb-5">
          <Card.Body>
            <Form className="d-flex flex-column">
              <div className="mb-3">
                <Form.Label>Réponse par defaut</Form.Label>
                <Form.Control type="text" defaultValue="Bonjour, le {produit} demandé est situé dans {localisation}" />
              </div>
              <div className="mb-3">
                <Form.Label>Réponse d'échec par défaut</Form.Label>
                <Form.Control type="text" defaultValue="Mot clé non reconnu, veuillez réessayer" />
              </div>
            </Form>
            <Button variant="primary">Sauvegarder</Button>
          </Card.Body>
        </Card>
        {/* Language Settings End */}

        {/* Language Settings Start */}
        <h2 className="small-title ">Paramètres de langue</h2>
        <Card>
          <Card.Body>
            <Form className="d-flex flex-column">
              <div className="mb-3 filled">
                <CsLineIcons icon="web" />
                <Select classNamePrefix="react-select" options={languageOptions} value={languageValue} onChange={setLanguageValue} placeholder="Select" />
              </div>
            </Form>
            <Button variant="primary">Sauvegarder</Button>
          </Card.Body>
        </Card>
        {/* Language Settings End */}
      </Col>
    </>
  );
};

export default AccountSettings;
