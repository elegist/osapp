import React, {Component, useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  UIManager,
  Platform,
  LayoutAnimation,
  ImageBackground,
  Modal,
  BackHandler,
} from 'react-native';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';
import ReadingTask from '../container/osa_tasks/ReadingTask';
import {ScrollView} from 'react-native-gesture-handler';
import InteractiveTask from '../container/osa_tasks/InteractiveTask';
import QuizTask from '../container/osa_tasks/QuizTask';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';
import FontAwesomeIcon from 'react-native-vector-icons/FontAwesome';
import TopBar from '../components/TopBar';

/**
 * SummaryScreen - presents an overall summary of the finished OSA for the user to review
 */
export class SummaryScreen extends Component {
  TASK_MANAGER = null;
  constructor(props) {
    super(props);
    this.#initSummaryScreen();

    this.state = {
      expandedSection: null,
      modalVisible: false,
      modalTaskData: null,
    };
  }

  #initSummaryScreen = () => {
    this.TASK_MANAGER = TaskManager.getInstance();
    this.taskArray = Array.from(this.TASK_MANAGER.getTasksMap().values()); // Convert map values to an array
    this.listData = this.generateSummaryList();
    this.topicSuccessData = this.getTopicSuccess();
    this.navigation = this.props.navigation;
  };

  /**
   * Populates summary screen with task data
   * @returns Collection containing all relevant task information
   */
  generateSummaryList = () => {
    const tasksArray = [];
    let id = 0;
    this.taskArray.forEach(topic => {
      if (
        topic[0].topic == 'Allgemein' ||
        topic[0].topic == 'Examples' ||
        topic[0].topic == 'Summary'
      )
        return;
      const section = {
        title: topic[0].topic,
      };
      const data = [];
      topic.forEach(element => {
        let timeRelevant = false;
        let hintsUsedRelevant = false;
        let hintsUsed = 0;
        let hintRatio = 0;
        let userFeedbackInteractive = '';
        let question = null;
        let selectedAnswers = null;
        let correctChoices = null;
        let type = null;
        if (element instanceof ReadingTask) return;
        else if (element instanceof InteractiveTask) {
          type = 'interactive';
          timeRelevant = true;
          hintsUsedRelevant = true;
          hintsUsed = element.getUsedHints();
          hintRatio = element.getHintRatio();
          userFeedbackInteractive = element.getUserFeedback();
        } else if (element instanceof QuizTask) {
          type = 'quiz';
          question = element.question;
          selectedAnswers = element.getSelectedAnswers();
          correctChoices = element.correctChoices;
        }
        data.push({
          id: id,
          title: element.title,
          type: type,
          timeElapsed: element.getTimeElapsedFormatted(),
          taskSuccess: element.getTaskSuccess(),
          timeRelevant: timeRelevant,
          hintsUsedRelevant: hintsUsedRelevant,
          hintsUsed: hintsUsed,
          hintRatio: hintRatio,
          userFeedbackInteractive: userFeedbackInteractive,
          summarySubSection: element.summarySubSection,
          question: question,
          selectedAnswers: selectedAnswers,
          correctChoices: correctChoices,
        });
        id++;
      });
      section.data = data;
      tasksArray.push(section);
    });
    return tasksArray;
  };

  /**
   * Generates a map that stores user's average success per topic
   * @returns {Map} Map of [topic, ratio]
   */
  getTopicSuccess = () => {
    const map = {};
    this.listData.forEach(section => {
      let entries = Object.entries(section);
      let topic = '';
      for ([key, value] of entries) {
        let ratio = 0;
        switch (key) {
          case 'title':
            topic = value;
            break;
          case 'data':
            let successCount = 0;
            value.forEach(task => {
              if (task.taskSuccess) successCount++;
            });
            ratio = successCount / value.length;
            map[topic] = ratio;
            break;
          default:
            break;
        }
      }
    });
    return map;
  };

  /**
   * Gets header color and styling
   * @param {String} title Section title to compare against
   * @returns according styles
   */
  getHeaderStyle = title => {
    if (this.topicSuccessData[title] > 0.6) {
      return styles.greenHeader;
    } else if (this.topicSuccessData[title] >= 0.4) {
      return styles.yellowHeader;
    } else {
      return styles.redHeader;
    }
  };

  toggleModal = () => {
    this.setState({
      modalVisible: !this.state.modalVisible,
    });
  };

  openTaskModal = task => {
    this.toggleModal();
    this.setState({
      modalTaskData: task,
    });
  };

  /**
   * Renders all items of a section
   * @param {String} section Sectionname
   * @returns {ScrollView} List of already rendered items
   */
  displaySectionItems = section => {
    let previousSummarySubSection = null;

    const renderSectionItems = () => {
      const items = [];

      section.data.forEach(item => {
        if (item.summarySubSection !== previousSummarySubSection) {
          items.push(
            <Text
              key={item.summarySubSection}
              style={[
                styles.subSectionHeading,
                globalStyles.textSummarySubSection,
              ]}>
              {item.summarySubSection}
            </Text>,
          );
        }

        previousSummarySubSection = item.summarySubSection;

        items.push(
          <TouchableOpacity
            onPress={() => this.openTaskModal(item)}
            key={this.getRandomKey()}>
            <View key={item.id} style={styles.taskItem}>
              <Text style={globalStyles.textSummaryItem}>{item.title}</Text>
              {item.timeRelevant && (
                <View style={styles.iconTextWrapper}>
                  <FeatherIcon
                    style={[
                      globalStyles.textSummaryItem,
                      {opacity: 1, marginEnd: 5, color: "#1C2327"},
                    ]}
                    name="clock"
                  />
                  <Text style={globalStyles.textSummaryItem}>
                    {item.timeElapsed}
                  </Text>
                </View>
              )}
              {item.hintsUsedRelevant && (
                <View style={styles.iconTextWrapper}>
                  <AntDesignIcon
                    style={[
                      globalStyles.textSummaryItem,
                      {opacity: 1, marginEnd: 5},
                    ]}
                    name="questioncircleo"
                  />
                  <Text style={globalStyles.textSummaryItem}>
                    {item.hintsUsed}
                  </Text>
                </View>
              )}
              {item.taskSuccess === true ? (
                <FeatherIcon
                  style={[
                    globalStyles.textSummaryItem,
                    {opacity: 1, color: 'green'},
                  ]}
                  name="check-circle"
                />
              ) : (
                <FeatherIcon
                  style={[
                    globalStyles.textSummaryItem,
                    {opacity: 1, color: 'orange'},
                  ]}
                  name="alert-triangle"
                />
              )}
            </View>
          </TouchableOpacity>,
        );
      });

      let headerStyle = this.getHeaderStyle(section.title);
      let text = '';

      switch (headerStyle) {
        case styles.greenHeader:
          text =
            'Sehr gut! Dieses Thema scheint dir zu liegen. Denk jedoch immer daran, dass dies nur ein Teil des Studiums ist und dein Interesse an den anderen Themen ebenso wichtig ist.';
          break;
        case styles.yellowHeader:
          text =
            'Gut gemacht, du hast in etwa die Hälfte richtig beantwortet. Reflektiere noch einmal, ob dich dieses Thema interessiert und du dir vorstellen kannst, dich im Studium eingehend damit zu beschäftigen.';
          break;
        case styles.redHeader:
          text =
            'Schade, du hast leider nur wenige Aufgaben lösen können. Das muss zwar nichts heißen, aber: im Studium wirst du dich noch viel intensiver mit diesem Thema beschäftigen! Reflektiere darüber, ob dies für dich ein Ausschlusskriterium sein könnte.';
          break;
        default:
          text =
            'Dieses Thema ist ein wichtiger Teil des Studiums. Kannst du dir vorstellen, dich noch intensiver mit der Thematik zu beschäftigen?';
          break;
      }

      items.push(
        <Text
          key={this.getRandomKey()}
          style={[
            styles.subSectionHeading,
            globalStyles.textSummarySubSection,
            styles.taskItem,
          ]}>
          {text}
        </Text>,
      );
      return items;
    };

    return (
      <ScrollView style={styles.scrollContainer}>
        {renderSectionItems()}
      </ScrollView>
    );
  };

  /**
   * Generates a random key for view items
   * @returns {String} A randomized String
   */
  getRandomKey = () => {
    let rString = (Math.random() + 1).toString(36).substring(2);
    let key = Math.floor(Math.random() * 1000000 + 1) + rString;
    return key;
  };

  /**
   * Expands and collapses accordion sections
   * @param {String} sectionTitle
   */
  toggleItem(sectionTitle) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (sectionTitle === this.state.expandedSection) {
      this.setState({
        expandedSection: null,
      });
    } else {
      this.setState({
        expandedSection: sectionTitle,
      });
    }
  }

  includeModal = () => {
    var answersHeading = 'Deine Lösung: ';
    var correctAnswersHeading = 'Die korrekte Lösung lautet:';
    if (this.state.modalTaskData.type == 'quiz') {
      var questionText = (
        <Text style={{margin: 5, marginBottom: 15, color: '#1C2327'}}>
          {this.state.modalTaskData.question}
        </Text>
      );
      var selectedAnswersMap = this.state.modalTaskData.selectedAnswers.map(
        (answer, index) => {
          let textColor = this.state.modalTaskData.correctChoices.includes(
            answer,
          )
            ? 'green'
            : 'red';
          return (
            <Text
              style={[styles.modalSingleAnswerText, {color: textColor}]}
              key={index}>
              {answer}
            </Text>
          );
        },
      );
      var correctChoicesMap =
        this.state.modalTaskData.correctChoices != null &&
        this.state.modalTaskData.correctChoices.map((choice, index) => (
          <Text style={styles.modalSingleCorrectChoiceText} key={index}>
            {choice}
          </Text>
        ));
    } else if (this.state.modalTaskData.type == 'interactive') {
      answersHeading = '';
      correctAnswersHeading = '';
      var taskSummaryText = (
        <Text style={{textAlign: 'left', color: '#1C2327'}}>
          {this.state.modalTaskData.userFeedbackInteractive}
        </Text>
      );
    }
    return (
      <Modal
        animationType="fade"
        transparent={true}
        visible={this.state.modalVisible}
        onRequestClose={() => this.toggleModal()}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => this.toggleModal()}>
              <FontAwesomeIcon name="close" size={32} color="white" />
            </TouchableOpacity>
            <ScrollView>
              <Text
                style={[
                  styles.modalSubSectionText,
                  globalStyles.textSummarySubSection,
                ]}>
                {this.state.modalTaskData.summarySubSection}
              </Text>
              <Text
                style={[
                  styles.modalTaskTitleText,
                  globalStyles.textSummaryItem,
                ]}>
                {this.state.modalTaskData.title}
              </Text>

              {this.state.modalTaskData.type == 'quiz' ? questionText : ''}

              <Text
                style={[
                  styles.modalQuizAnswersText,
                  globalStyles.textSecondary,
                ]}>
                {answersHeading}
              </Text>

              {this.state.modalTaskData.type == 'quiz'
                ? selectedAnswersMap
                : ''}

              <Text
                style={[
                  styles.modalCorrectChoicesText,
                  globalStyles.textSecondary,
                ]}>
                {correctAnswersHeading}
              </Text>

              {this.state.modalTaskData.type == 'quiz' ? correctChoicesMap : ''}
              {this.state.modalTaskData.type == 'interactive'
                ? taskSummaryText
                : ''}
            </ScrollView>
          </View>
        </View>
      </Modal>
    );
  };

  render() {
    // Needed to achieve accordion animation on android
    if (Platform.OS === 'android') {
      if (UIManager.setLayoutAnimationEnabledExperimental) {
        UIManager.setLayoutAnimationEnabledExperimental(true);
      }
    }
    return (
      <ImageBackground
        source={require('../assets/Background.png')}
        style={globalStyles.mainBackground}>
        <TopBar navigation={this.navigation} />
        <View style={styles.container}>
          <Text
            style={[globalStyles.textSummaryScreenTitle, styles.screenTitle]}>
            Auswertung
          </Text>
          {this.listData.map((section, index) => (
            <View key={index}>
              <TouchableOpacity
                key={this.getRandomKey()}
                onPress={() => this.toggleItem(section.title)}
                style={[
                  styles.sectionHeader,
                  this.getHeaderStyle(section.title),
                ]}>
                <Text
                  style={[
                    globalStyles.textSummarySection,
                    styles.sectionTitle,
                  ]}>
                  {section.title}
                </Text>
              </TouchableOpacity>
              {this.state.expandedSection === section.title &&
                this.displaySectionItems(section)}
            </View>
          ))}
          {this.state.modalTaskData != null && this.includeModal()}
        </View>
      </ImageBackground>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  screenTitle: {
    textAlign: 'center',
  },
  sectionHeader: {
    borderRadius: 4,
    minHeight: 50,
    margin: 10,
    flexDirection: 'row',
  },
  greenHeader: {
    backgroundColor: '#8CBA45',
  },
  yellowHeader: {
    backgroundColor: '#D1CC48',
  },
  redHeader: {
    backgroundColor: '#C75944',
  },
  sectionTitle: {
    marginStart: 10,
    flex: 1,
    alignSelf: 'center',
  },
  scrollContainer: {
    height: '60%',
    marginHorizontal: 12,
  },
  subSectionHeading: {
    borderBottomWidth: 1,
    padding: 2,
    margin: 2,
    marginBottom: 10,
    borderBottomColor: 'rgba(0, 0, 0, 0.6)',
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
  },
  iconTextWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  closeButton: {
    position: 'absolute',
    top: -25,
    right: -25,
    paddingHorizontal: 10,
    paddingVertical: 5,
    margin: 5,
    elevation: 5,
    backgroundColor: '#dd4040',
    borderRadius: 50,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.75)',
  },
  modalContent: {
    height: '90%',
    width: '80%',
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    gap: 20,
  },
  modalSubSectionText: {
    textAlign: 'center',
    marginTop: 5,
    color: '#1C2327',
  },
  modalTaskTitleText: {
    textAlign: 'center',
    marginBottom: 10,
    color: '#1C2327',
  },
  modalQuizAnswersText: {
    marginStart: 10,
    marginTop: 10,
    color: '#1C2327',
  },
  modalSingleAnswerText: {
    marginStart: 10,
    padding: 5,
    color: '#1C2327',
  },
  modalCorrectChoicesText: {
    marginStart: 10,
    marginTop: 10,
    color: '#1C2327',
  },
  modalSingleCorrectChoiceText: {
    marginStart: 10,
    padding: 5,
    color: '#1C2327',
  },
});
