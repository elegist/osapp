# OSApp - Medieninformatik
This is where the unique OSA - App for MIB40 - Digital Teaching and Learning is created.

# Table of Contents
- [OSApp - Medieninformatik](#osapp---medieninformatik)
- [Info](#info)
- [Members](#members)
- [Installation](#installation)
- [Maintaining Content](#maintaining-content)
  - [Location of the data](#location-of-the-data)
  - [How to add new Tasks](#how-to-add-new-tasks)
    - [Task properties](#task-properties)
  - [How to add new examples](#how-to-add-new-examples)
  - [Adding a new topic](#adding-a-new-topic)

# Info
The application is intended to provide prospective students with an OSA (online self-assessment) for the study program
media informatics. The aim of our application is to provide users with an insight into the world of media informatics with its various topics. This should not result in a clear recommendation for or against the course of studies, but a feedback, which can help with a
decision on one's own responsibility. The target group are prospective students with little or no previous knowledge, so the experience and the information provided should be in the foreground. The design of the application should be modern and inviting, in line with media informatics.
Textual content should be presented in a visually appealing way. Since this is a mobile app and not a web-based OSA, the user experience should also be clearly different from that of a website.

# Members
* Robin Patzak
* Armin Prinz

All documents that have nothing to do with the actual code of the application are located in the "documentation" folder in the root directory.

# Installation
 Prerequisites
 - Git installed and configured
 - Node and Node Package Manager (NPM) installed
 - Installed and configured a version of Java SDK version 11. Recommendation: OpenJDK-11
 - Installed and configured Android Studio OR at least an Android Emulator. Alternatively enable Debugging on your Smart Device and connect it to your Machine
 - optional: SSH Key setup and configured on your gitlab account

Clone the repository into your preferred folder on your hardrive.

```
cd Your/Desired/Folder
git clone git@git.thm.de:aprn15/dill-lernapp.git
```

If you do not have a SSH Key configured, clone the repository like this instead.

```
git clone https://git.thm.de/aprn15/dill-lernapp.git
```

Navigate into the main folder of the repository.

```
cd dill-lernapp/main/
```

Install all the requiered packages using NPM.

```
npm install
```

Wait for NPM to finish installing all packages.

Start the development server.

```
npx react-native start
```

This will start Metro which gives you different options.

Start your Android Emulator or connect your real device with debugging enabled and press the "a" key to run the app on android.

You will now see the app running on your chosen device.

# Maintaining Content

Adding new Content to the App requires basic knowledge of JSON Files. The following Instruction will lead you carefully through the workflow.

## Location of the data

All the Data is located in the following path:

```
cd main/src/data/
```

You will see different JSON Files here:

- generalTasksData.json &rarr; Data for the introductory topic, where the app is explained in general.
- examplesData.json &rarr; Data for all the student projects to show new users.
- csTasksData.json &rarr; Data for the "Web und Mobile" topic.
- avTasksData.json &rarr; Data for the "Audovisuelle Medien" topic.
- gdTasksData.json &rarr; Data for the "Grafische Datenverarbeitung" topic.

## How to add new Tasks

Adding new Tasks is as simple as adding a new entry to the corresponding JSON File. For example, if you need to add a task to the csTasksData.json, open the file and look for the following part in the file:

```
"tasks": [
    ...
]
```

In between of the "[]" is the collection of all tasks, that get rendered in the OSA.

To add a new Task scroll down, to where the last task is located in the list, add a comma and add your new Task like this:

```
"tasks": [
    ...,
    {
        
    }
]
```

Inside of the "{}" you can specify your task now.

You have the following options:

### Task properties

---

```
{
    "id": 99
}
```
REQUIRED

The ID should be a unique number and should be the incremented number of the id of the task before. So if the previous task has an ID of 18, your new task should have an id of 19.

---

```
{
    "type": "reading" | "quiz" | "interactive"
}
```
REQUIRED

The type will specify how the task will get rendered.

---

```
{
    "summarySubSection": "TITLE OF THE SUBSECTION"
}
```

REQUIRED

The summary sub section will determine in which subsection of the summary screen the task will be sorted to. So it should generally be the same for all tasks that belong together. For example all mathematics tasks should have the same subsection of e.g. "Teil 1 - Mathematik".

---

```
{
    "title": "TITLE OF YOUR TASK"
}
```
REQUIRED

The title will determine what your task will be referred to in the summary screen.

---

```
{
    "content": [
        "Reading task text",
        "As an array",
        "divided by images to display",
        "[img]name-of-image.jpg",
        "followed by text or image",
        "in a custom order"
    ]
}
```

The content list is used for Reading Tasks. (&rarr; you specified: "type": "reading")

In Reading Tasks it will be used for the actual text, that gets displayed. If you want to add images to your reading task, you can do so by specifying the "[img]" tag followed by the exact name of your image file, that should be located inside of main/src/assets/osa_images".

---

```
{
    "question": "YOUR QUESTION HERE
}
```

The question is used for Quiz Tasks. (&rarr; you specified: "type": "quiz")

The question will be displayed on the upper part of the quiz screen.

---

```
{
    "choices": [
        "Place",
        "as",
        "many",
        "choices",
        "as",
        "you",
        "want"
      ],
}
```

The choices is used for Quiz Tasks. (&rarr; you specified: "type": "quiz")

The choices will be displayed beneath each other for the user to interact with.

---

```
{
    "correctChoices": [
            "many",
            "as",
            "you",
            "want"
        ]
}
```

The correctChoices is used for Quiz Tasks. (&rarr; you specified: "type": "quiz")

Put every correct choice for your quiz inside this list. Every list member you specify here, should also be present in the "choices" list.

---

```
{
    "style": "single" | "multiple"
}
```

The style is used for Quiz Tasks. (&rarr; you specified: "type": "quiz")

The style determines whether your quiz will be displayed with radio buttons (single choice quiz) or as checkboxes (multiple choice quiz)

---

```
{
    "slug": "IDENTIFIER_FOR_INTERACTIVE_TASKS"
}
```

The slug is used for Interactive Tasks. (&rarr; you specified: "type": "interactive")

The slug must be a unique identifier for every interactive task. It may be a combination of letters and numbers. We recommend the following convention:

If the task is for the topic "Audiovisuelle Medien" and it is the second one, the task should be named like this: 

```
av2
```

The slug is used in the background to ensure, that the correct interactive task is rendered out.

---

```
{
    "help": [
        "PLACE",
        "AS",
        "MANY",
        "HINTS",
        "AS",
        "YOU",
        "WANT"
    ]
}
```

The help is used for Interactive Tasks. (&rarr; you specified: "type": "interactive")

Add any help you want to give the user for your interactive task. Each help will be displayed as a questionmark first and will be revealed, once the user presses the button to see it. Keep in mind, that each subsequent help should contain a more obvious solution to the task than the previous.

## How to add new examples

If you want to add new examples to show off, what students will build while studying, you need to edit the file "examplesData.json".

You will see the general structure:

```
[
    {
        "name": ...,
        "examples": [
            ...,
            ...
        ]
    }
]
```

The "name" will determine to which section an example should be sorted to. The "examples" list is the list of all the examples that should be sorted together. So you first specify the general topic like "Web & Mobile" and then add every example for that section inside of the "examples" list.

The structure for the examples is as following:

```
{
    "title": "YOUR TITLE",
    "subject": "NAME OF THE SUBJECT",
    "semester": 0
    "technologies": ["PLACE", "ALL", "USED", "TECHNOLOGIES", "HERE"],
    "thumbnail": "NAME_OF_THE_IMAGE_FILE_FOR_THE_GRID",
    "materials": [
        "[img]EVERY_MATERIAL_YOU_WANT_TO_SHOW_OFF",
        "[video]YOU_CAN_SPECIFY_BETWEEN_IMAGES_AND_VIDEOS_HERE"
    ],
    "link": "ADD_AN_URL_IF_YOUR_EXAMPLE_HAS_A_WEBSITE_TO_LOOK_AT",
    "description": "THE DESCRIPTION FOR THE PROJECT, MAY BE A LONGER TEXT, SINCE IT GETS TRUNCATED TO 50 WORDS BEFORE DISPLAYING A SHOW MORE BUTTON"
}
```

## Adding a new topic

If you need to add another topic like "csTasksData.json", "avTasksData.json" and "gdTasksData.json" you can do so by creating a new file and naming it accordingly. You can use the "taskTemplates.json" for a starting point. Copy the content of that file into your newly created file and delete the comments at the top of the file. Define all your tasks in your file now following the rules from above. Once you are done editing your JSON file you need to edit the TaskManager, located at:

```
main/src/container/TaskManager.js
```

Open the TaskManager.js.

At the top of the file you can see imports like this:

```
import generalTasksData from '../data/generalTasksData.json';
import csTasksData from '../data/csTasksData.json';
import avTasksData from '../data/avTasksData.json';
import gdTasksData from '../data/gdTasksData.json';
```

Add your newly created json file:

```
import YOURFILE from '.../data/YOURFILE.json';
```

Scroll down to the "#initTaskManager" method. Find the list "tasksArray". Let the TaskManager generate the tasks you specified in your JSON like this:

```
let tasksArray = [
      ...
      this.#generateTasks(gdTasksData),
      this.#generateTasks(YOURFILE),
      [this.#summaryTask],
    ];
```

The OSA will now automatically be extended with the new topic you created and populate the topic with your specified tasks. Everything else will be adjusted accordingly automatically, assuming you used the correct syntax and rules in your JSON file.
