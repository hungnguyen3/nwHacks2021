import axios, { AxiosResponse } from 'axios';
import React, { useState } from 'react';
import QuestionBank, { Homework } from '../functions/QuestionBank';
import { TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';

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
            <form
                onSubmit={handleSubmit}
                style={{ display: 'flex', flexDirection: 'column' }}
            >
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-evenly',
                    }}
                >
                    <span>
                        <input
                            type="radio"
                            name="inputtype"
                            value="facts"
                            id="facts"
                            onChange={e => setRadioButton(e.target.value)}
                            defaultChecked
                        />
                        <label htmlFor="facts">Fact</label>
                    </span>
                    <span>
                        <input
                            type="radio"
                            name="inputtype"
                            value="qa"
                            id="qa"
                            onChange={e => setRadioButton(e.target.value)}
                        />
                        <label htmlFor="qa">Q&A</label>
                    </span>
                </div>
                {radioButton == 'qa' ? (
                    <>
                        <div>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Question"
                                type="text"
                            >
                                <p>Phone</p>
                                <input
                                    type="text"
                                    onChange={e => setQuestions(e.target.value)}
                                />
                            </TextField>
                        </div>
                        <div>
                            <TextField
                                id="outlined-basic"
                                variant="outlined"
                                label="Answer"
                                type="text"
                            >
                                <p>Phone</p>
                                <input
                                    type="text"
                                    onChange={e => setAnswers(e.target.value)}
                                />
                            </TextField>
                        </div>
                    </>
                ) : (
                    <div>
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Fact"
                            type="text"
                        >
                            <p>Phone</p>
                            <input
                                type="text"
                                onChange={e => setFacts(e.target.value)}
                            />
                        </TextField>
                    </div>
                )}
                <div>
                    <Button
                        style={{ minWidth: 110 }}
                        variant="contained"
                        type="submit"
                        onClick={() => handleGetQuestions()}
                    >
                        Add
                    </Button>
                </div>
            </form>
            <Button
                style={{ minWidth: 110 }}
                variant="contained"
                onClick={() => handleGetQuestions()}
            >
                Refresh
            </Button>
        </div>
    );
};

export default AddQuestions;
