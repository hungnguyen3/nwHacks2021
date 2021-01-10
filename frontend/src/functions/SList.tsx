import React from 'react';
import DeleteStudent from './DeleteStudent';
import { ListItem, ListItemIcon } from '@material-ui/core';
import Card from '@material-ui/core/Card';

interface Props {
    list: Contact;
    sessionId: string;
    handleGetStudents(): void;
}

interface Contact {
    _id: string;
    firstName: string;
    lastName: string;
    phone: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SList: React.FC<Props> = ({ list, sessionId, handleGetStudents }) => {
    // function refresh() {
    //     this.props.refresh();
    // }

    return (
        <div
            style={{
                padding: 10,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <Card
                style={{
                    padding: 10,
                    minWidth: 200,
                    minHeight: 150,
                    maxWidth: 200,
                    maxHeight: 150,
                }}
            >
                <p style={{ justifyContent: 'center' }}>
                    Name: {list.firstName} {list.lastName}
                </p>
                <p>Phone Number: {list.phone}</p>

                <DeleteStudent
                    sessionId={sessionId}
                    uId={list._id}
                    handleGetStudents={handleGetStudents}
                />
            </Card>
        </div>
    );
};

export default SList;
