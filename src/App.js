import React, { Component } from 'react';
import './App.css';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      isLoading: false,
      formData: {
        QBE_Region: '',
        Office_Branch: '',
        Country_code: '',
        Quote_Number: '',
        Currency_Code: '',
        Insured_Name: '',
        Years_Held: 0,
        Rating_Date: new Date().toLocaleString(),
        Inception_Date: new Date().toLocaleString(),
        Expiry_Date: new Date().toLocaleString()
      },
      result: ""
    };
  }

  handleChange = (event) => {
    const value = event.target.value;
    const name = event.target.name;
    var formData = this.state.formData;
    formData[name] = value;
    this.setState({
      formData
    });
  }

  handlePredictClick = (event) => {
    const formData = this.state.formData;
    this.setState({ isLoading: true });
    fetch('http://127.0.0.1:5000/api/', 
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(formData)
      })
      .then(response => response.json())
      .then(response => {
        this.setState({
          result: response.result,
          isLoading: false
        });
      });
  }

  handleCancelClick = (event) => {
    this.setState({ result: "" });
  }

  render() {
    const isLoading = this.state.isLoading;
    const formData = this.state.formData;
    const result = this.state.result;

    return (
      <Container>
        <div>
          <h1 className="title">Underwriting Workbench
          Policy
          </h1>
        </div>
        <div className="content">
          <Form>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>QBE Region</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter the QBE region" 
                  name="QBE_Region"
                  value={formData.QBE_Region}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Office Branch</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter the Office Branch" 
                  name="Office_Branch"
                  value={formData.Office_Branch}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Country Code</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter the Country code" 
                  name="Country_code"
                  value={formData.Country_code}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Quote Number</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter the quote number" 
                  name="Quote_Number"
                  value={formData.Quote_Number}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Currency Code</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter the Currency code" 
                  name="Currency_Code"
                  value={formData.Currency_Code}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Insured Name</Form.Label>
                <Form.Control 
                  type="text" 
                  placeholder="Enter the insured name" 
                  name="Insured_Name"
                  value={formData.Insured_Name}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Form.Row>
              <Form.Group as={Col}>
                <Form.Label>Years Held</Form.Label>
                <Form.Control 
                  type="number" 
                  placeholder="Enter number of years held" 
                  name="Years_Held"
                  value={formData.Years_Held}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Rating Date</Form.Label>
                <Form.Control 
                  type="Date" 
                  placeholder="Enter the date" 
                  name="Rating_Date"
                  value={formData.Rating_Date}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Inception Date</Form.Label>
                <Form.Control 
                  type="Date" 
                  placeholder="Enter the date" 
                  name="Inception_Date"
                  value={formData.Inception_Date}
                  onChange={this.handleChange} />
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Expiry Date</Form.Label>
                <Form.Control 
                  type="Date" 
                  placeholder="Enter the date" 
                  name="Expiry_Date"
                  value={formData.Expiry_Date}
                  onChange={this.handleChange} />
              </Form.Group>
            </Form.Row>
            <Row>
              <Col>
                <Button
                  block
                  variant="success"
                  disabled={isLoading}
                  onClick={!isLoading ? this.handlePredictClick : null}>
                  { isLoading ? 'Making prediction' : 'Predict' }
                </Button>
              </Col>
              <Col>
                <Button
                  block
                  variant="danger"
                  disabled={isLoading}
                  onClick={this.handleCancelClick}>
                  Reset
                </Button>
              </Col>
            </Row>
          </Form>
          {result === "" ? null :
            (<Row>
              <Col className="result-container">
                <h5 id="result">{result}</h5>
              </Col>
            </Row>)
          }
        </div>
      </Container>
    );
  }
}

export default App;
