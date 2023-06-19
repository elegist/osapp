import React from 'react';
import {StyleSheet, Text, View, SectionList} from 'react-native';
import globalStyles from '../styles/GlobalStyleSheet';
import TaskManager from '../container/TaskManager';

/**
 * SummaryScreen - presents an overall summary of the finished OSA for the user to review
 */
export default function SummaryScreen({navigation, route}) {
  const TASK_MANAGER = TaskManager.getInstance();
  const taskArray = Array.from(TASK_MANAGER.getTasksMap().values()); // Convert map values to an array

  const generateSummaryList = () => {
    const list = [];
    let id = 0;
    taskArray.forEach(topic => {
      const section = {
        title: topic[0].topic,
      };
      const data = [];
      topic.forEach(element => {
        data.push({
          id: id,
          title: element.title,
          timeElapsed: element.getTimeElapsedFormatted()
        })
        id++;
      });
      section.data = data;
      list.push(section);
    });
    return list;
  };

  const listData = generateSummaryList();

  return (
    <View style={styles.container}>
      <Text style={globalStyles.textHeading}>Auswertung</Text>
      <SectionList
        sections={listData}
        keyExtractor={item => item.id}
        renderSectionHeader={({section: {title}}) => (
          <Text style={styles.sectionHeader}>{title}</Text>
        )}
        renderItem={({item}) => (
          <View style={styles.taskItem}>
            <Text>{item.title}</Text>
            <Text>{ item.timeElapsed }</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  sectionHeader: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  taskItem: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    backgroundColor: '#f2f2f2',
    borderRadius: 5,
    marginBottom: 10
  },
});
