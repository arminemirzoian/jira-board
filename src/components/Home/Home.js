import React, {useState} from 'react';
import {DragDropContext, Droppable, Draggable} from "react-beautiful-dnd";
import _ from "lodash";
import {v4} from "uuid";
import './Home.css';

const item1 = {
    id: v4(),
    name: "Study Firebase"
}

const item2 = {
    id: v4(),
    name: "Create todo list"
}

const item3 = {
    id: v4(),
    name: "Refactor code"
}
const item4 = {
    id: v4(),
    name: "Create login-register page"
}


function Home({handleLogout}) {
    const [text, setText] = useState("")
    const [state, setState] = useState({
        "todo": {
            title: "Todo",
            items: [item1, item2]
        },
        "in-progress": {
            title: "In Progress",
            items: [item3]
        },
        "done": {
            title: "Completed",
            items: [item4]
        }
    })

    const handleDragEnd = ({destination, source}) => {
        if (!destination) {
            return
        }

        if (destination.index === source.index && destination.droppableId === source.droppableId) {
            return
        }

        // Creating a copy of item before removing it from state
        const itemCopy = {...state[source.droppableId].items[source.index]}

        setState(prev => {
            prev = {...prev}
            // Remove from previous items array
            prev[source.droppableId].items.splice(source.index, 1)


            // Adding to new items array location
            prev[destination.droppableId].items.splice(destination.index, 0, itemCopy)

            return prev
        })
    }

    const addItem = () => {
        if(text) {
            setState(prev => {
                return {
                    ...prev,
                    todo: {
                        title: "To do",
                        items: [
                            {
                                id: v4(),
                                name: text
                            },
                            ...prev.todo.items
                        ]
                    }
                }
            })

            setText("")
        }
    }
/*
 const deleteItem = (e) => {
        console.log(e.target.id)
     setState(prev => prev.filter((item) => item.id !== e.target.id));
    }
*/



return (
        <div className="App">
            <div>
                <nav className='nav-home'>
                    <h2>Welcome to your page!</h2>
                    <button onClick={handleLogout} className='logout-btn'>Logout</button>
                </nav>
                <h4>Projects/Inomma Internship</h4>
                <h2>Board</h2>
                <div className={"dataInput"}>
                    <input type="text" value={text} onChange={(e) => setText(e.target.value)}/>
                    <button onClick={addItem}> Create issue</button>
                </div>
                <div className={"dataFlex"}>
                    <DragDropContext onDragEnd={handleDragEnd}>
                        {_.map(state, (data, key) => {
                            return(
                                <div key={key} className={"column"}>
                                    <h5 className={"dataTitle"}>{data.title}</h5>
                                    <Droppable droppableId={key}>
                                        {(provided, snapshot) => {
                                            return(
                                                <div
                                                    ref={provided.innerRef}
                                                    {...provided.droppableProps}
                                                    className={"droppable-col"}
                                                >
                                                    {data.items.map((el, index) => {
                                                        return(
                                                            <Draggable key={el.id} index={index} draggableId={el.id}>
                                                                {(provided, snapshot) => {
                                                                    console.log(snapshot)
                                                                    return(
                                                                        <div
                                                                            className={`item ${snapshot.isDragging && "dragging"}`}
                                                                            ref={provided.innerRef}
                                                                            {...provided.draggableProps}
                                                                            {...provided.dragHandleProps}
                                                                        >
                                                                            {el.name}
                                                                            {/*<span id={el.id} onClick={(e) => deleteItem(e)} > X</span>*/}
                                                                        </div>
                                                                    )
                                                                }}
                                                            </Draggable>
                                                        )
                                                    })}
                                                    {provided.placeholder}
                                                </div>
                                            )
                                        }}
                                    </Droppable>
                                </div>
                            )
                        })}
                    </DragDropContext>
                </div>
            </div>
        </div>
    );
}

export default Home;