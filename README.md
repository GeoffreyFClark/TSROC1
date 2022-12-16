npm install typescript ts-node -g

npm install irc -g

npm install fs -g

npm i --save-dev @types/node

~~npm install child_process -g (module to spawn python subprocess that generated simulated position data)~~

.

Run using: "node main.ts" or "npx ts-node main.ts" (main.ts located in src)

.

Dec 2: Saw bot in specified server channel successfully

Dec 8: Bot successfully scraped + sent simulated position data that was randomly generated into a text file (!position)

Dec 14: Added !approach !loiter !transit !elev !egress !airspace

Dec 15: Added timer to !loiter and added !loiteroff
