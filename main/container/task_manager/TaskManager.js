/**
 * TaskManager class which contains all assessment related logic
 * and should implement classes like QuizTask, InteractiveTask and TaskList.
 */
import React, { Component } from 'react'

class TaskManager extends Component {
  taskList = null // has to be retrieved from persisted data
  progress = 0 // track users progress

  testInteger = 10
  constructor(props) {
    super(props)
    this.testInteger = props.testInteger
  }

  retreiveTaskList = (topic) => {
    /**
     * TODO: TaskList is retreived from persisted data.
     * It should be a list of objects. The objects are either QuizTasks or InteractiveTasks that contain further information 
     * e.g. the question and answers, components to render onto screen and so on...
     */
    return topic
  }

  retreiveTask = (taskList, progress) => {
    // retreive one task from the list and return everything needed
    let task = taskList[progress]
    return task
  }
 

  render() {
    return {
      testIntegerField: this.testInteger,
    }
  }
}

export default TaskManager