

import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { START_TYPING, END_TYPING, HANDLE_KEY_PRESS } from '../Actions/actions';

const TouchTypingApp = ({
    currentKey,
    // typedKeys,
    accuracy,
    startTime,
    endTime,
    typingSpeed,
    randomString,
    startTyping,
    endTyping,
    handleKeyPress,
}) => {
    const [typedKeys, setTypekeys] = useState("");
    const keyboardLayout = ['a', 's', 'd', 'f', 'j', 'k', 'l', ';'];
    const [typingMessage, setTypingMessage] = useState('');

    const generateRandomString = () => {
        const length = 10;
        let string = '';
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * keyboardLayout.length);
            string += keyboardLayout[randomIndex];
        }
        return string;
    };

    const handleKeyPressWithDispatch = (event) => {
        const { key } = event;
        if (keyboardLayout.includes(key)) {
            handleKeyPress({ currentKey: key, typedKeys: typedKeys + key });
        } else {
            // Show the message for wrong key pressed
            setTypingMessage('Wrong key pressed!');
            setTimeout(() => {
                setTypingMessage('');
            }, 1000);
        }
    };

    const calculateAccuracy = () => {
        const typedLength = typedKeys.length;
        const correctKeys = typedKeys
            .split('')
            .filter((key, index) => key === randomString.charAt(index));
        const correctLength = correctKeys.length;
        const calculatedAccuracy = (correctLength / typedLength) * 100;
        return calculatedAccuracy;
    };

    const calculateTypingSpeed = () => {
        const timeInSeconds = (endTime - startTime) / 1000;
        const charactersTyped = typedKeys.length;
        const calculatedTypingSpeed = charactersTyped / timeInSeconds;
        return calculatedTypingSpeed;
    };

    const startTypingWithDispatch = () => {
        setTypekeys("");
        startTyping({
            currentKey: keyboardLayout[0],
            randomString: generateRandomString(),
        });
    };

    const endTypingWithDispatch = () => {
        const isCorrect = typedKeys === randomString;
        if (isCorrect) {
            setTypingMessage('Correct string is typed!');
        } else {
            setTypingMessage('The typed string is not correct.');
        }

        setTimeout(() => {
            setTypingMessage('');
        }, 3000);

        endTyping({
            accuracy: calculateAccuracy(),
            typingSpeed: calculateTypingSpeed(),
        });
    };

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPressWithDispatch);
        return () => {
            document.removeEventListener('keydown', handleKeyPressWithDispatch);
        };
    }, [typedKeys]);

    return (
        <div>
            <h1>Typing Tutor</h1>
            <div>
                <h2>Keyboard Layout</h2>
                <div className="keyboard">
                    {keyboardLayout.map((key) => (
                        <div key={key} className={`key ${currentKey === key ? 'active' : ''}`}>
                            {key}
                        </div>
                    ))}
                </div>
            </div>
            <button onClick={startTypingWithDispatch}>Start Typing</button>

            <div>
                <h2>Random String</h2>
                <div className="typing-area-container">
                    <div className="typing-area" contentEditable="true">
                        {randomString}
                    </div>
                </div>
                <h2>Typing Area</h2>
                <div className="typing-area-container">
                    {/* <div className="typing-area" contentEditable="true">
                        {typedKeys}
                    </div> */}
                    <input value={typedKeys} className="typing-area" type="text" onChange={(e) => {
                        setTypekeys(e.target.value);
                    }} />

                </div>
            </div>
            <div className="typing-message">{typingMessage}</div>
            <div>
                <button onClick={endTypingWithDispatch}>End Typing</button>
            </div>
            <div className="performance-metrics">
                <h2>Performance Metrics</h2>
                <p className="accuracy">Accuracy: {accuracy.toFixed(2)}%</p>
                <p className="typing-speed">Typing Speed: {typingSpeed.toFixed(2)} characters per second</p>
            </div>

        </div>
    );
};

const mapStateToProps = (state) => ({
    currentKey: state.currentKey,
    // typedKeys: state.typedKeys,
    accuracy: state.accuracy,
    startTime: state.startTime,
    endTime: state.endTime,
    typingSpeed: state.typingSpeed,
    randomString: state.randomString,
});



const mapDispatchToProps = (dispatch) => ({
    startTyping: (payload) => dispatch({ type: START_TYPING, payload }),
    endTyping: (payload) => dispatch({ type: END_TYPING, payload }),
    handleKeyPress: (payload) => dispatch({ type: HANDLE_KEY_PRESS, payload }),
});

export default connect(mapStateToProps, mapDispatchToProps)(TouchTypingApp);
