import React, { Component } from 'react';
import PropTypes from 'prop-types';
import autoBind from 'react-autobind';
import PAGES from '../components/objects/PagesObject';

const match = String.match;
export const ScoContext = React.createContext({

});

class ScormProvider extends Component {
  constructor(props) {
    super(props);
    // this state will be passed in 'sco' to consumers
    this.state = {
      terminated: false,
      noAPIFound: false,
      currentPage: 1,
      AlreadyInitialized: false,
      scorm: {},
      cmiDataState: [
        { s1: '', comments: '' },
        { n1: '', n2: '', n3: '', n4: '', n5: '', n6: '', n7: '', n8: '', n9: '', n10: '', n11: '', n12: '', n13: '', n14: '', n15: '', n16: '', n17: '', n18: '', n19: '', n20: '', n21: '', n22: '', n23: '', n24: '', n25: '', n26: '', n27: '', n28: '', n29: '', n30: '' },
        { h1: [], h2: [], h3: [], h4: [], h5: [], h6: [], h7: [], h8: [], h9: [], h10: [], h11: [], h12: [], h13: [], h14: [], h15: [], h16: [], h17: [], h18: [], h19: [], h20: [], h21: [], h22: [], h23: [], h24: [], h25: [], h26: [], h27: [], h28: [], h29: [], h30: [] },
        { e1: "", e2: "", e3: "", e4: "", e5: "", p1: "", p2: "", p3: "", p4: "", p5: "", pa1: "", pa2: "", pa3: "", pa4: "", pa5: "", t: 0, f: false },
        { q1: '', q2: '', q3: '', q4: '', q5: '', q6: '', q7: '', q8: '', q9: '', q10: '', q11: '', q12: '', q13: '', q14: '', q15: '', q16: '', q17: '', q18: '', q19: '', q20: '', q21: '', q22: '', q23: '', q24: '', q25: '', q26: '', q27: '', q28: '', q29: '', q30: '', q31: '' },
        { qr1: '', qr2: '', qr3: '', qr4: '', qr5: '', qr6: '', qr7: '', qr8: '', qr9: '', qr10: '', qr11: '', qr12: '', qr13: '', qr14: '', qr15: '', qr16: '', qr17: '', qr18: '', qr19: '', qr20: '', qr21: '', qr22: '', qr23: '', qr24: '', qr25: '', qr26: '', qr27: '', qr28: '', qr29: '', qr30: '', qr31: '' },
      ],
      valueNumberTest: 1,
      score: 0,
      scoreMax: 5,

    };
    autoBind(this);

    // window.addEventListener("navMenu", (e) => {
    //   this.navMenu(e.detail.pageIndex)
    // }, true);
  };


  ScanForAPI(win) {
    var API = null,
      nFindAPITries = 0,
      maxTries = 500

    while ((!win.API && !win.API_1484_11) &&
      (win.parent) &&
      (win.parent !== win) &&
      (nFindAPITries <= maxTries)) {

      nFindAPITries++;
      win = win.parent;
    }
    API = win.API_1484_11;
    window["win.API_1484_11"] = API;
    return API;
  }

  GetAPI(win) {
    var API = this.ScanForAPI(win);

    if ((win.parent != null) && (win.parent != win)) {
      API = this.ScanForAPI(win.parent)
    }
    if ((API == null) && (win.opener != null)) {
      API = this.ScanForAPI(win.opener)
    }
    return API
  }

