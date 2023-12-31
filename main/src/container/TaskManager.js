import ReadingTask from './osa_tasks/ReadingTask';
import QuizTask from './osa_tasks/QuizTask';
import InteractiveTask from './osa_tasks/InteractiveTask';

import generalTasksData from '../data/generalTasksData.json';
import csTasksData from '../data/csTasksData.json';
import avTasksData from '../data/avTasksData.json';
import gdTasksData from '../data/gdTasksData.json';
import SummaryTask from './osa_tasks/SummaryTask';
import ExamplesTask from './osa_tasks/ExamplesTask';

let taskManagerIsInitialized = false;
/**
 * TaskManager (singleton) -
 * manages the assessment process, iterating through task and topic lists and so on.
 * @function getInstance() - retreive an instance of this class
 * @function resetTaskManager() - resets this singleton to its default state
 * @function getTask(progress) - retreive one specific task
 */
class TaskManager {
  #userProgress = 0; // user's overall progress
  #topics = null; // collection of all topics
  #topicsProgress = 0; // overall topic's progress starting at 0 until #topics.length
  #userProgressInTopic = 0; // users progress in current topic
  #tasksMap = null; // collection of all tasks mapped to their corresponding topic
  #currentTaskList = null; // collection of all tasks that are currently active in the osa
  #summaryTask = new SummaryTask({id: 0, title: 'Summary', topic: 'Summary'});

  numberOfTasks = 0;

  constructor() {
    this.#initTaskManager();
  }

  getUsersOverallProgress = () => {
    return this.#userProgress;
  };

  getTasksMap = () => {
    return this.#tasksMap;
  };

  /**
   * Get a singleton instance of this class
   * @returns {TaskManager}
   */
  static getInstance() {
    if (TaskManager.managerInstance == null) {
      TaskManager.managerInstance = new TaskManager();
      taskManagerIsInitialized = true;
    }
    return this.managerInstance;
  }

  /**
   * Reset instance to its default state
   */
  resetTaskManager() {
    taskManagerIsInitialized = false;
    TaskManager.managerInstance = null;
  }

  /**
   * Populates TaskManager with initial data.
   * All data should be stored in database and retreived from here
   */
  #initTaskManager = () => {
    //DEBUG: console.log('init task manager');
    this.#topics = [
      'Allgemein',
      'Examples',
      'Informatik',
      'Audiovisuelle Medien',
      'Graphische Datenverarbeitung',
      'Summary',
    ];

    let tasksArray = [
      this.#generateTasks(generalTasksData),
      [new ExamplesTask({id: 0, title: 'Projektbeispiele', topic: 'Examples'})],
      this.#generateTasks(csTasksData),
      this.#generateTasks(avTasksData),
      this.#generateTasks(gdTasksData),
      [this.#summaryTask],
    ];

    // generates a map containing all tasks assigned to their topics.
    const map = new Map();
    for (let i = 0; i < tasksArray.length; i++) {
      const element = tasksArray[i];
      map.set(this.#topics[i], element);
    }

    this.#tasksMap = map;

    // as this is only called when initializing the task manager, reset all values for safety
    this.#userProgressInTopic = 0;
    this.#userProgress = 0;
    this.#topicsProgress = 0;
    this.#currentTaskList = this.#retreiveTaskList(this.#topicsProgress);
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
            id: task.id,
            topic: taskData.topic,
            title: task.title,
            content: task.content,
            summarySubSection: task.summarySubSection,
          });
          break;
        case QUIZ:
          newTask = new QuizTask({
            id: task.id,
            topic: taskData.topic,
            title: task.title,
            style: task.style,
            question: task.question,
            choices: task.choices,
            correctChoices: task.correctChoices,
            summarySubSection: task.summarySubSection,
          });
          break;
        case INTERACTIVE:
          newTask = new InteractiveTask({
            id: task.id,
            topic: taskData.topic,
            title: task.title,
            slug: task.slug,
            help: task.help,
            summarySubSection: task.summarySubSection,
          });
          break;
        default:
          break;
      }

      taskArray.push(newTask);
    });
    this.numberOfTasks += taskArray.length;

    return taskArray;
  }

  /**
   * Takes in topic and returns all it's related tasks as an array.
   * @param {Number} index Index of the desired topic in array #topics
   * @returns {Array} Collection of tasks
   */
  #retreiveTaskList = index => this.#tasksMap.get(this.#topics[index]);

  #increaseTopicProgress = () =>
    this.#topicsProgress < this.#topics.length - 1
      ? this.#topicsProgress++
      : (this.#topicsProgress = 0);

  #decreaseTopicProgress = () =>
    this.#topicsProgress > 0
      ? this.#topicsProgress--
      : (this.#topicsProgress = 0);

  /**
   * Decides which task is next (or previous in case user navigates back) and returns it as an AssessmentTask object
   * @param {Number} progress User's progress on the screen (not equivalent to the actual user's progress!)
   * @returns {Object} Task object (ReadingTask / QuizTask / InteractiveTask ... )
   */
  getTask = progress => {
    //DEBUG: console.log('getTask called with parameter: ' + progress);
    if (progress == 0) {
      this.#userProgressInTopic = 0;
      this.#userProgress = 0;
      this.#topicsProgress = 0;
      this.#currentTaskList = this.#retreiveTaskList(this.#topicsProgress);
      return this.#currentTaskList[0];
    }
    if(progress == this.#userProgress) 
      return this.#currentTaskList[this.#userProgressInTopic];
    if (progress > this.#userProgress) {
      //DEBUG: console.log('User progresses...');
      // load next task
      if (this.#userProgressInTopic < this.#currentTaskList.length - 1) {
        //DEBUG: console.log('Same topic, user progresses on task...');
        // increase user's progress on current topic and proceed with task
        this.#userProgressInTopic++;
        this.#userProgress++;
      } else {
        //DEBUG: console.log('Topic ended, user progresses to next topic');
        //DEBUG: console.log('Last topic: ' + this.#topicsProgress);
        // reset user's progress, move to next topic and retreive new task list
        this.#userProgressInTopic = 0;
        this.#increaseTopicProgress();
        //DEBUG: console.log('Next topic: ' + this.#topicsProgress);
        // retreive new / updated task list
        this.#currentTaskList = this.#retreiveTaskList(this.#topicsProgress);
      }
    } else {
      //DEBUG: console.log('User navigates back');
      // load previous task
      if (this.#userProgressInTopic > 0) {
        //DEBUG: console.log('There are previous tasks in this topic, user navigates back one task',);
        this.#userProgressInTopic--;
      } else {
        //DEBUG: console.log('No previous task left, switching to previous topic...');
        // load last topic
        this.#decreaseTopicProgress();
        // retreive new / updated task list
        this.#currentTaskList = this.#retreiveTaskList(this.#topicsProgress);
        // set user's progress to the last task in this topic
        this.#userProgressInTopic = this.#currentTaskList.length - 1;
      }
    }
    // update user progress (ensures correct comparison on next call)
    this.#userProgress = progress;

    //DEBUG: console.log('#userProgress: ' + this.#userProgress, '#userProgressInTopic: ' + this.#userProgressInTopic, 'topicsProgress: ' + this.#topicsProgress,);
    //return task object
    return this.#currentTaskList[this.#userProgressInTopic];
  };
}

export default TaskManager;
export {taskManagerIsInitialized};
