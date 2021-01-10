import React, { useState } from 'react'

function AddQuestions({ sessionId }:any) {
    const [questionBank, setQuestionBank] = useState()
    const [radioButton, setRadioButton] = useState('')
    const [facts, setFacts] = useState('');
    const [questions, setQuestions] = useState('');
    const [answers, setAnswers] = useState('');

    async function addQuestion(credentials : any) {
        console.log(credentials)
        return fetch('http://localhost:8080/api/v1/homework/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(credentials)
        })
            .then(data => data.json())
    }

    const handleSubmit = async (e : any) => {
        e.preventDefault();
        const token = await addQuestion((() => {
            console.log("radioButton value is")
            console.log(radioButton);
            let obj = { sessionId: sessionId };
            if (radioButton === "facts") {
                obj.type = 1;
                obj.input = [facts];
            } else {
                obj.type = 2;
                obj.input = [questions, answers]
            }
            return obj;
        })());
    }

    return (
        <div>
            <h1>Question Bank</h1>
            <h1>Add Questions & Facts</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Fact</h2>
                    <input type="radio" name="inputtype" value="facts" onChange={e => setRadioButton(e.target.value)} defaultChecked/>
                    <h2>Q&A</h2>
                    <input type="radio" name="inputtype" value="qa" onChange={e => setRadioButton(e.target.value)}/>
                </label>
                {
                    radioButton == "qa" ?
                        <>
                        <label>
                            <p>Question</p>
                            <input type="text" onChange={e => setQuestions(e.target.value)} />
                        </label>
                        <label>
                                <p>Answer</p>
                                <input type="text" onChange={e => setAnswers(e.target.value)} />
                        </label>
                        </> :

                        <label>
                            <p>Fact</p>
                            <input type="text" onChange={e => setFacts(e.target.value)} />
                        </label>
                }
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddQuestions
