import {Component} from 'react';
import ReadingTask from './osa_tasks/ReadingTask';
import QuizTask from './osa_tasks/QuizTask';
import InteractiveTask from './osa_tasks/InteractiveTask';

import generalTasksData from '../data/generalTasksData.json';
import csTasksData from '../data/csTasksData.json';
import avTasksData from '../data/avTasksData.json';
import gdTasksData from '../data/gdTasksData.json';
import SummaryTask from './osa_tasks/SummaryTask';

/**
 * TaskManager
 * Manages the assessment process, task and topic lists and so on.
 */
export default class TaskManager extends Component {
  // singleton instance
  static managerInstance = null;
  // fields
  #userProgress = 0; // user's overall topic
  #topics = null; // collection of all topics
  #topicsProgress = 0; // overall topic's progress starting at 0 until #topics.length
  #userProgressInTopic = 0; // users progress in current topic
  #tasksMap = null; // collection of all tasks mapped to their corresponding topic
  #currentTaskList = null // collection of all tasks that are currently active in the osa

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

  resetTaskManager() {
    this.#userProgress = 0; // user's overall topic
    this.#topics = null; // collection of all topics
    this.#topicsProgress = 0; // overall topic's progress starting at 0 until #topics.length
    this.#userProgressInTopic = 0; // users progress in current topic
    this.#tasksMap = null; // collection of all tasks mapped to their corresponding topic
    this.#currentTaskList = null // collection of all tasks that are currently active in the osa

    this.#initTaskManager()
  }

  /**
   * Populates TaskManager with initial data.
   * All data should be stored in database and retreived from here
   */
  #initTaskManager = () => {
    this.#topics = [
      'Allgemein',
      'Informatik',
      'Audiovisuelle Medien',
      'Graphische Datenverarbeitung',
      'Summary'
    ];

    let tasksArray = [
      this.#generateTasks(generalTasksData),
      this.#generateTasks(csTasksData),
      this.#generateTasks(avTasksData),
      this.#generateTasks(gdTasksData),
      [new SummaryTask({id: 0, title: "Summary", topic: "Summary"})]
    ];

    // generates a map containing all tasks assigned to their topics.
    const map = new Map();
    for (let i = 0; i < tasksArray.length; i++) {
      const element = tasksArray[i];
      map.set(this.#topics[i], element);
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
            id: taskData.id,
            topic: taskData.topic,
            title: task.title,
            text: task.text,
          });
          break;
        case QUIZ:
          newTask = new QuizTask({
            id: taskData.id,
            topic: taskData.topic,
            question: task.question,
            choices: task.choices,
            correctChoice: task.correctChoice,
          });
          break;
        case INTERACTIVE:
          newTask = new InteractiveTask({
            id: taskData.id,
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
   * @param {Number} index Index of the desired topic in array #topics
   * @returns {Array} Collection of tasks
   */
  #retreiveTaskList = index => this.#tasksMap.get(this.#topics[index])

  // TODO: When else branch is reached, all topics are done.- it shouldn't just set progress to 0; instead the summary screen will be shown
  #increaseTopicProgress = () =>
    this.#topicsProgress < this.#topics.length - 1 ? this.#topicsProgress++ : this.#topicsProgress = 0

  #decreaseTopicProgress = () =>
    this.#topicsProgress > 0 ? this.#topicsProgress-- : this.#topicsProgress = 0

  /**
   * Decides which task is next (or previous in case user navigates back) and returns it as an AssessmentTask object
   * @param {Number} progress User's progress on the screen (not equivalent to the actual user's progress!)
   * @returns {Object} Task object (ReadingTask / QuizTask / InteractiveTask ... )
   */
  getTask = progress => {
    if (progress == 0) {
      // first task, reset all
      this.#userProgressInTopic = 0;
      this.#userProgress = 0;
      this.#topicsProgress = 0;
      this.#currentTaskList = this.#retreiveTaskList(this.#topicsProgress);
      return this.#currentTaskList[0];
    }
    if (progress >= this.#userProgress) {
      // load next task
      if (this.#userProgressInTopic < this.#currentTaskList.length - 1) {
        // increase user's progress on current topic and proceed with task
        this.#userProgressInTopic++;
        this.#userProgress++;
      } else {
        // reset user's progress, move to next topic and retreive new task list
        this.#userProgressInTopic = 0;
        this.#increaseTopicProgress();
      }
    } else {
      // load previous task
      if (this.#userProgressInTopic > 0) {
        this.#userProgressInTopic--;
      } else { // load last topic
        this.#decreaseTopicProgress();
        this.#userProgressInTopic = this.#currentTaskList.length - 1;
      }
    }
    // update user progress (ensures correct comparison on next call)
    this.#userProgress = progress;

    // retreive new / updated task list
    this.#currentTaskList = this.#retreiveTaskList(this.#topicsProgress);
    return this.#currentTaskList[this.#userProgressInTopic];
  };
  // TODO: navigating back currently decreases user's progress. Maybe this isn't the best solution when we want to display something like a progress bar
}
