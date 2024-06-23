import "./styles.css";
import Header from "./Header/Header.js";
import ToDoList from "./ToDoList/ToDoList";

const listOfTasks = [
  { id: 1, text: "Read SpringBoot", completed: false },
  { id: 2, text: "Complete assignments", completed: false },
  { id: 3, text: "Prepare breakfast", completed: false },
  { id: 4, text: "Sleep for 5 hours", completed: false },
  { id: 5, text: "Take a shower", completed: true }]

export default function App() {

  return (
    <div className="Application">
      <Header />
      <hr />

      <ToDoList listOfTasks={listOfTasks} />

    </div>
  );
}
