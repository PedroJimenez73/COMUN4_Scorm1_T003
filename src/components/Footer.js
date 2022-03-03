import React from 'react';
import { Link } from 'react-router-dom';
import withScorm from '../lib/withScorm';
import ApiService from '../services/ApiServices';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.apiService = new ApiService();
  }

  state = {
    configuration: []
  }

  async componentDidMount() {
    this.setState({
      configuration: await this.apiService.getConfiguration()
    })
  }

  render() {
    const fromHash = Number((window.location.hash.match(/\d/g) || []).join(''));
    if (!!fromHash) this.props.sco.currentPage = fromHash;
    let { currentPage, PreviousPage, NextPage, exit } = this.props.sco;

    return (
      <footer className="footer__container">
        <button className="footer__button footer__button--end" onClick={exit}>SALIR</button>
        <div className="button-container">
          {currentPage > 1 ?
            <Link to={`/${currentPage - 1}`}  >
              <button id="prev-btn" className="footer__button" onClick={PreviousPage}>ANTERIOR</button>
            </Link>
            : <button id="prev-btn" className="footer__button footer__button--transparent" disabled>ANTERIOR</button>}

          <div id="counter" className="footer__button footer__button--disabled">
            {`${currentPage}  /  ${this.state.configuration.length}`}
          </div>
          {currentPage < this.state.configuration.length ?
            <Link to={`/${currentPage + 1}`}  >
              <button id="next-btn" className="footer__button" onClick={NextPage}>SIGUIENTE</button>
            </Link>
            : <button id="next-btn" className="footer__button footer__button--transparent" disabled>SIGUIENTE</button>}
        </div>

      </footer>
    )
  }
}


export default withScorm()(Footer);