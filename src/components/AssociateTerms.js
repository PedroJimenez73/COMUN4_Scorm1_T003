import React from 'react';

class AssociateTerms extends React.Component {
    selection = [];
    result = 0; /*0: Sin establecer, 1: Incorrecto, 2: Correcto*/
    columns = [];
    constructor(props) {
        super(props);

        const data = props.scorm.values[this.props.guid];
        this.selection = !!data && !!data.value
            ? JSON.parse(data.value).selection
            : props.children.reduce((map, obj) => { map[obj.id] = 0; return map; }, {});
        this.setResult();

        this.columns[0] = this.random();
        this.columns[1] = this.random();

        this.state = {
            ...this.state,
            selection: this.selection,
            result: this.result
        }
    }

    random (){
        let array = [...this.props.children];
        let counter = array.length;
        while (counter > 0) {
            let index = Math.floor(Math.random() * counter);
            counter--;
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    setSelection(id, column) {
        if (this.selection[id] == 3) return;
        Object.keys(this.selection)
            .filter(k => this.selection[k] == column)
            .forEach(k => this.selection[k] = this.selection[k] - column);
        this.selection[id] = this.selection[id] + (((this.selection[id] & column) == column) ? -column : column);
        this.setResult();
        this.setState({ selection: this.selection, result: this.result });
        this.props.updateValue(this.props.guid, JSON.stringify({ selection: this.selection, result: this.result }));
    }

    setResult() {
        const firstColum = Object.keys(this.selection).find(k => this.selection[k] == 1);
        const secondColum = Object.keys(this.selection).find(k => this.selection[k] == 2);
        const ok = Object.keys(this.selection).find(k => this.selection[k] == 3)
        if (!!firstColum && !!secondColum)
            this.result = 1;
        else if (!!firstColum || !!secondColum)
            this.result = 0;
        else
            this.result = !!ok ? 2 : 0;
    }

    render() {
        return (
            <div style={this.props.position ? {gridArea: this.props.position}: null}>
                <div className="at__container" >
                    <div className="at__column at__column--1" >
                        {this.columns[0].map(t =>
                            <div id={t.id} name={t.id} key={t.id} onClick={() => { this.setSelection(t.id, 1) }} className={`term term--${this.state.selection[t.id] == 3 ? 'correct' : this.state.selection[t.id] == 1 ? this.state.result == 1 ? 'incorrect' : 'selected' : ''}`}>
                                {t.title}
                            </div>)}
                    </div>

                    <div className="at__column at__column--2" >
                        {this.columns[1].map(t =>
                            <div id={t.id} name={t.id} key={t.id} onClick={() => { this.setSelection(t.id, 2) }} className={`term term--${this.state.selection[t.id] == 3 ? 'correct' : this.state.selection[t.id] == 2 ? this.state.result == 1 ? 'incorrect' : 'selected' : ''}`}>
                                {t.text}
                            </div>)}
                    </div>
                </div>
                { this.state.result == 0 ? '' :
                    <div className='at__feedback-container'>
                        {this.state.result == 2 ?
                            <div className='text feedback feedback--correct'>Correcto</div> : ''
                        }
                        {this.state.result == 1 ?
                            <div className='text feedback feedback--incorrect'>Incorrecto</div> : ''
                        }
                    </div>
                }

            </div>
        )
    }
}

export default AssociateTerms;