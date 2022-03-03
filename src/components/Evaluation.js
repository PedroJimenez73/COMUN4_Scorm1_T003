import React from 'react';
import EvaluationRadio from '../components/EvaluationRadio'
import EvaluationCheckbox from '../components/EvaluationCheckbox'
import EvaluationResult from '../components/EvaluationResult';
import Paragraph from '../components/Paragraph';
import UnorderedList from '../components/UnorderedList';
import _ from "underscore";

class Evaluation extends React.Component {
  value = {
    attempts: 0,
    currentPosition: 0,
    isValidate: false,
    finished: false
  }
  constructor(props) {
    super(props);
    this.state = this.updateStateValuesFromScrom();
    //if (this.state.finished) this.updateScorm();

    this.updateEvaluationGeneralValue();
    // this.setState({ 
    //   currentPosition: 0,
    //   errors: [],
    //   isValidate: this.isScoComplete(),
    //   finished: this.isScoComplete(),
    //   showResult: this.isScoComplete()
    //  });
    //this.state.showResult = this.state.finished;
  }

  isScoComplete() {
    return this.props.runTimeData.CompletionStatus === 'completed' ||
      Number(this.props.scorm.selfEval.score) === 1 ||
      Number(this.props.attempts) <= Number(!!this.state
        ? this.state.attempts
        : this.props.scorm.values[this.props.guid] ? JSON.parse(this.props.scorm.values[this.props.guid].value).attempts : '0');
  }

  updateStateValuesFromScrom() {
    this.value = !!this.props.scorm.values[this.props.guid] && !!this.props.scorm.values[this.props.guid].value
      ? JSON.parse(this.props.scorm.values[this.props.guid].value)
      : {
        attempts: 0,
        currentPosition: 0,
        isValidate: false,
        finished: false,
      };

    console.log(this.value);
    this.setState({ attempts: Number(this.value.attempts) })
    if (!this.isScoComplete()) {
      this.value = Object.assign(this.value, { currentPosition: 0, isValidate: false, finished: false });
    }
    const _currentPosition = this.isScoComplete() ? 2 : this.value.currentPosition === 4 && !this.isScoComplete() ? 0 : this.value.currentPosition;
    const _showResult = (this.isScoComplete() && _currentPosition !== 4) || (!this.isScoComplete() && _currentPosition === 2);
    const _isValidate = this.isScoComplete() ? true : this.value.isValidate;
    const _finished = this.isScoComplete() ? true : this.value.finished;
    const result = {
      showResult: _showResult,
    //   currentPosition: _currentPosition,
      currentPosition: 1, // change after dev
      isValidate: _isValidate,
      finished: _finished,
      attempts: this.value.attempts,
      mustBe: this.props.children,
      errors: [],
      values: this.props.children.reduce((obj, item) => {
        return {
          ...obj,
          [item.key]: !_finished ? '' : (this.props.scorm.values[item.key] || { value: '' }).value
        }
      }, {})
    }
    console.log(result)
    return result;
  }

  updateEvaluationValue(key, value) {
    this.state.values[key] = value;
    this.setState({ values: this.state.values });
    //this.props.updateValue(key, value);
    //this.updateScorm(false);
    //this.updateEvaluationGeneralValue();
    this.setState({ isValidate: !Object.keys(this.state.values).find(k => !this.state.values[k]) })
  }

  updateScorm(save) {
    this.props.updateValue(this.props.guid,
      JSON.stringify({
        currentPosition: this.state.currentPosition || 0,
        isValidate: this.state.isValidate,
        finished: this.state.finished,
        attempts: (this.state.attempts || 0) + 1
      }
      ));
      Object.keys(this.state.values).forEach(k => this.props.updateValue(k, this.state.values[k]));
    //if (this.state.currentPosition === 2) {
    const result = this.updateEvaluationGeneralValue();
    const evalutionResult = {
      guid: this.props.guid,
      attempts: this.state.attempts + (save ? 1 : 0),
      date: new Date(),
      score: (result.reduce((a, b) => a + b.puntuation, 0) * 100 / result.length) / Number(this.props.maxScore)
    };
    //this.props.runTimeData.CompletionStatus = 'completed'
    
    this.props.sco.setScore(evalutionResult.score, true);
    this.props.saveEvaluation(evalutionResult);
    //}
  }

  startEvaluation() {
    this.setState({ currentPosition: 1, isValidate: false, finished: false, showResult: false });
    this.props.children.forEach(c => {
      this.props.scorm.values[c.key] = { value: '', date: new Date() }
      this.props.updateValue(c.key, '');
    });
  }

