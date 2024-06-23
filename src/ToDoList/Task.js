import './Task.css';

export default function Task({ task, tellParent }) {

    const toggleTask = () => {
        const newTask = { ...task, completed: !task.completed }
        console.log("newtask ",newTask)
        tellParent(newTask)
    }

    return <>
        {task.completed === true ?
            <li>
                <span onClick={() => toggleTask()}><s>{task.text}</s></span>
            </li>
            :
            <li>
                <span onClick={() => toggleTask()}>{task.text}</span>
            </li>
        }
    </>
};
