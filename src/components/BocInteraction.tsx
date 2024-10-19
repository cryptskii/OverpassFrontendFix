import React, { useState, ReactNode } from 'react';
import { useTonConnectUI } from "@tonconnect/ui-react";
import {
  parseBoc,
  serializeBoc,
  verifyBoc,
  extractCellsFromBoc,
} from "../utils/bocutils";

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

const Container: React.FC<ContainerProps> = ({ children, className }) => (
  <div className={`container ${className || ''}`}>{children}</div>
);

const Row: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`row ${className || ''}`}>{children}</div>
);

const Col: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => (
  <div className={`col ${className || ''}`}>{children}</div>
);

interface FormProps {
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  children: ReactNode;
}

const Form: React.FC<FormProps> = ({ onSubmit, children }) => (
  <form onSubmit={onSubmit}>{children}</form>
);

interface ButtonProps {
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  children: ReactNode;
  variant?: string;
}

const Button: React.FC<ButtonProps> = ({ type = "button", onClick, children, variant }) => (
  <button type={type} onClick={onClick} className={`btn btn-${variant || 'primary'}`}>{children}</button>
);

interface AlertProps {
  variant: string;
  children: ReactNode;
  className?: string;
}

const Alert: React.FC<AlertProps> = ({ variant, children, className }) => (
  <div className={`alert alert-${variant} ${className || ''}`}>{children}</div>
);

const BocInteraction = () => {
  const [bocData, setBocData] = useState('');
  const [result, setResult] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const handleBocDataChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setBocData(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    try {
      const parsedBoc = parseBoc(Buffer.from(bocData));
      const verificationResult = verifyBoc(Buffer.from(bocData));
      const extractedCells = extractCellsFromBoc(Buffer.from(bocData));
      const serializedBoc = serializeBoc(parsedBoc);

      setResult({
        parsedBoc,
        verificationResult,
        extractedCells,
        serializedBoc,
      });
    } catch (err) {
      setError((err as Error).message);
    }
  };

  return (
    <Container className="mt-5">
      <h2>BOC (Bag of Cells) Interaction</h2>
      <Form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="bocData" className="form-label">Enter BOC Data:</label>
          <textarea
            id="bocData"
            className="form-control"
            rows={3}
            value={bocData}
            onChange={handleBocDataChange}
            placeholder="Enter BOC data here..."
          />
        </div>
        <Button type="submit" variant="primary">
          Process BOC
        </Button>
      </Form>

      {error && (
        <Alert variant="danger" className="mt-3">
          {error}
        </Alert>
      )}

      {result && (
        <Row className="mt-3">
          <Col>
            <h3>Result:</h3>
            <pre>{JSON.stringify(result, null, 2)}</pre>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default BocInteraction;
