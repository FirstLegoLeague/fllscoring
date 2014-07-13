# Introduction
In effort to make recording and managing scores as easy and dynamic as possible a simplistic user interface is needed, with a logical flow between different screens and modes of the system. 

This document describes the screens of the application and the flow between them.

**Note:** All terminology is not final, and is bound to change.

# 1. Server/Client/Calculator

The system has three modes:
* Server mode will present the user with a wizard to create and setup the tournament. A five page wizard makes sure the tournament is set up, and the system is ready for use.
* Client mode can connect to an existing server, or use the current device as a server if no network is available for the tournament.
* Score calculator mode is intended for tournaments which work with paper scoring forms. The scorekeeper(s) can use this mode to calculate scores and write them down to the paper scoring forms.

The user will start with a choice between these three.

![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/01.%20Apptype%20choice.png)

# 2. Setup wizard
In order to make the system easy to use, a wizard is provided to setup the tournament. This wizards contains five steps, after which the whole system is ready for use. The wizard contains of:
* **Tournament information**
* **Team information**
* **Team information**
* **Round information**
* **Referee information**

After completing the wizard an option is presented to print out scoring forms.

## 2.1. Tournament information
First up is tournament information, where the user is asked to provide basic information about the tournament. With this information eventual score output is enriched, and can also be used as a history reference.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/02.%20Wizard%20-%20Tournament.png)

The following information is requested:
* Tournament name
* Date
* City
* State
* Country
* Organizer - The organisation who organizes the event
* Admin code - This value will be auto generated, and can be changed by the user. Scorekeepers need this code to authentice themselves to the system.
* Referee code - This value will be auto generated, and can be changed by the user. Referees need this code to authentice themselves to the system.

## 2.2. Team information
Every tournament needs teams, which can be entered in this screen. There will also be an Excel import feature, which is not yet represented in the mockups.

![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/03.%20Wizard%20-%20Teams.png)

Of each team the following information is requested:
* ID
* Name
* City
* State (not required)
* Country

## 2.3. Round information
Here the user can setup the rounds for the robot-competition. Each round has a name and a type, both are required. If a rounds type is set to 'Qualifying' it will be used in the ranking.

![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/04.%20Wizard%20-%20Rounds.png)

## 2.4. Table information
Each match is played on a table, and thus the system needs to be aware of them. Only input needed is the name of the table.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/05.%20Wizard%20-%20Tables.png)

## 2.5. Table information
Referees judge the robot competitions, and are the last data needed for a complete score form. Just like tables the system only needs a name for the referees.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/06.%20Wizard%20-%20Referees.png)

## 2.6. Wizard completed
When all five screens are provided with data, the wizard is finished and the system is setup for the tournament. Here the user is also presented with the option to print out score forms, when the robot matches are judged using paper forms.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/07.%20Wizard%20-%20Completed.png)