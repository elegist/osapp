import {Component} from 'react';
import ReadingTask from './osa_tasks/ReadingTask';
import QuizTask from './osa_tasks/QuizTask';
import InteractiveTask from './osa_tasks/InteractiveTask';

import generalTasksData from '../data/generalTasksData.json';
import csTasksData from '../data/csTasksData.json';
import avTasksData from '../data/avTasksData.json';
import gdTasksData from '../data/gdTasksData.json';

/**
 * TaskManager
 * Manages the assessment process, task and topic lists and so on.
 */
export default class TaskManager extends Component {
  // singleton instance
  static managerInstance = null;
  // fields
  _topics = null;
  _tasksMap = null;

  constructor(props) {
    super(props);
    this.initTaskManager();
  }

  /**
   * Get a singleton instance of this class
   * @returns {TaskManager}
   */
  static getInstance() {
    if (TaskManager.managerInstance == null) {
      TaskManager.managerInstance = new TaskManager();
    }

    return this.managerInstance;
  }

  /**
   * Populates TaskManager with initial data.
   * All data should be stored in database and retreived from here
   */
  initTaskManager = () => {
    // TODO: Read topics, tasks and more from database. Hard coded for testing purposes
    this._topics = [
      'Allgemein',
      'Informatik',
      'Audiovisuelle Medien',
      'Graphische Datenverarbeitung',
    ];
    // let generalTasks = [
    //   new ReadingTask({
    //     title: generalTasksData.tasks[0].title,
    //     topic: 'Allgemein',
    //     text: generalTasksData.tasks[0].text,
    //   }),
    //   new QuizTask({title: 'QuizTask 1', topic: 'Allgemein'}),
    //   new InteractiveTask({title: 'InteractiveTask 1', topic: 'Allgemein'}),
    // ];
    // let csTasks = [
    //   new ReadingTask({title: 'ReadingTask Informatik 1', topic: 'Informatik'}),
    //   new QuizTask({title: 'QuizTask Informatik 1', topic: 'Informatik'}),
    //   new InteractiveTask({
    //     title: 'InteractiveTask Informatik 1',
    //     topic: 'Informatik',
    //   }),
    // ];
    // let avTasks = [
    //   new ReadingTask({
    //     title: 'ReadingTask AV 1',
    //     topic: 'Audiovisuelle Medien',
    //   }),
    //   new QuizTask({title: 'QuizTask AV 1', topic: 'Audiovisuelle Medien'}),
    //   new InteractiveTask({
    //     title: 'InteractiveTask AV 1',
    //     topic: 'Audiovisuelle Medien',
    //   }),
    // ];
    // let gdTasks = [
    //   new ReadingTask({
    //     title: 'ReadingTask GD 1',
    //     topic: 'Graphische Datenverarbeitung',
    //   }),
    //   new QuizTask({
    //     title: 'QuizTask GD 1',
    //     topic: 'Graphische Datenverarbeitung',
    //   }),
    //   new InteractiveTask({
    //     title: 'InteractiveTask GD 1',
    //     topic: 'Graphische Datenverarbeitung',
    //   }),
    // ];
    // let tasksArray = [generalTasks, csTasks, avTasks, gdTasks];

    let generalTasks = [];

    generalTasksData.tasks.forEach(task => {
      let newTask;
      switch (task.type) {
        case 'reading':
          newTask = new ReadingTask({
            topic: generalTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        case 'quiz':
          newTask = new QuizTask({
            topic: generalTasksData.topic,
            question: task.question,
            choices: task.choices,
            correctChoice: task.correctChoice,
          });
          break;
        case 'interactive':
          newTask = new InteractiveTask({
            topic: generalTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        default:
          break;
      }

      generalTasks.push(newTask);
    });

    let csTasks = [];

    csTasksData.tasks.forEach(task => {
      let newTask;
      switch (task.type) {
        case 'reading':
          newTask = new ReadingTask({
            topic: csTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        case 'quiz':
          newTask = new QuizTask({
            topic: csTasksData.topic,
            question: task.question,
            choices: task.choices,
            correctChoice: task.correctChoice,
          });
          break;
        case 'interactive':
          newTask = new InteractiveTask({
            topic: csTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        default:
          break;
      }

      csTasks.push(newTask);
    });

    let avTasks = [];

    avTasksData.tasks.forEach(task => {
      let newTask;
      switch (task.type) {
        case 'reading':
          newTask = new ReadingTask({
            topic: avTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        case 'quiz':
          newTask = new QuizTask({
            topic: avTasksData.topic,
            question: task.question,
            choices: task.choices,
            correctChoice: task.correctChoice,
          });
          break;
        case 'interactive':
          newTask = new InteractiveTask({
            topic: avTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        default:
          break;
      }

      avTasks.push(newTask);
    });

    let gdTasks = [];

    gdTasksData.tasks.forEach(task => {
      let newTask;
      switch (task.type) {
        case 'reading':
          newTask = new ReadingTask({
            topic: gdTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        case 'quiz':
          newTask = new QuizTask({
            topic: gdTasksData.topic,
            question: task.question,
            choices: task.choices,
            correctChoice: task.correctChoice,
          });
          break;
        case 'interactive':
          newTask = new InteractiveTask({
            topic: gdTasksData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        default:
          break;
      }

      gdTasks.push(newTask);
    });

    let tasksArray = [generalTasks, csTasks, avTasks, gdTasks];

    // generates a map containing all tasks assigned to their topics.
    const map = new Map();
    for (let i = 0; i < tasksArray.length; i++) {
      const element = tasksArray[i];
      //console.log(this._topics[i], element)
      map.set(this._topics[i], element);
    }

    this._tasksMap = map;
  };

  retreiveTopicTaskList = topic => {
    /**
     * TODO: TaskList is retreived from persisted data.
     * It should be a list of objects. The objects are either QuizTasks or InteractiveTasks that contain further information
     * e.g. the question and answers, components to render onto screen and so on...
     */
    return topic;
  };

  /**
   * Takes in topic and user's progress and returns one specific task.
   * @param {String} topic Topic of the desired task
   * @param {Number} progress User's current progress in the specified topic
   * @returns {Object} Returns the desired task as an object
   */
  retreiveTask = (topic, progress) => {
    // retreive one task from the list and return everything needed
    let taskList = this._tasksMap.get(topic);
    let task = taskList[progress];
    return task;
  };
}
