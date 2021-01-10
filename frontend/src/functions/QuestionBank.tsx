import React from 'react'
import List from './List'

function QuestionBank({questions, sessionId, handleGetQuestions}) {

    function refresh(){
        this.props.handleGetQuestions()
    }

    return (
        questions.map(questions => {
            return <List key={questions._id} list={questions} sessionId={sessionId} handleGetStudents = {handleGetQuestions}/>
        }) 
    )
}

export default QuestionBank