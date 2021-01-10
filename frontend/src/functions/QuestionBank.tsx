import React from 'react';
import List from './List';

interface Homework {
    _id: string;
    input: [string, string];
    user: string;
    type: 1 | 2 | 3;
}
interface Props {
    questionBank: [Homework];
    sessionId?: string;
    handleGetQuestions: void;
}

const QuestionBank: React.FC<Props> = ({
    questionBank,
    sessionId,
    handleGetQuestions,
}) => {
    // function refresh() {
    //     this.props.handleGetQuestions();
    // }

    return (
        <>
            {questionBank.map(questions => {
                return (
                    <List
                        key={questions._id}
                        list={questions}
                        sessionId={sessionId}
                        handleGetQuestions={handleGetQuestions}
                    />
                );
            })}
        </>
    );
};

export default QuestionBank;