  initializeCommunication() {
    const myAPI = this.GetAPI(window);

    if (myAPI == null) {
      console.log("ERROR - Could not establish a connection with the LMS.\n\nYour results may not be recorded.");
      return;
    } else {
      var result = myAPI.Initialize("");

      if (result != "true") {
        var errorNumber = myAPI.GetLastError();
        var errorString = myAPI.GetErrorString(errorNumber);
        var diagnostic = myAPI.GetDiagnostic(errorNumber);

        var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

        console.log("Error - Could not initialize communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
      }
    }
    return result;
  }

  terminateCommunication() {
    const myAPI = this.GetAPI(window);

    if (myAPI == null) {
      return "false";
    }
    else {
      // call Terminate only if it was not previously called
      if (this.state.terminated != "true") {
        // call the Terminate function that should be implemented by
        // the API
        var result = myAPI.Terminate("");

        if (result != "true") {
          var errorNumber = myAPI.GetLastError();
          var errorString = myAPI.GetErrorString(errorNumber);
          var diagnostic = myAPI.GetDiagnostic(errorNumber);

          var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

          console.log("Error - Could not terminate communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
          return "false";
          // may want to do some error handling
        }
        else {  // terminate was successful
          this.setState({ terminated: true })
        }
      }
    }
    return result;
  }

  retrieveDataValue(name) {
    // do not call a set after finish was called
    if (this.state.terminated != "true") {
      const myAPI = this.GetAPI(window);

      if (myAPI == null) {
        return "";
      }
      else {
        var value = myAPI.GetValue(name);

        console.log('name retrieve data', name)
        console.log('value retrieve data', value)

        var errCode = myAPI.GetLastError();

        if (errCode != "0") {
          var errorString = myAPI.GetErrorString(errCode);
          var diagnostic = myAPI.GetDiagnostic(errCode);

          var errorDescription = "Number: " + errCode + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

          console.log("Error - Could not terminate communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);
        } else {
          return value;
        }
      }
    }

    return;
  }

  storeDataValue(name, value) {
    // do not call a set after finish was called
    if (this.state.terminated != "true") {
      const myAPI = this.GetAPI(window);

      if (myAPI == null) {
        return;
      } else {
        var result = myAPI.SetValue(name, value);
        console.log('name store', name)
        console.log('value store', value)


        if (result != "true") {
          var errorNumber = myAPI.GetLastError();
          var errorString = myAPI.GetErrorString(errorNumber);
          var diagnostic = myAPI.GetDiagnostic(errorNumber);

          var errorDescription = "Number: " + errorNumber + "\nDescription: " + errorString + "\nDiagnostic: " + diagnostic;

          console.log("Error - Could not terminate communication with the LMS.\n\nYour results may not be recorded.\n\n" + errorDescription);

          // may want to do some error handling
        }
      }
    }

    return;
  }

  persistData() {
    // do not call a set after Terminate() was called
    if (this.state.terminated != "true") {
      const myAPI = this.GetAPI(window);

      if (myAPI == null) {
        return "";
      } else {
        return myAPI.Commit();
      }
    } else {
      return "";
    }
  }


  PreviousSCO() {
    // we request the previous SCO from the LMS
    this.storeDataValue("adl.nav.request", "previous");
    // we terminate this SCO's communication with the LMS
    this.terminateCommunication();
  }

  ContinueSCO() {
    // we request the previous SCO from the LMS
    this.storeDataValue("adl.nav.request", "continue");
    // we terminate this SCO's communication with the LMS
    this.terminateCommunication();
  }

  async componentDidMount() {
    if (!this.state.AlreadyInitialized) {
      this.initializeCommunication();
      this.setState({ 
        AlreadyInitialized: true
      })
    }

    const myAPI = this.GetAPI(window);



    // set completion status to incomplete
    this.SetIncomplete();
    // set success status to passed
    this.SetPassed()
    // set exit to suspended
    this.storeDataValue("cmi.exit", "suspend");
    // check for resumed entry state
    var entryMode = this.retrieveDataValue("cmi.entry");

    // set a local variable to page 1
    var location = 1;
    var data = [];
    //var score = 0;

    if (entryMode == "resume") {
      // check if a prior location was set
      location = this.retrieveDataValue("cmi.location");
      data = this.retrieveDataValue("cmi.suspend_data");

      if (data != '') {
        var dataArray = JSON.parse(data)
        this.state.cmiDataState = dataArray;
        this.setState({ cmiDataState: dataArray })

        console.log('cmiDataState', this.state.cmiDataState)
      }

      // get the Error code from the last call
      var errorNumber = myAPI.GetLastError();

      // if not set or at the last page, go to first page
      if (errorNumber == "403" || location == PAGES.length) {
        location = 1;
      }



    }
    // present page to learner
    this.DisplayPage(location);
  }

  componentWillUnmount() {
    this.terminateCommunication()
  }

  SetIncomplete() {
    var status = this.retrieveDataValue("cmi.completion_status");
    if (status != "completed") {
      this.storeDataValue("cmi.completion_status", "incomplete");
    }
  }

  SetComplete() {
    this.storeDataValue("cmi.completion_status", "completed");
  }

  SetPassed() {
    this.storeDataValue("cmi.success_status", "passed");
  }

  DisplayPage(pn) {
    var pageNumber = parseInt(pn);

    // catch out of range pages
    if (pageNumber < 1 || pageNumber > PAGES.length) {
      pageNumber = 1;
    }

    // set location value for bookmark
    this.storeDataValue("cmi.location", pageNumber);

    // set completion status to completed when the user hits the last page
    // check whether to display continue button at end of sco for navigation to next sco

    //PARA QUE SE SETEE COMPLETADO
    if (pageNumber == PAGES.length) {
      //this.SetComplete();
    }

    // set global page
    this.setState({ currentPage: pageNumber })

  }

  NextPage() {
    if (this.state.currentPage + 1 <= PAGES.length) {
      let newLocation = 1 + this.state.currentPage++
      this.state.currentPage = newLocation
      this.setState({ currentPage: newLocation })
      this.DisplayPage(this.state.currentPage)
      console.log('currentpage', this.state.currentPage)
    }
    else {
      this.ContinueSCO();
    }
  }

  PreviousPage() {
    if (this.state.currentPage - 1 <= PAGES.length) {

      let newLocation = -1 + this.state.currentPage--
      this.state.currentPage = newLocation
      this.setState({ currentPage: newLocation })
      this.DisplayPage(this.state.currentPage)
      //console.clear();
      console.log('currentpage', this.state.currentPage)
    }
    else {
      this.PreviousSCO();
    }
  }

  toggleMenu() {
    this.setState({ isMenuOpen: !this.state.isMenuOpen })
  }

  navMenu(id) {
    let newLocation = id;
    this.state.currentPage = id;
    id = this.state.currentPage;
    this.setState({ currentPage: id });
    this.DisplayPage(this.state.currentPage);
  }

  exit() {
    window.open(window.location, '_self').close();
  }

  deleteHighlight(currentTargetName) {
    const index = match(/\d+$/)[0];
    if (isNaN(index)) return;
    this.state.cmiDataState[index].h1 = [];
    console.log(this.state.cmiDataState)
    this.setState({ cmiDataState: this.state.cmiDataState })
    this.storeDataValue("cmi.suspend_data", JSON.stringify(this.state.cmiDataState))
  }

  handleCheckboxValue(positionValue, currentTargetName, currentTargetValue) {

    let values = positionValue

    if (values === '') {
      values = []
    }

    if (!values.includes(currentTargetValue)) {
      values.push(currentTargetValue)
    } else {
      values.splice(values.indexOf(currentTargetValue), 1)
    }

    this.handleInputValue(currentTargetName, values)

  }





  handleCheckboxPuntuation(currentTargetValue, currentTargetNamePuntuation, currentTargetPuntuation, currentMaxScore, currentNameArr, positionArray) {

    let puntuationArr = positionArray

    if (puntuationArr === '') {
      puntuationArr = [, , , , ,]
    }


    if (puntuationArr[currentTargetValue - 1] === currentTargetPuntuation) {
      puntuationArr.splice(currentTargetValue - 1, 1, '')
    } else {
      puntuationArr.splice(currentTargetValue - 1, 1, currentTargetPuntuation)
    }

    this.handleInputValue(currentNameArr, puntuationArr)

    const checkPuntuation = () => {
      console.log('puntuationArr', puntuationArr)
      let numbers = puntuationArr.filter(answer => typeof (answer) == 'number')
      let sum = numbers.reduce((a, b) => a + b, 0);
      console.log('sum', sum)

      if (sum === currentMaxScore && !puntuationArr.includes(0)) {
        this.handleInputValue(currentTargetNamePuntuation, 1)
      } else {
        this.handleInputValue(currentTargetNamePuntuation, 0)
      }
    }


    checkPuntuation()
  }

  setStart(currentTargetName, currentTargetValue) {
    const hasIndex = !!(currentTargetName.match(/\d+$/));
    const field = hasIndex ? `s${(currentTargetName.match(/\d+$/))[0]}` : 'comments'
    this.state.cmiDataState[0][field] = currentTargetValue;
  }

  setValueFor(currentTargetName, currentTargetValue, prefix, index) {
    const field = `${prefix}${(currentTargetName.match(/\d+$/))[0]}`;
    let stateValue = this.state.cmiDataState
    this.state.cmiDataState[index][field] = currentTargetValue;
  }

  handleInputValue(currentTargetName, currentTargetValue) {
    if (!!(currentTargetName.match(/^start/))) {
      this.setStart(currentTargetName, currentTargetValue);
    } else if (!!(currentTargetName.match(/^note/))) {
      this.setValueFor(currentTargetName, currentTargetValue, 'n', 1);
    } else if (!!(currentTargetName.match(/^highlight/))) {
      this.setValueFor(currentTargetName, currentTargetValue, 'h', 2);
    } else if (!!(currentTargetName.match(/^evaluation/))) {
      this.setValueFor(currentTargetName, currentTargetValue, 'e', 3);
    } else if (!!(currentTargetName.match(/^puntuationArr/))) {
      this.setValueFor(currentTargetName, currentTargetValue, 'pa', 3);
    } else if (!!(currentTargetName.match(/^puntuation/))) {
      this.setValueFor(currentTargetName, currentTargetValue, 'p', 3);
    } else if (!!(currentTargetName.match(/^questionrange/))) {
      this.setValueFor(currentTargetName, currentTargetValue, 'qr', 5);
    } else if (!!(currentTargetName.match(/^question/))) {
      this.setValueFor(currentTargetName, currentTargetValue, 'q', 4);
    } else if (!!(currentTargetName.match(/^trialsEvaluation/))) {
      this.state.cmiDataState[3].t = this.state.cmiDataState[3].t + 1;
    } else if (!!(currentTargetName.match(/^finishEvaluation/))) {
      this.state.cmiDataState[3].f = true;
    }
    //console.log(this.state.cmiDataState);
    this.setState({ cmiDataState: this.state.cmiDataState });
    this.storeDataValue("cmi.suspend_data", JSON.stringify(this.state.cmiDataState));
  }

  setScore(total, complete) {
    this.storeDataValue('cmi.score.scaled', total);
    !!complete ? this.SetComplete() : this.SetIncomplete();
    console.log('Guardada calificación', total, !!complete);
  }

  calculateScore(numbers) {
    let scoreMax = this.state.scoreMax

    let sum = numbers.reduce((a, b) => a + b, 0);
    console.log('sum', sum)

    let total = sum / scoreMax
    console.log(total)
    this.setScore(total)
  }



  scoreFilter() {
    let answers = [this.state.cmiDataState[3].p1, this.state.cmiDataState[3].p2, this.state.cmiDataState[3].p3, this.state.cmiDataState[3].p4, this.state.cmiDataState[3].p5]
    console.log('answers', answers)

    let numbers = answers.filter(answer => typeof (answer) == 'number')

    console.log('scoreNumbers', numbers)
    this.calculateScore(numbers)
  }


  render() {

    const val = {
      ...this.state,
      toggleMenu: this.toggleMenu,
      PreviousPage: this.PreviousPage,
      NextPage: this.NextPage,
      navMenu: this.navMenu,
      exit: this.exit,
      handleInputValue: this.handleInputValue,
      setScore: this.setScore,
      deleteHighlight: this.deleteHighlight,
      handleCheckboxValue: this.handleCheckboxValue,
      handleCheckboxPuntuation: this.handleCheckboxPuntuation,
      retrieveDataValue: this.retrieveDataValue.apply,
      SetComplete: this.SetComplete
    }

    return (
      <ScoContext.Provider value={val}>
        {this.props.children}
      </ScoContext.Provider>
    );
  }
}

ScormProvider.propTypes = {
  version: 2004,
  debug: PropTypes.bool,
}

export default ScormProvider;