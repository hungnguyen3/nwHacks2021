import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import QuestionBank, { Homework } from '../functions/QuestionBank';

interface Props {
    sessionId: string;
}
interface Question {
    sessionId?: string;
    type: 1 | 2 | 3;
    input: [string, string | null];
}

const AddQuestions: React.FC<Props> = ({ sessionId }) => {
    const [questionBank, setQuestionBank]: [
        Homework[],
        React.Dispatch<[]>
    ] = useState([]);
    const [radioButton, setRadioButton] = useState('');
    const [facts, setFacts] = useState('');
    const [questions, setQuestions] = useState('');
    const [answers, setAnswers] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const isFacts = radioButton === 'facts';
        const question: Question = {
            sessionId: sessionId,
            type: isFacts ? 1 : 2,
            input: isFacts ? [facts, null] : [questions, answers],
        };
        axios
            .post('http://localhost:8080/api/v1/homework/add', { ...question })
            .then(res => console.log(res.data))
            .catch(err => console.error(err));
    };

    const handleGetQuestions = () => {
        axios
            .post('http://localhost:8080/api/v1/homework/get', {
                sessionId: sessionId,
            })
            .then((res: AxiosResponse<{ homework: [] }>) =>
                setQuestionBank(res.data.homework)
            )
            .catch(err => console.error(err));
    };

    // useEffect(()=>{
    //     handleGetQuestions();
    // }, []);

    return (
        <div>
            <h1>Question Bank</h1>
            <QuestionBank
                questionBank={questionBank}
                sessionId={sessionId}
                handleGetQuestions={handleGetQuestions}
            />

            <h1>Add Questions & Facts</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Fact</h2>
                    <input
                        type="radio"
                        name="inputtype"
                        value="facts"
                        onChange={e => setRadioButton(e.target.value)}
                        defaultChecked
                    />
                    <h2>Q&A</h2>
                    <input
                        type="radio"
                        name="inputtype"
                        value="qa"
                        onChange={e => setRadioButton(e.target.value)}
                    />
                </label>
                {radioButton == 'qa' ? (
                    <>
                        <label>
                            <p>Question</p>
                            <input
                                type="text"
                                onChange={e => setQuestions(e.target.value)}
                            />
                        </label>
                        <label>
                            <p>Answer</p>
                            <input
                                type="text"
                                onChange={e => setAnswers(e.target.value)}
                            />
                        </label>
                    </>
                ) : (
                    <label>
                        <p>Fact</p>
                        <input
                            type="text"
                            onChange={e => setFacts(e.target.value)}
                        />
                    </label>
                )}
                <div>
                    <button type="submit" onClick={() => handleGetQuestions()}>
                        Add
                    </button>
                </div>
            </form>
            <button onClick={() => handleGetQuestions()}>Refresh</button>
        </div>
    );
};

export default AddQuestions;
