import React, { Component, Fragment } from "react";
import Paragraph from './Paragraph';
import UnorderedList from './UnorderedList';
import OrderedList from './OrderedList';
import AccordionSection from "./AccordionSection";

class Accordion extends Component {
  constructor(props) {
    super(props);

    this.openItems = !!this.props.scorm.values[this.props.guid]
      ? this.props.scorm.values[this.props.guid].value.split(',')
      : this.props.children.filter(c => !!c.isOpen).map(c => c.id);

    this.state = { openItems: this.openItems };

  }

  toggle(id) {
    const isOpen = this.openItems.indexOf(id) !== -1;
    this.openItems = (!!this.props.allowMultipleOpen
      ? [...this.openItems.filter(c => c !== id), ...[isOpen ? '' : id]]
      : [isOpen ? '' : id]).filter(c => !!c);

    this.setState({ openItems: this.openItems });

    this.props.updateValue(
      this.props.guid,
      this.openItems.join(',')
    );
  };

  render() {
    return (
      <div className="accordion"
      style={this.props.position ? {gridArea: this.props.position}: null}>
        {this.props.children.map(child => (
          <AccordionSection
            isOpen={this.state.openItems.indexOf(child.id) !== -1}
            label={child.label}
            onClick={() => this.toggle(child.id)}
          >
              <Fragment>
            {child.children ? child.children.map((el,i) => {
                if (el.type === 'paragraph') {
                    return <Paragraph key={i} text={el.text}></Paragraph>
                } else if (el.type === 'list') {
                    return <UnorderedList key={i} list={el.list}/>
                } else if (el.type === 'olist') {
                    return <OrderedList list={el.list}/>
                } else if (el.type === 'abclist') {
                    return <OrderedList styleSpecial={'abc'} list={el.list}/>
                } else if (el.type === 'pic') {
                    return (
                        <img key={i} src={el.pic} alt="" style={{display: 'block', margin: '0.5rem auto', width: '100%', maxWidth: '440px'}} />
                    )
                }
            }) : null}
              </Fragment>
          </AccordionSection>
        ))}
      </div>
    );
  }
}

export default Accordion;