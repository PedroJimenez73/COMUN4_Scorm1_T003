import React from 'react';

class Tree extends React.Component {
    nodeCounter = 1;
    constructor(props) {
        super(props);
    }

    renderNode(node, index) {
        const nodeClassname = `tree__item tree__item--${index}`;
        return (
            <li key={'node_' + (this.nodeCounter++)}>
                <p className={nodeClassname}>{node.text}</p>
                {node.children && node.children.length && 
                    <ul key={'parent_' + (this.nodeCounter)}>
                        {node.children.map(n => this.renderNode(n, index+1))}
                    </ul>
                }
            </li>
        );
    }

    render() {
        return (
            <>
                <div className="tree"
                style={this.props.position ? {overflowX: 'auto', 'gridArea': this.props.position}: {overflowX: 'auto'}}>
                    <ul>
                        {this.props.tree.map(n => this.renderNode(n, 1))}
                    </ul>
                </div>
            </>
        );
    }
}


export default Tree;