import React, { Component } from "react";
import TitleBoxSection from "./TitleBoxSection";
import UnorderedList from "./UnorderedList";

class TitleBox extends Component {
  openItems = [];

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
      <div className="title-box"
      style={this.props.position ? {gridArea: this.props.position}: null}>
        {this.props.children.map(child => (
          <TitleBoxSection
            isOpen={this.state.openItems.indexOf(child.id) !== -1}
            label={child.label}
            onClick={() => this.toggle(child.id)}
          >
            <div label={child.label}>
              <UnorderedList list={child.list} sco={this.props.sco}></UnorderedList>
            </div>
            <div className="tb-img__container">
                        <img className="tb-img" src={ child.image } alt=""></img>
            </div>
          </TitleBoxSection>))}
      </div>
    );
  }
}

export default TitleBox;