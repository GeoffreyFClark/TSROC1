To download, install, and run the project, follow these steps:

1. Clone the repository using the following command in your IDE or terminal:
   git clone https://github.com/GeoffreyFClark/TSROC1

   Alternatively, download the ZIP file from the GitHub repository and extract it to your computer.

2. Open a terminal and navigate to the project directory.

3. Install the project dependencies:
   npm install

4. Install the TypeScript compiler (if not already installed):
   npm install -g typescript

5. Compile the TypeScript files in the /src directory into the /dist directory:
   tsc

6. Run the compiled JavaScript code using Node.js:
   node index.js

   If you receive an error saying 'Cannot find module index.js', try opening the terminal in the /dist directory and running the command again.

   Alternatively, you can use ts-node to run the TypeScript file directly:
   npx ts-node index.ts

Refer to the config folder for config.json options (e.g., server, channel, bot username, etc).
