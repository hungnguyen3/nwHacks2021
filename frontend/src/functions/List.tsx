/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import React from 'react';
import DeleteStudent from './DeleteStudent';

interface Props {
    list: Contact;
    sessionId: string;
    handleGetStudents: void;
}

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const List: React.FC<Props> = ({ list, sessionId, handleGetStudents }) => {
    // function refresh() {
    //     this.props.refresh();
    // }

    return (
        <div>
            <label>
                Name: {list.firstName} {list.lastName}
                Phone Number: {list.phone}
                <DeleteStudent
                    sessionId={sessionId}
                    uId={list._id}
                    // handleGetStudents={handleGetStudents}
                />
            </label>
        </div>
    );
};

export default List;
