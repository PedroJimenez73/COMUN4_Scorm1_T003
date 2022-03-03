import React from 'react';
import withScorm from '../lib/withScorm';
import autoBind from 'react-autobind';
import jsPDF from 'jspdf';
import INFO from './objects/InfoObject'
import photo from '../img/logo_blue_20.jpg';
import Video from './Video'


class VideoDownload extends React.Component {
    value = '';
    constructor(props) {
        super(props);
        this.value = (this.props.scorm.values[this.props.guid] || { value: '' }).value;
        this.state = {
            isTrue: null,
            value: this.value,
        };
        autoBind(this);
    }



    render() {

        const font = {
            image: photo,
        }

        const setValue = (value) => {
            if (!!value) this.value = value;
            this.setState({ value: this.value })
        }

        function getDateEs() {
            var date = new Date();
            var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
            var days = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sabado'];
            return days[date.getDay()] + ', ' + date.getDate() + ' de ' + months[date.getMonth()] + ' de ' + date.getFullYear();
        }

        const downloadNotes = () => {
            var doc = new jsPDF();
            doc.addImage(font.image, 10, 10, 60, 12.4);
            doc.setFontSize(14)
            doc.setTextColor(83, 104, 120)
            doc.text(INFO.degree, 10, 30);
            doc.text(INFO.subject, 10, 38);
            doc.text(INFO.title, 10, 46);
            // doc.text('cmi.learner_name', 10, 54);
            doc.setTextColor(21, 21, 21);
            doc.setFontSize(12)
            doc.text(getDateEs(), 10, 65);
            doc.text(this.props.title, 10, 73);
            doc.text(this.value, 15, 93);
            doc.setTextColor(36, 36, 36);
            doc.rect(10, 80, 190, 150).stroke('#68676f');
            doc.save(`${this.props.pdfFileName}.pdf`);
        }

        return (
            <div style={this.props.position ? {gridArea: this.props.position}: null} className="video-download-container">
                <Video video={this.props.videoUrl}/>
                <div className="question__container">
                    <p className="text text--enunciate">Apuntes</p>
                    <form className="form-text">
                        <textarea className="text" type='text' placeholder="Escribe aquí tus notas..."
                            onBlur={(e) => { this.props.updateValue(this.props.guid, e.currentTarget.value); setValue(e.currentTarget.value) }}>
                            {this.state.value}
                        </textarea>
                        <button type="button" className="download__button" onClick={downloadNotes}>Descargar PDF</button>
                    </form>

                </div>
            </div>
        );
    }
};



export default VideoDownload;