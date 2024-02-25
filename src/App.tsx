import { Header } from "./components/Header";
import { Sidebar } from "./components/Profile/Sidebar";
import styles from './App.module.css';
import { useState } from "react";
import { Header as ListHeader } from './components/List/Header'
import { Button } from "./components/Button";
import { PlusCircle } from "@phosphor-icons/react";
import { Item } from "./components/List/Item";
import { Empty } from "./components/List/Empty";
import { Input } from "./components/Input";
import Swal from "sweetalert2";

export interface ITask {
  id: number
  text: string
  isChecked: boolean
}

export function App() {
  const [tasks, setTasks] = useState<ITask[]>([])
  const [inputValue, setInputValue] = useState('')

  const checkedTasksCounter = tasks.reduce((prevValue, currentTask) => {
    if (currentTask.isChecked) {
      return prevValue + 1
    }

    return prevValue
  }, 0)

  function handleAddTask() {
    if (!inputValue) {
      return
    }

    const newTask: ITask = {
      id: new Date().getTime(),
      text: inputValue,
      isChecked: false,
    }

    setTasks((state) => [...state, newTask])
    setInputValue('')
  }

  function handleRemoveTask(id: number) {
    Swal.fire({
      title: "Deseja mesmo apagar essa tarefa?",
      text: "Você não poderá reverter essa ação!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sim, apague a tarefa!",
      cancelButtonText: "Não, cancele!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Apagado!",
          text: "Sua tarefa foi removida com sucesso.",
          icon: "success"
        });
        const filteredTasks = tasks.filter((task) => task.id !== id)
        setTasks(filteredTasks)
      }
    });
}
   
  function handleToggleTask({ id, value }: { id: number; value: boolean }) {
    const updatedTasks = tasks.map((task) => {
      if (task.id === id) {
        return { ...task, isChecked: value }
      }

      return { ...task }
    })

    setTasks(updatedTasks)
  }

  return (
    <div>
      <Header/>
      <div className={styles.wrapper}>
        <Sidebar
        tasksCounter={tasks.length}
        checkedTasksCounter={checkedTasksCounter}
        />
        <main>
        <section className={styles.content}>
        <div className={styles.taskInfoContainer}>
          <Input
            onChange={(e) => setInputValue(e.target.value)}
            value={inputValue}
          />
          <Button onClick={handleAddTask}>
            Criar
            <PlusCircle size={16} color="#f2f2f2" weight="bold" />
          </Button>
        </div>

        <div className={styles.tasksList}>
          <ListHeader
            tasksCounter={tasks.length}
            checkedTasksCounter={checkedTasksCounter}
          />

          {tasks.length > 0 ? (
            <div>
              {tasks.map((task) => (
                <Item
                  key={task.id}
                  data={task}
                  removeTask={handleRemoveTask}
                  toggleTaskStatus={handleToggleTask}
                />
              ))}
            </div>
          ) : (
            <Empty />
          )}
        </div>

        </section>
        </main>
     </div>
    </div>
  )
}