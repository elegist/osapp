import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  SectionList,
  TouchableOpacity,
  UIManager,
  Platform,
  LayoutAnimation,
  ImageBackground,
} from 'react-native';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';
import ReadingTask from '../container/osa_tasks/ReadingTask';
import {
  ScrollView,
  TouchableWithoutFeedback,
} from 'react-native-gesture-handler';
import InteractiveTask from '../container/osa_tasks/InteractiveTask';
import QuizTask from '../container/osa_tasks/QuizTask';
import {Image, SvgUri} from 'react-native-svg';
import FastImage from 'react-native-fast-image';
import FeatherIcon from 'react-native-vector-icons/Feather';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

/**
 * SummaryScreen - presents an overall summary of the finished OSA for the user to review
 */
export default function SummaryScreen({navigation, route}) {
  const TASK_MANAGER = TaskManager.getInstance();
  const taskArray = Array.from(TASK_MANAGER.getTasksMap().values()); // Convert map values to an array
  const [expandedSection, setExpandedSection] = useState(null);
  const [csTaskHeaderColor, setCsTaskHeaderColor] = useState(null);

  /**
   * Populates summary screen with task data
   * @returns Collection containing all relevant task information
   */
  const generateSummaryList = () => {
    const tasksArray = [];
    let id = 0;
    taskArray.forEach(topic => {
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
        if (element instanceof ReadingTask) return;
        else if (element instanceof InteractiveTask) {
          (timeRelevant = true), (hintsUsedRelevant = true);
        }
        data.push({
          id: id,
          title: element.title,
          timeElapsed: element.getTimeElapsedFormatted(),
          taskSuccess: element.getTaskSuccess(),
          timeRelevant: timeRelevant,
          hintsUsedRelevant: hintsUsedRelevant,
          summarySubSection: element.summarySubSection,
        });
        id++;
      });
      section.data = data;
      tasksArray.push(section);
    });
    return tasksArray;
  };

  const listData = generateSummaryList();

  const getTopicSuccess = () => {
    const map = {};
    listData.forEach(section => {
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

  const topicSuccessData = getTopicSuccess();

  const getHeaderStyle = title => {
    if (topicSuccessData[title] > 0.6) {
      return styles.greenHeader;
    } else if (topicSuccessData[title] >= 0.4) {
      return styles.yellowHeader;
    } else {
      return styles.redHeader;
    }
  };

  const openTaskModal = task => {
    console.log(task);
  };

  const displaySectionItems = section => {
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
          <TouchableOpacity onPress={() => openTaskModal(item)}>
            <View key={item.id} style={styles.taskItem}>
              <Text style={globalStyles.textSummaryItem}>{item.title}</Text>
              {item.timeRelevant && (
                <View style={styles.iconTextWrapper}>
                  <FeatherIcon
                    style={[
                      globalStyles.textSummaryItem,
                      {opacity: 1, marginEnd: 5},
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
                  <Text style={globalStyles.textSummaryItem}>3</Text>
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

      return items;
    };

    return (
      <ScrollView style={styles.scrollContainer}>
        {renderSectionItems()}
      </ScrollView>
    );
  };

  function toggleItem(sectionTitle) {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    if (sectionTitle === expandedSection) {
      setExpandedSection(null);
    } else {
      setExpandedSection(sectionTitle);
    }
  }

  if (Platform.OS === 'android') {
    if (UIManager.setLayoutAnimationEnabledExperimental) {
      UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  return (
    <ImageBackground
      source={require('../assets/Background.png')}
      style={globalStyles.mainBackground}>
      <View style={styles.container}>
        <Text style={[globalStyles.textSummaryScreenTitle, styles.screenTitle]}>
          Auswertung
        </Text>
        {listData.map((section, index) => (
          <View key={index}>
            <TouchableOpacity
              onPress={() => toggleItem(section.title)}
              style={[styles.sectionHeader, getHeaderStyle(section.title)]}>
              <Text
                style={[globalStyles.textSummarySection, styles.sectionTitle]}>
                {section.title}
              </Text>
            </TouchableOpacity>
            {expandedSection === section.title && displaySectionItems(section)}
          </View>
        ))}
      </View>
    </ImageBackground>
  );
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
    height: 50,
    margin: 10,
    justifyContent: 'center',
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
    marginStart: 20,
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
});