  finishEvaluation() {
    this.updateEvaluationGeneralValue();
    this.setState({ currentPosition: 2, isValidate: true, finished: true, showResult: true });
    this.updateScorm(true);
    this.setState({attempts: this.state.attempts + 1});
  }

  setPosition(index, attempt) {
    this.state.currentPosition = index;
    if (index == 1) {
      this.setState({ isValidate: false });
      this.props.children.forEach(c => {
        this.props.scorm.values[c.key] = { value: '', date: new Date() }
        this.props.updateValue(c.key, '');
      });
      this.updateStateValuesFromScrom();
    }
    if (!!attempt) {
      this.state.attempts += 1;
    }
    this.state.finished = index === 2 && (this.state.attempts == this.props.attempts || this.state.errors.length == 0);
    this.setState({ currentPosition: index, finished: index === 2, attempts: this.state.attempts });
    //this.updateScorm();
  }

  updateEvaluationGeneralValue() {
    const answers = this.props.children.map(c => ({
      maxScore: c.maxScore,
      answers: c.questions.filter(q => (this.state.values[c.key].split(',') || []).indexOf(q.key) !== -1),
      mustBe: c.questions.filter(q => q.puntuation > 0),
    }));
    const result = answers.map(a => ({
      errors: a.answers.filter(w => w.puntuation < 1)
        .concat(a.mustBe.filter(m => !!a.maxScore && -1 === a.answers.indexOf(m))),
      puntuation: a.answers.find(w => !w.puntuation)
        ? 0
        : a.answers.reduce((a, b) => a + b.puntuation, 0) < a.maxScore ? 0 : 1
    }));
    this.state.errors = _.chain(result).map(r => r.errors).flatten().value();
    this.state.isValidate = !answers.find(a => !a.answers.length);
    this.setState({
      errors: _.chain(result).map(r => r.errors).flatten().value(),
      isValidate: !answers.find(a => !a.answers.length)
    })
    return result;
  }

  render() {
    return (
      <div className='evaluation__container'
        style={this.props.position ? { gridArea: this.props.position } : null}>
        <pre style={{ position: 'fixed', display: 'none', top: 0, right: 0, background: '#fff', width: '30vw', height: '90vh', overflow: 'auto', zIndex: 1000 }}>{JSON.stringify(this.state.errors, null, 2)}</pre>
        {this.state.currentPosition === 0 &&
          <>
            <Paragraph text={this.props.intro}></Paragraph>
            <UnorderedList list={this.props.details}></UnorderedList>
            <button type="button" className="evaluation__button" onClick={() => this.startEvaluation()}>Comenzar</button>
          </>
        }

        {this.state.currentPosition === 1 &&
          <div className='question__container'>
            {this.props.children.map(c => {
              switch (!!c.maxScore) {
                case false: return <EvaluationRadio
                  enunciate={c.enunciate}
                  questions={c.questions}
                  guid={c.key}
                  scorm={this.props.scorm}
                  onChange={value => { this.updateEvaluationValue(c.key, value) }} />
                default: return <EvaluationCheckbox
                  enunciate={c.enunciate}
                  questions={c.questions}
                  maxScore={c.maxScore}
                  guid={c.key}
                  scorm={this.props.scorm}
                  onChange={value => { this.updateEvaluationValue(c.key, value) }} />
              }
            })}
            <button type="button" className='evaluation__button' onClick={() => this.finishEvaluation()} disabled={!this.state.isValidate}>Comprobar</button>
          </div>
        }

        {this.state.currentPosition === 2 &&
          (!!this.state.showResult)
          && <>
            <EvaluationResult result={this.state} children={this.props.children} />
            {(!!this.state.errors.length && (Number(this.props.attempts) ) > Number(this.state.attempts)) &&
            // <button type="button" className='evaluation__button' onClick={() => this.setPosition(4, false)}>Intentar de nuevo</button>
              <button type="button" id="evaluation__button" className='evaluation__button' onClick={() => this.setPosition(1, false)}>Intentar de nuevo</button>  // Change after dev          
            }
          </>
        }

        {this.state.currentPosition === 4 &&
          <div class="evaluation__container" style={{ "grid-area": '1 / 1 / 1 / 13' }}>
            <div class="evaluation-result__container">
              <div class="text feedback feedback--info">
                <p className="text">Para realizar nuevamente la evaluación debe cerrar la ventana y abrir nuevamente el SCORM pulsando el botón "Iniciar nueva entrega".</p>
              </div>
            </div>
            <button type="button" className='evaluation__button' onClick={() => this.props.sco.exit()}>Salir</button>
          </div>
        }
      </div>
    );
  }
};


export default Evaluation;