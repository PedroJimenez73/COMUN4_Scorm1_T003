import React from 'react';
import { useState, useEffect } from 'react';
//import DONUT from '../components/objects/DonutObject'
import clock from '../img/icons/clock.svg'
import incorrectAudio from '../audio/bounce.mp3'
import correctAudio from '../audio/clic.mp3'
import notPassed from '../audio/fail.mp3'
import passed from '../audio/winner.mp3'

export default function Donut(props) {
    let value = JSON.parse((props.scorm.values[props.guid]
        || {
        value: JSON.stringify({
            isOpen: false,
            currentLetter: 0,
            correct: [],
            fail: [],
            isActive: false
        })
    }).value);

    
    const [currentLetter, setCurrentLetter] = useState(value.currentLetter);
    const [textarea, setTextarea] = useState('')
    const [correct, setCorrect] = useState(value.correct)
    const [fail, setFail] = useState(value.fail)
    const [isOpen, setIsOpen] = useState(value.isOpen);
    const [isActive, setIsActive] = useState(value.isActive);
    const [second, setSecond] = useState(60);
    const [timeConter, setTimeConter] = useState(0);

    const [myAudioCorrect] = useState(new Audio(correctAudio))
    const [myAudioFail] = useState(new Audio(incorrectAudio))
    const [myAudioNotPassed] = useState(new Audio(notPassed))
    const [myAudioPassed] = useState(new Audio(passed))

    const updateValue = () => {
        props.updateValue(props.guid, JSON.stringify(value))
    }

    const nextLetter = () => {
        if (currentLetter === 0) {
            setIsActive(true)
            value.isActive = true;
            setTimeConter(0)
            setCurrentLetter(currentLetter + 1);
        } else {
            setCurrentLetter(currentLetter + 1);
            finishAudio()
            if (second !== 0) {
                let rest = 60 - second
                setTimeConter(timeConter + rest)
                setSecond(60)
            } else {
                setTimeConter(timeConter + 60)
                setSecond(60)
            }
        }
        value.currentLetter = currentLetter + 1;
        updateValue();
    }

    const textareaChange = (e) => {
        e.preventDefault()
        setTextarea(e.target.value)
    }

    const check = (letterObject) => {
        //if (!!textarea.trim() && !!textarea.trim().match(new RegExp(`\\b${letterObject.answer}\\b`, 'i'))) {
        if (!!textarea.trim() && -1 !== (letterObject.answer || []).split('|').map(l => l.toLowerCase()).lastIndexOf(textarea.toLowerCase().trim())) {
            setTextarea('')
            nextLetter()
            Correct(letterObject.letter)
            myAudioCorrect.play()

        } else {
            wrongAnswer(letterObject.letter)
        }
        setTimeout(()=>{
            if(!!document.getElementById('rosco-text')) document.getElementById('rosco-text').focus();
            updateValue()
        }, 500);
    }

    const Correct = (letter) => {
        setCorrect(state => [...state, letter]);
        value.correct.push(letter);
        setTimeout(()=>updateValue(), 500);
    }

    const Fail = (letter) => {
        setFail(state => [...state, letter]);
        value.fail.push(letter);
        setTimeout(()=>updateValue(), 500);
    }

    const wrongAnswer = (letterObject) => {
        setTextarea('')
        nextLetter()
        Fail(letterObject)
        myAudioFail.play()
    }

    const reset = () => {
        setTextarea('')
        setCurrentLetter(0)
        setCorrect([])
        setFail([])
        setIsActive(false)
        setSecond(60)
        setIsOpen(false);
        
        value = {
            isOpen: false,
            currentLetter: 0,
            correct: [],
            fail: [],
            isActive: false
        };
        updateValue();
    }

    const toggleAnswer = () => {
        setIsOpen(prev => !prev);
        value.isOpen = !value.isOpen;
        updateValue();
    }

    useEffect(() => {
        let intervalId;
        if (isActive) {
            intervalId = setInterval(() => {
                setSecond(second => second - 1);
            }, 1000)
        }
        return () => clearInterval(intervalId);
    }, [isActive, second])


    const enter = (e, letterObject) => {
        if (e.which === 13) {
            e.preventDefault();
            check(letterObject);
            setTextarea('')
        }
    }

    const finishAudio = () => {
        if (currentLetter >= lettersLength) {
            if (correct.length > lettersLength / 2) {
                myAudioPassed.play()
            } else {
                myAudioNotPassed.play()
            }
        }
    }


    let letters = props.questions.filter(letter => letter.ask !== "")

    let lettersLength = letters.length

    return (
        <div className="flex donut__container"
        style={props.position ? {gridArea: props.position}: null}>
            <div className="donut__circle">
                <ul>
                    {props.questions.map((alphabeticObject, index) =>
                        <li className={`circle__item  
                        ${alphabeticObject.ask !== '' ? 'circle__item--on'  : ''}      

                        ${isActive && letters[currentLetter - 1]?.letter === alphabeticObject.letter ? 'circle__item--animation' : ''} 

                        ${(correct || []).includes(alphabeticObject.letter) ? 'circle__item--correct' : ''} 
                        ${(fail || []).includes(alphabeticObject.letter) ? 'circle__item--fail' : ''} 
                        `}>
                            {alphabeticObject.letter}
                        </li>
                    )
                    }
                </ul>



            </div>
            <div className="donut__text-container">
                <div className={currentLetter === 0 ? '' : 'none'}>
                    <p className='text'>A continuación, intenta averiguar las palabras de esta unidad en el menor tiempo posible. (Máximo 60 segundos)</p>
                    <button className='donut__button' onClick={nextLetter}>Comenzar</button>
                </div>
                <ul>
                    {currentLetter <= lettersLength ?
                        letters.filter((letterObject, i) => i === currentLetter - 1).map(letterObject =>
                            <li>
                                <div className="time__container">
                                    <img src={clock} alt="Reloj"></img>
                                    <p className="text"><span className="seconds">{second}</span> segundos</p>
                                </div>

                                <p className='text text--enunciate'>
                                    Con la <b>{letterObject.letter}</b>:
                        </p>
                                <p className='text'>
                                    <span>{letterObject.ask}</span>
                                </p>
                                <textarea className="text" id="rosco-text" type='text' value={textarea} onChange={textareaChange} onKeyPress={(e) => enter(e, letterObject)} ></textarea>
                                <div className="donut-button__container">
                                    <button className='donut__button' onClick={(e) => check(letterObject)}>Comprobar</button>
                                    <button className='donut__button  donut__button--red' onClick={(e) => wrongAnswer(letterObject.letter)}>Pasapalabra</button>
                                    {second === 0 ? wrongAnswer(letterObject.letter) : ''}

                                </div>
                            </li>
                        )
                        :
                        <li>
                            <h3 className="subtitle subtitle--enunciate">Resultados</h3>
                            <p className="text"><b>Aciertos:</b> {correct.length} de {lettersLength} </p>
                            <p className="text"><b>Tiempo empleado:</b> {timeConter} segundos</p>

                            {correct.length > lettersLength / 2 ?
                                <p className="text feedback feedback--correct">Enhorabuena has superado la prueba.</p>
                                :
                                <p className="text feedback feedback--incorrect">Lo sentimos no has superado la prueba.</p>
                            }

                            <div className="donut-button__container">
                                <button className='donut__button' onClick={reset}>Intentar de nuevo</button>
                                <button className='donut__button  donut__button--red' onClick={toggleAnswer}>Ver respuestas</button>
                            </div>

                            <ul className={isOpen ? 'donut__answer__container' : 'hidden'}>
                                {letters.map(alphabeticObject =>
                                    <li>
                                        <h5 className="donut__answer" style={{textTransform: 'capitalize'}}>{alphabeticObject.answer.split('|').join(', ')}</h5>
                                        <p className="text">{alphabeticObject.ask}</p>
                                    </li>
                                )
                                }
                            </ul>
                        </li>
                    }
                </ul>
            </div>
        </div>
    )
}