import React from 'react';
import TestSMS from './TestSMS';
import { v4 as uuid } from 'uuid';

interface Props {
    sessionId : string;
}

function SendSMS({sessionId} : Props) {
    const[homework, setHomework] = useState([]);
    const[homeworkFromBackend, setHomeworkFromBackend] = useState([]);

    const itemsFromBackend = [
        { id: uuid(), content: "First task" },
        { id: uuid(), content: "Second task" },
        { id: uuid(), content: "Third task" },
        { id: uuid(), content: "Fourth task" },
        { id: uuid(), content: "Fifth task" }
      ];

    async function getHomeWork() {
        return fetch('http://localhost:8080/api/v1/homework/get', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId: sessionId })
        })
            .then(data => data.json())
    }

    const handleGetHomeWork = async () => {
        const data = await getHomeWork();
        console.log("SMS");
        console.log(data);
        //console.log(data.students[0]);
        //getHomeWork(data.students);
        setHomework(data.homework);
    }

    useEffect(() => {
        handleGetHomeWork();
    }, []);

    function gethomeworkFromBackend()
    {
        homework.map((homework, i) => {
            homeworkFromBackend.push({id:homework._id, content:"test"})
            console.log(homeworkFromBackend.length);
        })
        console.log("hwbackend2");
        console.log(homeworkFromBackend);
        console.log(itemsFromBackend);
    }

    return (
        <div>
            {gethomeworkFromBackend()}
            <TestSMS itemsFromBackend={homeworkFromBackend}></TestSMS>
        </div>
    )
}

export default SendSMS;
