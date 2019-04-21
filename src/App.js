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
    senderName: null,
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
    if (number.toString() === "25") {
      const facts = [
        "25 is the age Juho is now. 25 is veri old,,,  ps. follow narborjar on Instagram",
        "25 is the number of kasvatustieteilijät in Juho's haaremi",
        "25 is, well,,, THE NUMBER.... ;) ;)",
        "25 is the number of songs that dj narborjar cant't handle",
        "25 is the number of counties that Juho can't place on the map in THE WHOLE WORLD"
      ];
      const fact = facts[Math.floor(Math.random()*facts.length)];
      this.setState({ fact: fact });
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
    const sender = this.state.senderName;
    axios.post('/sendSms', { message: message, sender: sender })
      .then(res => {
        console.log(res);
        this.setState({ messageResponse: res.data });
      })
      .catch(error => { console.log(error); });
  }

  handleSenderName = value => {
    const name = value.target.value;
    this.setState({ senderName: name });
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
            <p className={this.state.factNumber && this.state.factNumber.toString() === "25" ? styles.fact : undefined}>
              {this.state.fact}
            </p>
          </Col>
        </Row>
        <br />
        <br />
        <br />
        <Row>
        <Col md={{ span: 10, offset: 1 }}>
        <h3>Wish Juho häpiböörthdäi</h3>
        <Row>
          <Col>
            <input
              type="textarea"
              placeholder="Syntymä_viesti"
              onChange={this.handleMessageChange}
              className={styles.smsTextArea}
            />
            <input
              type="text"
              placeholder="Sun nimi"
              className={styles.nameTextArea}
              onChange={this.handleSenderName}
            />
          </Col>
          <Col>
            <button
              disabled={
                !this.state.message ||
                !this.state.message.length === 0 ||
                this.state.message.length > 40 ||
                !this.state.senderName
              }
              onClick={this.handleSendSms}
            >SEND MESSAGE</button>
          </Col>
        </Row>
        <p>
          {this.state.messageResponse}
        </p>
      </Col>
        </Row>
      </div>
    );
  }
}

export default App;
