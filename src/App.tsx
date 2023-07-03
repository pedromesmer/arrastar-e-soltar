import React, { useState } from 'react';
import './App.css';

import {
  DragDropContext,
  Draggable,
  DropResult,
  Droppable,
} from 'react-beautiful-dnd';

const listItems = [
  {
    id: '1',
    name: 'Item 1',
  },
  {
    id: '2',
    name: 'Item 2',
  },
  {
    id: '3',
    name: 'Item 3',
  },
  {
    id: '4',
    name: 'Item 4',
  },
  {
    id: '5',
    name: 'Item 5',
  },
];

const App: React.FC = () => {
  const [todo, setTodo] = useState(listItems);

  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 10,
    margin: `0 50px 15px 50px`,
    background: isDragging ? '#4a2975' : 'white',
    color: isDragging ? 'white' : 'black',
    border: '1px solid black',
    fontSize: '20px',
    borderRadius: '5px',

    ...draggableStyle,
  });

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) {
      return;
    }

    const items = Array.from(todo);
    const [newOrder] = items.splice(source.index, 1);

    items.splice(destination.index, 0, newOrder);

    setTodo(items);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="list1">
        {provided => (
          <ul
            className="characters"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {todo.map(({ id, name }, index) => {
              return (
                <Draggable key={id} draggableId={id} index={index}>
                  {(providedDraggabe, snapshot) => (
                    <div
                      ref={providedDraggabe.innerRef}
                      {...providedDraggabe.draggableProps}
                      {...providedDraggabe.dragHandleProps}
                      style={getItemStyle(
                        snapshot.isDragging,
                        providedDraggabe.draggableProps.style,
                      )}
                    >
                      <p>{name}</p>
                    </div>
                  )}
                </Draggable>
              );
            })}
          </ul>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default App;
