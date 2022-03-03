import React, { Suspense, lazy } from 'react';
import ApiService from '../services/ApiServices';
import withScorm from '../lib/withScorm';
import PostIt from '../components/PostIt'
import erase from '../img/icons/erase.svg';
import hightlightIcon from '../img/icons/hightlight.svg';
import { guid, scanForAPI } from '../functions/functions';
import $ from 'jquery';
import _ from "underscore";
import GLOSSARY from '../components/objects/GlossaryObject';

class DynamicSlider extends React.Component {
  configuration = [];
  state = {
    components: [],
    id: 0,
    slide: null,
    authenticated: null,
    userName: '',
    given_name: '',
    scorm: {},
    allowUnhighlight: false,
    runTimeData: null
  }

  dateIn = null;
  runTimeData = null;

  constructor(props) {
    super(props);
    this.apiService = new ApiService();
    this.isAuthenticated = this.isAuthenticated.bind(this);

    //window.addEventListener("visibilitychange", () => {
    window.addEventListener("beforeunload", async (e) => {
      if (!this.state.slide) return;
      const id = this.state.slide.id;
      const url = `${this.apiService.apiUrl}${this.apiService.getTimeUrl()}`;
      const formData = new FormData();
      formData.append("username", `${await this.apiService.createToken()}`);
      formData.append("pageIndex", id);
      formData.append("visitId", this.apiService.getVisitId());
      formData.append("dateIn", JSON.stringify(this.dateIn));
      formData.append("dateOut", JSON.stringify(new Date()));
      formData.append("scormVersion", process.env.REACT_APP_SCORM_VERSION)
      console.clear();
      navigator.sendBeacon(url, formData);
    });
  }

  isAuthenticated() {
    const api = scanForAPI(window);
    //!!api && console.log(api.RunTimeData.CompletionStatus);
    //incomplete
    this.runTimeData = api?.RunTimeData || {
      userName: 'alumno.solutio',
      given_name: 'Alumno Solutio',
      CompletionStatus: 'completed'
    };
    this.setState({
      authenticated: true,
      userName: this.runTimeData?.LearnerId,
      given_name: this.runTimeData?.LearnerName,
      runTimeData: this.runTimeData
    });
  }

  registerTimeInPage() {
    if (!this.state.slide) return;
    const pageTime = ({
      pageIndex: this.state.slide.id,
      dateIn: this.dateIn,
      dateOut: new Date()
    });
    this.dateIn = new Date();
    this.apiService.registerTime(pageTime);
  }

  importedComponents = (slide) => {
    return new Promise(resolve => {
      const components = {}
      slide.children.forEach(async (c, i) => {
        components[slide.children[i].component] = await lazy(() => import(`../components/${c.component}`));
        if (i === slide.children.length - 1) resolve(components);
      })
    })
  }

  time_out = null;

  async updateSlider() {
    clearTimeout(this.time_out);
    this.time_out = setTimeout(async () => {
      this.setState({ slide: null })
      if (!this.state.scorm.notes) return setTimeout(() => this.updateSlider(), 250);
      const id = window.location.href.match(/(\d+)$/)[0];
      const slide = this.configuration.find(c => c.id == id);
      slide.features = slide.features || {
        allowAnnotation: false,
        allowHighlight: false
      }

      this.apiService.registerLastPage({
        pageIndex: slide.id,
        dateIn: new Date(),
        dateOut: new Date()
      });

      const importedComponents = await this.importedComponents(slide);
      const components = slide.children.map(c => {
        const componentProps = {
          ...c.props, ...this.props, ...this.state, ...{
            guid: c.key,
            updateValue: (key, value) => this.updateValue(key, value),
            saveEvaluation: (result) => {
              this.scorm && this.scorm.setScore(result.score, true);
              this.apiService.saveEvaluation(result);
            }
          }
        };
        const Component = importedComponents[c.component];
        return <Suspense key={c.key} fallback={<span>Cargando...</span>}>
          <Component key={c.key} {...componentProps}></Component>
        </Suspense>
      });

      this.setState({
        id: id,
        slide: slide,
        components: components
      });

      if (slide.features.allowAnnotation) {
        slide.note = this.getCurrentNote(id);
        this.setState({ slide: slide });
      }

      if (slide.features.allowHighlight) {
        this.initializeHighlight();
      }
    }, 100);
  }

