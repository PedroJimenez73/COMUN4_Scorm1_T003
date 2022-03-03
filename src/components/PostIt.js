import React from 'react';
import _ from "underscore";
import postit from '../img/icons/message-square.svg'
import x from '../img/icons/x.svg'
import autoBind from 'react-autobind';

class PostIt extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isPostitOpen: false,
            text: this.props.note,
            className: this.props.note !== '' ? 'postit__button  postit__button--blue' : 'postit__button'
        };
        autoBind(this);
    };

    static getDerivedStateFromProps(props, state) {
        //if(state.text !== props.note){
        //this.setState({text: props.note})
        //}
        return {
            text: props.note,
            className: props.note !== '' ? 'postit__button  postit__button--blue' : 'postit__button'
        }
    }

    render() {
        const togglePostit = () => {
            this.setState({ 
                isPostitOpen: !this.state.isPostitOpen
             })
        }

        return (
            <>
                <div className="postit__container">
                    <button type="button" className={this.state.className} onClick={togglePostit}>
                        <img src={postit} alt="Post-It" />
                    </button>
                </div>
                <div className={this.state.isPostitOpen ? 'postit postit--opened' : 'postit postit--closed'}>
                    <button type="button" className="postit__close" onClick={togglePostit}>
                        <img src={x} alt="cerrar" />
                    </button>
                    <textarea className="postit__textarea" type='text' placeholder="Escribe aquí tus notas"
                        onBlur={(e) => { this.props.onChange(e.currentTarget.value) }}
                        onChange={(e) => { this.setState({text: e.currentTarget.value}) }}>
                        {this.state.text}
                    </textarea>
                </div>
            </>
        );
    }
};

export default PostIt;
