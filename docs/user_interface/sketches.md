Sketches of user interfaces
========================

Introduction
------------
In the regional games of the FLL, much effort is required from referees and scoring people to record and process scores.
If the scoring requires no effort, more attention can be given to the game/the children.
We aim to develop a software/hardware solution that makes scoring effortless.

Regional games are often in places without internet acces or wireless connection.
Scoring using a handheld device (running IoS or Android), 
will allow fast processing of recorded playing field to final scoring.
These scores can then be processed on a PC.
By building a modular system, with well defined communication between modules, 
any inputs can be given either manually or using communication between devices.

User interfaces
------------------
The apearance of the user interface depends on the functionality that is given to the handheld devices and PC.
For now, the assumption is made that the handheld device is used mainly for filling out the score sheet, 
and the PC is used for ranking teams on scores.

Handheld device user interface
------------------------------
Using the app should be easy since the fllscoring system will be used by many people, who will not use it daily.
Therefore the choices the user has to make should be intuitive and come in a logical order.
Buttons shown in blue directly execute an action. Buttons shown in yellow will lead to a different 
menu or require the input of data.

###Overview of user interface interactions
![](http://www.esrac.ele.tue.nl/~koen/images_handheld/total.png)

This image gives an overview of the connections between the user interface screens.
An arrow starting from a button indicates this button opens the indicated screen, either directly or after input of data by the user.
Each screen is explained in the next sections.

###Main menu

![](http://www.esrac.ele.tue.nl/~koen/images_handheld/main_menu.png)

In the main menu, there is the choice to edit previously recorded scores, or to record new scores.


###Main menu > Records scores

![](http://www.esrac.ele.tue.nl/~koen/images_handheld/record_scores.png)

After the user has selected to record scores in the main menu, the parameters for the scores to be recorded can be set.

In order to calculate the scores, the playing field along with its associated scoring sheet should be selected.
Possibly, one playing field can have multiple scoring sheets.

The team name of the team to be scored should also be set. The name can be used only locally, or also when transferring data to the PC software. A choice has to be made here on how and where team names can be created.

A fll game consists of three rounds. The score of each round is recorded.

After all parameters have been set, the start scoring button is enabled. 

Selecting one of the other buttons will give a submenu of the Record scores screen:

###Main menu > Record scores > Select playing field

![](http://www.esrac.ele.tue.nl/~koen/images_handheld/select_playing_field.png)

The user should select the correct playing field from a list.
Possibly there is a choice to select alternative scoring sheets for one playing field.
This list could possibly include images of the available playing fields.
Playing fields that are already availably can downloaded as part of the app.
Possibly the user is also given an option to download the latest available playing fields.

###Main menu > Record scores > Set team name

![](http://www.esrac.ele.tue.nl/~koen/images_handheld/set_team_name.png)

For recording the scores, a unique team name should be given. Team names are a possible source of errors in 
the persistency, since spelling errors in team names can lead to differently recored team names in the handheld app and the PC software. Therefore, ideally the team names are only created once. 

The user can select the team name from a list of names that is known on the device.

The user can download a list of team names from a local or global server.

The user can create a new team.

The user can erease one or more teams from the local list.

###Main menu > Record scores > Start scoring

![](http://www.esrac.ele.tue.nl/~koen/images_handheld/set_team_name.png)

When the user starts scoring, the scoring sheet is shown.
Multiply types of input should be given.
This can be yes/no choices, multiply choice answers, or integer numbers.

At the end of the scoring sheet, the team name, round number, and total score are shown, such that these can 
be directly recorded on paper or in the PC application. 

An option is given to save the data, possibly sending it to the local or a global server, or to discard the current scoring sheet.







