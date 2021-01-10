/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { HomeWork } from '@material-ui/icons';
import React, { useEffect, useState } from 'react';
import {
    DragDropContext,
    Draggable,
    Droppable,
    DropResult,
} from 'react-beautiful-dnd';
import { v4 as uuid } from 'uuid';

const onDragEnd = (
    result: DropResult,
    columns: { [x: string]: any },
    setColumns: {
        (
            value: React.SetStateAction<{
                [x: string]: { name: string; items: any };
            }>
        ): void;
        (arg0: any): void;
    }
) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
        const sourceColumn = columns[source.droppableId];
        const destColumn = columns[destination.droppableId];
        const sourceItems = [...sourceColumn.items];
        const destItems = [...destColumn.items];
        const [removed] = sourceItems.splice(source.index, 1);
        destItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...sourceColumn,
                items: sourceItems,
            },
            [destination.droppableId]: {
                ...destColumn,
                items: destItems,
            },
        });
    } else {
        const column = columns[source.droppableId];
        const copiedItems = [...column.items];
        const [removed] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removed);
        setColumns({
            ...columns,
            [source.droppableId]: {
                ...column,
                items: copiedItems,
            },
        });
    }
};

interface Props {
    itemsFromBackend: TestItem[];
}

export interface TestItem {
    id: string;
    content: string;
}

const App: React.FC<Props> = ({ itemsFromBackend }) => {
    const testitemsFromBackend = [
        { id: '5ffae5185b4dd379c805a281', content: 'test' },
        { id: '5ffae5185b4dd379c805a282', content: 'test' },
        { id: '5ffae5185b4dd379c805a283', content: 'test' },
        { id: '5ffae5185b4dd379c805a284', content: 'test' },
        { id: '5ffae5185b4dd379c805a285', content: 'test' },
    ];

    const testcolumnsFromBackend = {
        [uuid()]: {
            name: 'Question Bank',
            items: testitemsFromBackend,
        },
        [uuid()]: {
            name: 'To Send',
            items: [],
        },
    };

    const columnsFromBackend = {
        [uuid()]: {
            name: 'Question Bank',
            items: itemsFromBackend,
        },
        [uuid()]: {
            name: 'To Send',
            items: [],
        },
    };

    //{console.log("help")}
    //{console.log(columnsFromBackend)}

    const [columns, setColumns] = useState(columnsFromBackend);

    return (
        //console.log(itemsFromBackend),
        //console.log(columnsFromBackend),
        //console.log(testcolumnsFromBackend),
        <div
            style={{
                display: 'flex',
                justifyContent: 'center',
                height: '100%',
            }}
        >
            <DragDropContext
                onDragEnd={result => onDragEnd(result, columns, setColumns)}
            >
                {Object.entries(columns).map(([columnId, column], _index) => {
                    return (
                        <div
                            style={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                            key={columnId}
                        >
                            <h2>{column.name}</h2>
                            <div style={{ margin: 8 }}>
                                <Droppable
                                    droppableId={columnId}
                                    key={columnId}
                                >
                                    {(provided, snapshot) => {
                                        return (
                                            <div
                                                {...provided.droppableProps}
                                                ref={provided.innerRef}
                                                style={{
                                                    background: snapshot.isDraggingOver
                                                        ? 'lightblue'
                                                        : 'lightgrey',
                                                    padding: 4,
                                                    width: 250,
                                                    minHeight: 500,
                                                }}
                                            >
                                                {column.items.map(
                                                    (
                                                        item: {
                                                            id: string;
                                                            content: React.ReactNode;
                                                        },
                                                        index: number
                                                    ) => {
                                                        return (
                                                            <Draggable
                                                                key={item.id}
                                                                draggableId={
                                                                    item.id
                                                                }
                                                                index={index}
                                                            >
                                                                {(
                                                                    provided,
                                                                    snapshot
                                                                ) => {
                                                                    return (
                                                                        <div
                                                                            ref={
                                                                                provided.innerRef
                                                                            }
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                            style={{
                                                                                userSelect:
                                                                                    'none',
                                                                                padding: 16,
                                                                                margin:
                                                                                    '0 0 8px 0',
                                                                                minHeight:
                                                                                    '50px',
                                                                                backgroundColor: snapshot.isDragging
                                                                                    ? '#263B4A'
                                                                                    : '#456C86',
                                                                                color:
                                                                                    'white',
                                                                                ...provided
                                                                                    .draggableProps
                                                                                    .style,
                                                                            }}
                                                                        >
                                                                            {
                                                                                item.content
                                                                            }
                                                                        </div>
                                                                    );
                                                                }}
                                                            </Draggable>
                                                        );
                                                    }
                                                )}
                                                {provided.placeholder}
                                            </div>
                                        );
                                    }}
                                </Droppable>
                            </div>
                        </div>
                    );
                })}
            </DragDropContext>
        </div>
    );
};

export default App;
