import { Text } from "react-native-svg"
import AssessmentTask from "./AssessmentTask"

/**
 * Class ReadingTask
 */
class ReadingTask extends AssessmentTask {

  constructor(props) {
    super(props)
    this.string = "Ich bin eine ReadingTask!"
  }
  
}

export default ReadingTask