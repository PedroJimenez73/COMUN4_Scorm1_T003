import React from 'react';
import _ from 'underscore'
class NumberTestResponse extends React.Component {
    groups = {};
    
    constructor(props) {
        super(props)
        let results = {};
        const values = !!props.scorm.values[props.relatedTo] && !!props.scorm.values[props.relatedTo].value
            ? JSON.parse(props.scorm.values[props.relatedTo].value) : {}

        _.chain(props.results).map(r => r.items).flatten().forEach(i => results[i] = Number(values[i] || '0'));
        props.results.forEach(r => this.groups[r.id] = r.items.reduce((a, i) => a + results[i], 0));
    }
    showGroup(id){
        const value = this.groups[id],
              values = Object.entries(this.groups).filter(e => e[0] != id).map(e => e[1]);

        return eval(`(${value} > ${values[0]} && ${value} > ${values[1]})
            || (${value} > ${values[0]} && ${value} === ${values[1]})
            || (${value} === ${values[0]} && ${value} > ${values[1]})
            || (${value} === ${values[1]} && ${value} === ${values[0]})`
        );
    }
    render() {
        return (
            <div className='NumberTestResponse__container'
            style={this.props.position ? {gridArea: this.props.position}: null}>
                {this.props.results.map(r =>  
                    (this.showGroup(r.id) && <div className="question__container">
                        <h3 className="subtitle">{r.title}</h3>
                        <p className="text">{r.desc}</p>
                    </div>)
            )}
            </div>
        );
    }
}
export default NumberTestResponse;