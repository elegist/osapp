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
} from 'react-native';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';
import ReadingTask from '../container/osa_tasks/ReadingTask';
import {ScrollView} from 'react-native-gesture-handler';

/**
 * SummaryScreen - presents an overall summary of the finished OSA for the user to review
 */
export default function SummaryScreen({navigation, route}) {
  const TASK_MANAGER = TaskManager.getInstance();
  const taskArray = Array.from(TASK_MANAGER.getTasksMap().values()); // Convert map values to an array
  const [expandedSection, setExpandedSection] = useState(null);

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
        if (element instanceof ReadingTask) return;
        data.push({
          id: id,
          title: element.title,
          timeElapsed: element.getTimeElapsedFormatted(),
          taskSuccess: element.getTaskSuccess() ? 'true' : 'false',
        });
        id++;
      });
      section.data = data;
      tasksArray.push(section);
    });
    return tasksArray;
  };

  const listData = generateSummaryList();

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
    <View style={styles.container}>
      <Text style={globalStyles.textHeading}>Auswertung</Text>
      {listData.map(section => (
        <View key={section.title}>
          <TouchableOpacity
            onPress={() => toggleItem(section.title)}
            style={[styles.sectionHeader, styles.greenHeader]}>
            <Text style={styles.sectionTitle}>{section.title}</Text>
          </TouchableOpacity>
          {expandedSection === section.title && (
            <ScrollView style={styles.scrollContainer}>
              {section.data.map(item => (
                <View key={item.id} style={styles.taskItem}>
                  <Text>{item.title}</Text>
                  <Text>{item.timeElapsed}</Text>
                  <Text>{item.taskSuccess}</Text>
                </View>
              ))}
            </ScrollView>
          )}
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
    fontSize: 20,
    fontWeight: 'bold',
    marginStart: 20,
  },
  scrollContainer: {
    height: '60%',
    marginHorizontal: 12,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    backgroundColor: '#f2f2f2',
    marginBottom: 10,
  },
});
