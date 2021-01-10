/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import SList from './SList';
import Card from '@material-ui/core/Card';

interface Props {
    students: Contact[];
    sessionId: string;
    setStudents(newStudents: Contact[]): void;
}

export interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
}

const StudentsList: React.FC<Props> = ({
    students,
    sessionId,
    setStudents,
}) => {
    return (
        <div>
            {students.map(student => {
                return (
                    <SList
                        key={student._id}
                        list={student}
                        sessionId={sessionId}
                        students={students}
                        setStudents={setStudents}
                    />
                );
            })}
        </div>
    );
};

export default StudentsList;