  initializeHighlight() {
    this.setState({ allowUnhighlight: true });
    setTimeout(() => {
      let html = document.getElementById('slide-components-container').innerHTML
      const hightlights = this.state.scorm.highlights.find(h => h.pageIndex === this.state.slide.id);
      if (!hightlights || !hightlights.indexes.length) return;
      _.chain(hightlights.indexes)
        .sortBy(i => i[0])
        .filter(i => i[0] > 0 && i[1] > 0)
        .value()
        .forEach((i, index) => {
          html = html.substr(0, i[0]) + '<mark>' + html.substr(i[0])
          html = html.substr(0, i[1]) + '</mark>' + html.substr(i[1]);
        });
      document.getElementById('slide-components-container').innerHTML = html;
    }, 500);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.match.params.id !== this.props.match.params.id) {
      if (!!this.props.match.params.id) this.registerTimeInPage();
      this.updateSlider();
    }
  }

  async componentDidMount() {
    document.getElementById('init-loader').style.display = 'block';
    this.isAuthenticated();
    $(document.body).on('click', 'a[data-glossary-id]', (e) => {
      if ($(e.target).is('.active')) return $(e.target).removeClass('active');
      $(e.target).attr('data-glossary', GLOSSARY.find(g => g.id == $(e.target).attr('data-glossary-id')).text).addClass('active');
    });
    this.configuration = this.apiService.getCachedConfiguration();
    setTimeout(async () => {
      const _scorm = await this.apiService.getScorm(this.configuration.length);
      this.setState({ scorm: _scorm });
      window.location.hash = `#/${_scorm.currentPage}`;
      this.dateIn = new Date();
      this.updateSlider();
      document.getElementById('init-loader').style.display = 'none';
    }, 1000)
  }

  getCurrentNote() {
    return !!this.state.scorm &&
      !!this.state.scorm.notes &&
      !!this.state.scorm.notes.find(n => n.pageIndex === this.state.slide.id)
      ? this.state.scorm.notes.find(n => n.pageIndex === this.state.slide.id)
      : this.emptyNote();
  }

  emptyNote() {
    if (!this.state.scorm || !this.state.scorm.notes) return {};
    this.state.scorm.notes.push({
      guid: guid(),
      pageIndex: this.state.slide.id,
      date: new Date(),
      note: ""
    });
    this.setState({ scorm: this.state.scorm })
    return this.state.scorm.notes.find(n => n.pageIndex === this.state.slide.id);
  }

  updatePostIt(value) {
    const note = this.state.scorm.notes.find(n => n.pageIndex === this.state.slide.id);
    note.note = value;
    this.setState({ scorm: this.state.scorm });
    this.apiService.updateNote(note);
  }

  updateValue(key, value) {
    this.state.scorm.values[key] = (this.state.scorm.values[key] || { date: new Date(), value: '' });
    this.state.scorm.values[key].value = value;
    this.setState({ scorm: this.state.scorm });
    this.apiService.updateValue(key, value);
  }

  highlight() {
    const getTags = (regex) => {
      const content = window.getSelection().getRangeAt(0).cloneContents();
      const treeWalker = document.createTreeWalker(content, NodeFilter.SHOW_TEXT);
      return _.chain(Array.from(treeWalker.root.children))
        .map(c => c.innerHTML.match(regex))
        .flatten()
        .value()
    }

    const selectionError = () => {
      const pautas = [
        'No abarca más de un parráfo.',
        'No corta frases en negritas o cursivas.',
        'No contiene imágenes o tablas'
      ].map(p => `   - ${p}`).join('\n');
      alert(`No se puede resaltar el texto seleccionado.\nRevise los siguientes detalles de la selección:\n${pautas}`);
    }

    if (!!window.getSelection && window.getSelection() !== "") {
      const openTags = getTags(/<(.[a-zA-Z])/g).length;
      const closeTags = getTags(/<\//g).length;

      if (openTags !== closeTags) return selectionError();

      const userSelection = window.getSelection();
      for (var i = 0; i < userSelection.rangeCount; i++) {
        const range = userSelection.getRangeAt(i);
        var newNode = document.createElement("mark");
        try {
          range.surroundContents(newNode);
          this.saveSelection();
        } catch {
          return selectionError();
        }
      }

      this.setState({ allowUnhighlight: true })
    }
  }

  unhighlight() {
    this.setState({ allowUnhighlight: false });
    document.getElementById('slide-components-container').innerHTML =
      document.getElementById('slide-components-container').innerHTML.replace(/<\/?mark[^>]*>/g, "");
    this.saveSelection();
  }

  saveSelection() {
    const html = document.getElementById('slide-components-container').innerHTML;
    const indexes = (html.match(/<\/?mark[^>]*>/g, "") || []).reduce((r, m) => {
      if (Array.isArray(r)) r.unshift(html.indexOf(m, (r[0] || 0) + m.length));
      return r;
    }, []).reverse();
    const values = [];
    for (var i = 0; i < indexes.length; i += 2) {
      values.push([indexes[i], indexes[i + 1]])
    }
    this.state.scorm.highlights =
      this.state.scorm.highlights
        .filter(h => h.pageIndex !== this.state.slide.id)
        .concat([{ pageIndex: this.state.slide.id, indexes: values, date: new Date() }]);
    this.setState({ scorm: this.state.scorm });
    this.apiService.updateHighlight(this.state.slide.id, values.filter(i => i[0] > 0 && i[1] > 0));
  }

  render() {
    //const { cmiDataState, handleInputValue, deleteHighlight, navMenu } = this.props.sco;
    const showTitle = !!this.state.slide && (
      !!this.state.slide.title ||
      !!this.state.slide.features.allowAnnotation ||
      !!this.state.slide.features.allowHighlight);
    return (
      <>
        {!!this.state.slide &&
          <div className="slide">
            <div className="flex--title" style={{ display: !!showTitle ? 'flex' : 'none' }}>
              {!!this.state.slide && !!this.state.slide.title &&
                <h2 className="title">
                  {/* {this.state.slide.id - 1}. {this.state.slide.title} */}
                  {this.state.slide.title}
                </h2>}
              {!!this.state.slide && !this.state.slide.title &&
                <h2 className="title">&nbsp;</h2>}
              {(!!this.state.slide.features.allowAnnotation || !!this.state.slide.features.allowHighlight) &&
                <div className="title-buttons__container">
                  {!!this.state.slide.features.allowHighlight && <button type="button" onClick={(e) => this.highlight()} title="Subraya lo seleccionado" className="postit__button" ><img alt="Subraya lo seleccionado" src={hightlightIcon} /></button>}
                  {!!this.state.slide.features.allowHighlight && <button disabled={!this.state.allowUnhighlight} type="button" onClick={(e) => this.unhighlight()} title="Borrar subrayado" className="postit__button" ><img alt="Borrar subrayado" src={erase} /></button>}
                  {!!this.state.slide.note && <PostIt note={this.state.slide.note.note} onChange={(e) => this.updatePostIt(e)} />}
                </div>
              }
            </div>
            <div id="slide-components-container"
              style={this.state.slide.gridLayout
                ? { display: 'grid', 'grid-template-columns': this.state.slide.gridLayout, height: !!showTitle ? 'auto' : '100%' }
                : { height: !!showTitle ? 'auto' : '100%' }}
              className={this.state.slide.className}>
              {this.state.components}
            </div>
          </div>
        }
      </>
    );
  }
}


export default withScorm()(DynamicSlider);
