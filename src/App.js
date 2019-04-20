import React, { Component } from 'react';
import styles from './App.css';
import SpotifyPlayer from 'react-spotify-player';
import axios from 'axios';
import { Row, Col } from 'react-bootstrap';

class App extends Component {
  state = {
    factNumber: null,
    fact: null,
    message: null,
    messageResponse: null,
  };

  getThisForThat = () => {
    axios
      .get('http://itsthisforthat.com/',
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  };

  getNumberFact = number => {
    console.log(number);
    if (number === 25) {
      const fakta = "25 is the age Juho is now. 25 is veri old,,, 25 is also the number of beers Juho has drinked before screwing yo momma!!1 ps. follow narborjar on Instagram";
      this.setState({ fact: fakta });
    } else {
      axios
      .get('http://numbersapi.com/' + number,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(res => {
        console.log(res);
        this.setState({ fact: res.data });
      })
      .catch(error => {
        console.log(error);
      });
    }
  }

  getHappyBirthDay = from => {
    axios
      .get('http://www.foaas.com/bday/Juho/' + from,
      {
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*'
        }
      })
      .then(res => {
        console.log(res);
      })
      .catch(error => {
        console.log(error);
      });
  }

  handleNumberChange = value => {
    const number = value.target.value;
    this.setState({ factNumber: number, fact: null });
  }

  handleMessageChange = value => {
    const message = value.target.value;
    this.setState({ message: message, messageResponse: null });
  }

  handleSendSms = () => {
    const message = this.state.message;
    axios.post('/sendSms', { message: message })
      .then(res => {
        console.log(res);
        this.setState({ messageResponse: res.data });
      })
      .catch(error => { console.log(error); });
  }

  render() {
    // this.getHappyBirthDay('Paavo');
    const size = {
      width: '100%',
      height: 300,
    };
    const view = 'coverart'; // or 'coverart'
    const theme = 'black'; // or 'white'
    return (
      <div className={styles.app}>
        <Row>
          <Col md={9}>
            <h1 className={styles.appHeaderSpin}>Hello world</h1>
          </Col>
          <Col md={3}>
            <SpotifyPlayer
              uri="spotify:track:799NlfKuYQ1X3IZ6D6jO5C"
              size={size}
              view={view}
              theme={theme}
            />
          </Col>
        </Row>
        <Row>
          <Col md={{ span: 10, offset: 1 }}>
            <h3>Get awesome number facts</h3>
            <Row>
              <Col>
                <input type="number" onChange={this.handleNumberChange}/>
              </Col>
              <Col>
                <button
                  disabled={!this.state.factNumber}
                  onClick={() => this.getNumberFact(this.state.factNumber)}
                >GET FACT</button>
              </Col>
            </Row>
            <p>{this.state.fact}</p>
          </Col>
        </Row>
        <Row>
        <Col md={{ span: 6, offset: 6 }}>
        <h3>Wish Juho häpiböörthdäi</h3>
        <Row>
          <Col>
            <input
              type="textarea"
              onChange={this.handleMessageChange}
              className={styles.smsTextArea}
            />
          </Col>
          <Col>
            <button
              disabled={
                !this.state.message ||
                !this.state.message.length === 0 ||
                this.state.message.length > 40
              }
              onClick={this.handleSendSms}
            >SEND MESSAGE</button>
          </Col>
        </Row>
        <p>{this.state.messageResponse}</p>
      </Col>
        </Row>
      </div>
    );
  }
}

export default App;
