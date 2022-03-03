import React from 'react';
import { Link } from 'react-router-dom';
import _ from "underscore";
class EvaluationResult extends React.Component {
    
    constructor(props) {
        super(props);
    }

    groupingErrors(){
        const parents = this.props.children.filter(c => !!_.intersection(c.questions, this.props.result.errors).length)
        return parents;
    }
    
    render() {
        return (
            <div className="evaluation-result__container">
                <div className={`${this.props.result.errors.length < 3 ? "text feedback feedback--correct" : "text feedback feedback--incorrect"}`}>
                    {!this.props.result.errors.length ?
                        <>
                            <p>Enhorabuena has acertado todas las preguntas.</p>
                            {this.props.result.attempts === 0 && <p>¡A la primera!</p>}
                        </>
                        :
                        <p></p>
                    }
                    <p><b>Número de aciertos:</b> {this.props.result.mustBe.length - Object.keys(this.groupingErrors()).length} de {this.props.result.mustBe.length}.</p>

                    {!!this.props.result.errors.length && <>
                    <p><b>Has fallado las preguntas:</b></p>
                    <ul>
                        {this.groupingErrors().map((e, i) => <li key={i}><b>{e.enunciate}</b> repasa el apartado <Link to={`/${e.relatedTo.index}`} ><span>{e.relatedTo.title}</span></Link></li>)}
                    </ul>
                    </>}
                </div>
            </div>
        );
    }
};
export default EvaluationResult;