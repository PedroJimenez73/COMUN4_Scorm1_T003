import React, { createRef } from 'react';

class OrderedList extends React.Component {
    constructor(props) {
        super(props);
        this.list = createRef()
    }

    componentDidMount() {
        Array.from(this.list.current.querySelectorAll('a'))
            .filter(a => a.getAttribute('href').match(/^\#/))
            .forEach(a => a.addEventListener('click', () => {
                this.props.sco && this.props.sco.navMenu(a.getAttribute('href').match(/(\d+)$/)[0])
            }))
    }

    render() {
        return (
            <ol ref={this.list} className={this.props.styleSpecial ? this.props.styleSpecial : null}
            style={this.props.position ? {gridArea: this.props.position}: null}>
                {this.props.list.map((l, index) => 
                    <li key={index} className="text" dangerouslySetInnerHTML={{ __html: l}}></li>
                )}
            </ol>
        )
    }
}

export default OrderedList;