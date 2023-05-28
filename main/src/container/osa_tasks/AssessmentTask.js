/**
 * AssessmentTask class - this is the parent class of all task subclasses
 */
import { Component } from 'react'

class AssessmentTask extends Component {
  _id = null
  _title = null
  _topic = null

  constructor(props) {
    super(props)
    this._id = props.id
    this._title = props.title
    this._topic = props.topic
  }
  
}

export default AssessmentTask