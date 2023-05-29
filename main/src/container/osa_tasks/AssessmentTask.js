import { Component } from 'react'

/**
 * AssessmentTask class - this is the parent class of all task subclasses
 */
class AssessmentTask extends Component {

  constructor(props) {
    super(props)
    this.id = props.id
    this.title = props.title
    this.topic = props.topic
  }
  
}

export default AssessmentTask