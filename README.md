Directions to download and install the project, 
install the dependencies, 
build the project using the TypeScript compiler, 
and run the compiled JavaScript code using Node.js:

1. Click the "Clone or download" button.
2. Click the "Download ZIP" button to download the project as a ZIP file.
3. Extract the ZIP file to a location on your computer.

Alternative method to download this project via terminal:
1. Open a terminal or command prompt.
2. Navigate to the directory where you want to download this project branch. 
3. Run the following command: git clone -b TSIRCBot https://github.com/GeoffreyFClark/TSROC1.git

.

4. Open a terminal or command prompt and navigate to the project directory.
5. Install the dependencies for the project by running the following command: npm install
6. Install the TypeScript compiler (tsc) if not already installed by running the following command: npm install -g typescript
7. Build the project by running the following command to compile /src files into /dist: tsc
8. Run the compiled JavaScript code (located in dist folder) using Node.js by running the command: node index.js
(If you receive an error saying 'Cannot find module index.js' you can try to open it in your terminal first, and then run node index.js afterwards)

. 

See config folder for config.json options (e.g. server, channel, bot username, etc)
