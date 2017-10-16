# ScoreStore-App

This app stores scores of players, using a single json file, it sorts by mode, level and rank (higher score is better). See following bullet-points:

+ use of SocketIO to update score list for all clients in realtime
+ insert player (name, score) in array order by score descending
+ every mode/level will be shown seperately in a html table (client-side)
+ limit number of player entries up to 10 (mode x level x 10) with splice
+ store persistent score data as json file (server-side)
+ generate random list of random players 

