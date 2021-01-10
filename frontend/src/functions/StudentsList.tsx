import React from 'react';
import List from './List';

interface Props {
    students: [Contact];
    sessionId: string;
    handleGetStudents: void;
}

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
}

const StudentsList: React.FC<Props> = ({
    students,
    sessionId,
    handleGetStudents,
}) => {
    return (
        <>
            {students.map(student => {
                return (
                    <List
                        key={student._id}
                        list={student}
                        sessionId={sessionId}
                        handleGetStudents={handleGetStudents}
                    />
                );
            })}
        </>
    );
};

export default StudentsList;
