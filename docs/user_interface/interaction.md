# Introduction
In effort to make recording and managing scores as easy and dynamic as possible a simplistic user interface is needed, with a logical flow between different screens and modes of the system. 

This document describes the screens of the application and the flow between them.

**Note 1:** All terminology is not final, and is bound to change.
**Note 2:** All images used in this document are mockups, not final designs. (!!!)

# 1. Server/Client/Calculator

The system has three modes:
* Server mode will present the user with a wizard to create and setup the tournament. A five page wizard makes sure the tournament is set up, and the system is ready for use.
* Client mode can connect to an existing server, or use the current device as a server if no network is available for the tournament.
* Score calculator mode is intended for tournaments which work with paper scoring forms. The scorekeeper(s) can use this mode to calculate scores and write them down to the paper scoring forms.

The user will start with a choice between these three.

![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/01.%20Apptype%20choice.png)

# 2. Setup wizard
In order to make the system easy to use, a wizard is provided to setup the tournament. This wizards contains five steps, after which the whole system is ready for use. The wizard contains of:
* **Tournament information
* Team information
* Team information
* Round information
* Referee information

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

# 3. Using the system
When the tournament is set up, the system can be used. Here the user is presented with the option to connect to a server which hosts the tournament data, or use locally stored data (from the setup flow) if only one device is used or no network is available. There are two ways to connect to a server; using a QR-code scanner, or by entering the server address manually. The system can also be just as a calculation tool. When this option is selected the scoreform is presented, with no option to save or send out score data. (see #5)
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/08.%20Client%20-%20Select%20connect%20type.png)

# 4. Authenticating
After connecting to a server, the user can choose between being a scorekeeper and being a referee. After a choice is made the authentication code is requested. This is the admin or referee code as entered during the setup-wizard. This code needs to be distrubuted manually before the start of the tournament.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/08.%20Client%20-%20Select%20connect%20type.png)

# 5. Just scoring
For the score calculation mode no authentication, tournament setup or network connection is needed. This mode is designed for scorekeepers who receive paper scoreforms, and need to calculate the scores.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/08.%20Client%20-%20Select%20connect%20type.png)

# 6. Being a referee
When a referee is authenticated, he/she is presented with the score form. To use the score form a couple of selections need to be made; Referee, table, round and team. When a score is saved round and team will be reset, referee and table will be remembered by the system. After the referee enteres the values into the scoreform, the score can be read from the screen. 
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/11.%20Referee%20-%20Local-Network%20-%20Score.png)
Before actually sending out the score the team and round will be displayed again, so mistakes can be spotted. One of the contesters will sign their autograph, and the score can be send out. Wether the system is configured for local or network mode, the referee's way of working is exactly the same.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/12.%20Referee%20-%20Local-Network%20-%20Confirm.png)

# 7. Being a scorekeeper
The scorekeeper sees an overview of all scores send in by referees, the ranking of these scores and has the ability to publish scores and generate outputs of scores/ranking in various formats.

## 7.1 Scores
The scores view shows an overview of all scores send in by referees. The view is sorted by team-id by default, but can be sorted otherwise by clicking/tapping one of the table-headers. When a tournament is using paper forms at the robot games the scorekeeper can enter scores in this view. By tapping a score, or empty score field, a textfield appears where the score can be typed. Alternatively a button appears which opens the scoreform, so the scorekeeper can copy the paper form into the system.
The scorekeeper will also be notified here when the system has received multiple scores for a team in a certain round. The scorekeeper can use the Scores or Logs view to resolve these issues.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/13.%20Scorekeeper%20-%20Scores.png)

## 7.2 Ranking
The ranking view shows the scores, but ordered on the highest score. The teams who will advance to the next round shall be highlighted for readability.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/14.%20Scorekeeper%20-%20Ranking.png)

## 7.3 Output
The output view is the heart and soul for connecting to other systems. The scorekeeper can publish scores here, for display on beamer overlays. Also selected rounds can be exported to Excel, CSV, JSON and XML to make sure connecting other systems is as easy as possible.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/15.%20Scorekeeper%20-%20Output.png)

## 7.4 Logs
In the logs view the raw scores are displayed, by default ordered by date/time of score entry. This view can be used by the scorekeeper to validate scores when issues have been found. It also displays the table on which the robot match has been played, and also the referee who judged the match.
![](https://raw.githubusercontent.com/FirstLegoLeague/fllscoring/master/docs/user_interface/mockups/PNGs/16.%20Scorekeeper%20-%20Logs.png)