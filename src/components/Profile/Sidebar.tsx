import ProgressBar from '@ramonak/react-progress-bar';
import { Avatar } from './Avatar';
import { useState, useEffect } from 'react';
import styles from './Sidebar.module.css';

interface SidebarProps {
  tasksCounter: number;
  checkedTasksCounter: number;
}

export function Sidebar({ tasksCounter, checkedTasksCounter }: SidebarProps) {
  const [completedPercentage, setCompletedPercentage] = useState(0);

  useEffect(() => {
    if (tasksCounter > 0) {
      const percentage = (checkedTasksCounter / tasksCounter) * 100;
      setCompletedPercentage(percentage);
    } else {
      setCompletedPercentage(0);
    }
  }, [tasksCounter, checkedTasksCounter]);

  return (
    <aside className={styles.sidebar}>
      <img
        className={styles.cover}
        src="https://images.unsplash.com/photo-1605379399642-870262d3d051?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=50"
      />

      <div className={styles.profile}>
        <Avatar src="https://github.com/tamires-galvao.png" />
        <strong>Tamires Galvão</strong>
      </div>

      <footer>
        <div className={styles.title_progressbar}>
          <p>Progresso</p>
        </div>
        <ProgressBar 
        completed={completedPercentage}
        bgColor = '#8284fa'
        />
      </footer>
    </aside>
  );
}
