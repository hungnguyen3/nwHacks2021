/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import List from './List';
// import DeleteQuestion from './DeleteQuestion';

export interface Homework {
    _id: string;
    input: [string, string];
    user: string;
    type: 1 | 2 | 3;
}
interface Props {
    questionBank: Homework[];
    sessionId?: string;
    handleGetQuestions(): void;
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
        <div>
            {questionBank.map(questions => {
                return (
                    <div>
                        <label key={questions._id}>
                            {questions.input[1] == null ? (
                                <label>Fact: {questions.input[0]}</label>
                            ) : (
                                <label>
                                    Question: {questions.input[0]} Answer:{' '}
                                    {questions.input[1]}
                                </label>
                            )}
                            {/* <DeleteQuestion
                                sessionId={sessionId}
                                uId={questions._id}
                                handleGetQuestions={handleGetQuestions}
                            /> */}
                        </label>
                    </div>
                    // <List
                    //     key={questions._id}
                    //     list={questions}
                    //     sessionId={sessionId}
                    //     handleGetQuestions={handleGetQuestions}
                    // />
                );
            })}
        </div>
    );
};

export default QuestionBank;
