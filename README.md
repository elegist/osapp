# OSApp - Medieninformatik
This is where the unique OSA - App for MIB40 - Digital Teaching and Learning is created.

# Table of Contents
1. [Info](#info)
2. [Projektmitglieder](#projektmitglieder)
3. [Npm packages list](#npm-packages-list)

# Info
The application is intended to provide prospective students with an OSA (online self-assessment) for the study program
media informatics. The aim of our application is to provide users with an insight into the world of media of media informatics with its various topics. This should not result in a clear recommendation for or against the course of studies, but a feedback, which can help with a
decision on one's own responsibility. The target group are prospective students with little or no previous knowledge, so the experience and the information provided should be in the foreground. The design of the application should be modern and inviting, in line with media informatics.
Textual content should be presented in a visually appealing way. Since this is a mobile app and not a web-based OSA, the user experience should also be clearly different from that of a website.

# Projektmitglieder, -planung und -dokumentation
* Robin Patzak
* Armin Prinz

All documents that have nothing to do with the actual code of the application are located in the "documentation" folder in the root directory.

# Npm packages list
The following is a list of all additionally required packages with the corresponding installation command (open the terminal in the "main" folder and execute the corresponding commands).

## [React Navigation](https://reactnative.dev/docs/navigation)
The default react native navigation implementation
``npm install @react-navigation/native @react-navigation/native-stack``

## [Animations](https://reactnative.dev/docs/animations)
This is used for GUI animations (for example a smooth transition between screens).
``npm install react-native-reanimated react-native-gesture-handler react-native-svg``

## [Better image support](https://github.com/DylanVann/react-native-fast-image)
Improves performance of native image loading and adds support for animated .gif's
``npm install react-native-fast-image``