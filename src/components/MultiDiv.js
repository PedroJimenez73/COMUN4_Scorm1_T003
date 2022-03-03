import React, { Component } from "react";
import Paragraph from './Paragraph';
import UnorderedList from './UnorderedList';
import OrderedList from './OrderedList';
import Question from './Question';
import Link from './Link';
import Quote from "./Quote";

class MultiDiv extends Component {
  constructor(props) {
    super(props);

    this.openItems = !!this.props.scorm.values[this.props.guid]
      ? this.props.scorm.values[this.props.guid].value.split(',')
      : this.props.children.filter(c => !!c.isOpen).map(c => c.id);

  }

  render() {
    return (
      <div style={this.props.position ? {gridArea: this.props.position}: null}>
        <>
            {this.props.children.map(el => {
                if (el.type === 'paragraph') {
                    return <Paragraph text={el.text}></Paragraph>
                } else if (el.type === 'list') {
                    return <UnorderedList list={el.list}/>
                } else if (el.type === 'secondary-list') {
                    return <UnorderedList styleSpecial={'secondary'} list={el.list}/>
                } else if (el.type === 'olist') {
                    return <OrderedList list={el.list}/>
                } else if (el.type === 'abclist') {
                    return <OrderedList styleSpecial={'abc'} list={el.list}/>
                } else if (el.type === 'question') {
                    return <Question text={el.text} />
                } else if (el.type === 'link') {
                    return <Link text={el.text} link={el.link} />
                } else if (el.type === 'quote') {
                    return <Quote text={el.text} author={el.author} />
                }           
             })}
        </>
      </div>
    );
  }
}

export default MultiDiv;