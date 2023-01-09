npm install typescript ts-node -g

irc and fs module

npm i --save-dev @types/node

~~npm install child_process -g (module to spawn python subprocess that generated simulated position data)~~

.

(main.ts located in src)

"node main.ts" or "npx ts-node main.ts" 

.

Dec 2: Saw bot in specified server channel successfully

Dec 8: Bot successfully scraped + sent simulated position data that was randomly generated into a text file (!position)

Dec 14: Added !approach !loiter !transit !elev !egress !airspace

Dec 15: Added timer to !loiter and added !loiteroff; also made !loiter turn off if no longer loitering e.g. !egress is used

Jan 4: Added !repeat and !repeatoff

Jan 6: Continuation of project transferred over to TSIRCBot branch for code cleanup, optimization, and further implementation of TypeScript.

.

This branch is now an archive for reference purposes.
