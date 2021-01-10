import React from 'react'
import List from './List'

function QuestionBank({questionBank, sessionId, handleGetQuestions}) {

    function refresh(){
        this.props.handleGetQuestions()
    }

    return (
        questionBank.map(questions => {
            return <List key={questions._id} list={questions} sessionId={sessionId} handleGetQuestions = {handleGetQuestions}/>
        }) 
    )
}

export default QuestionBank