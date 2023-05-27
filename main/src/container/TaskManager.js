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
  #tasksMap = null;

  constructor(props) {
    super(props);
    this.#initTaskManager();
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
  #initTaskManager = () => {
    this._topics = [
      'Allgemein',
      'Informatik',
      'Audiovisuelle Medien',
      'Graphische Datenverarbeitung',
    ];

    let tasksArray = [
      this.#generateTasks(generalTasksData),
      this.#generateTasks(csTasksData),
      this.#generateTasks(avTasksData),
      this.#generateTasks(gdTasksData),
    ];

    // generates a map containing all tasks assigned to their topics.
    const map = new Map();
    for (let i = 0; i < tasksArray.length; i++) {
      const element = tasksArray[i];
      //console.log(this._topics[i], element)
      map.set(this._topics[i], element);
    }

    this.#tasksMap = map;
  };

  /**
   * Generates an array containing all tasks for a certain topic
   * @param {JSON} taskData JSON object defining tasks for a certain topic
   * @returns {Array} Array containing all tasks for the defined topic in correct order
   */
  #generateTasks(taskData) {
    const READING = 'reading';
    const QUIZ = 'quiz';
    const INTERACTIVE = 'interactive';

    let taskArray = [];

    taskData.tasks.forEach(task => {
      let newTask;
      switch (task.type) {
        case READING:
          newTask = new ReadingTask({
            topic: taskData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        case QUIZ:
          newTask = new QuizTask({
            topic: taskData.topic,
            question: task.question,
            choices: task.choices,
            correctChoice: task.correctChoice,
          });
          break;
        case INTERACTIVE:
          newTask = new InteractiveTask({
            topic: taskData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        default:
          break;
      }

      taskArray.push(newTask);
    });
    return taskArray;
  }

  /**
   * Takes in topic and returns all it's related tasks as an array.
   * @param {String} topic Topic of the desired task
   * @returns {Array} Collection of tasks
   */
  #retreiveTaskList = (topic) => this.#tasksMap.get(topic)
  
  /**
   * Retreive one single task from a defined tasklist
   * @param {String} topic String defining the topic
   * @param {Number} progress User's progress in this topic
   * @returns {Object} Task object (ReadingTask / QuizTask / InteractiveTask ... )
   */
  getTask = (topic, progress) => this.#retreiveTaskList(topic)[progress]
}
