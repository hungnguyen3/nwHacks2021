/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useState } from 'react';
import TestSMS, { TestItem } from './TestSMS';
import { v4 as uuid } from 'uuid';
import axios from 'axios';

interface Props {
    sessionId: string;
}

interface Homework {
    _id: string;
    input: [string, string | null];
    user?: string;
    type: 1 | 2 | 3;
}

const SendSMS: React.FC<Props> = ({ sessionId }) => {
    const [homework, setHomework]: [Homework[], React.Dispatch<[]>] = useState(
        []
    );
    const [homeworkFromBackend, setHomeworkFromBackend] = useState([]);

    const itemsFromBackend = [
        { id: uuid(), content: 'First task' },
        { id: uuid(), content: 'Second task' },
        { id: uuid(), content: 'Third task' },
        { id: uuid(), content: 'Fourth task' },
        { id: uuid(), content: 'Fifth task' },
    ];

    const handleGetHomeWork = () => {
        axios
            .post('http://localhost:8080/api/v1/homework/get', {
                sessionId,
            })
            .then((res: { data: { homework: [] } }) =>
                setHomework(res.data.homework)
            )
            .catch(err => console.error(err));
    };

    useEffect(() => {
        handleGetHomeWork();
    }, []);

    function gethomeworkFromBackend() {
        // homework.map((homework, i) => {
        //     homeworkFromBackend.push({ id: homework._id, content: 'test' });
        //     console.log(homeworkFromBackend.length);
        // });
        // console.log('hwbackend2');
        // console.log(homeworkFromBackend);
        // console.log(itemsFromBackend);

        return homework.reduce((res: JSX.Element[], hw) => {
            res.push();
            return res;
        }, []);
    }

    return (
        <div>
            {gethomeworkFromBackend()}
            <TestSMS
                sessionId={sessionId}
                itemsFromBackend={homeworkFromBackend}
            ></TestSMS>
        </div>
    );
};

export default SendSMS;
