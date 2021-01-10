import React, { useState } from 'react'

function AddQuestions({ sessionId }) {
    const [questionBank, setQuestionBank] = useState([{ "_id": { "$oid": "5ffa70ac2abae473000bcdd1" }, "user": { "$oid": "5ffa5db0c1c7da5b944c7437" }, "firstName": "Hung", "lastName": "Nguyen", "phone": 7781234567 }])
    const [radioButton, setRadioButton] = useState()
    const [facts, setFacts] = useState();
    const [questions, setQuestions] = useState();
    const [answers, setAnswers] = useState();

    async function addQuestion(credentials) {
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

    const handleSubmit = async e => {
        e.preventDefault();
        const token = await addQuestion((() => {
            let obj = { sessionId: sessionId.sessionId };
            if (radioButton === "facts") {
                obj.type = 1;
                obj.content = [facts];
            } else {
                obj.type = 2;
                obj.content = [questions, answers]
            }
            return obj;
        })());
    }

    return (
        <div>
            <h1>Add Questions & Facts</h1>
            <form onSubmit={handleSubmit}>
                <label>
                    <h2>Facts</h2>
                    <input type="radio" name="inputtype" value="facts" onChange={e => setRadioButton(e.target.value)} checked />
                    <h2>Q&A</h2>
                    <input type="radio" name="inputtype" value="qa" onChange={e => setRadioButton(e.target.value)}/>
                </label>
                {
                    radioButton == "facts" ?
                        <label>
                            <p>Fact</p>
                            <input type="text" onChange={e => setFacts(e.target.value)} />
                        </label> :
                        <>
                            <label>
                                <p>Question</p>
                                <input type="text" onChange={e => setQuestions(e.target.value)} />
                            </label>
                            <label>
                                <p>Answer</p>
                                <input type="text" onChange={e => setAnswers(e.target.value)} />
                            </label>
                        </>
                }
                <div>
                    <button type="submit">Add</button>
                </div>
            </form>
        </div>
    )
}

export default AddQuestions
