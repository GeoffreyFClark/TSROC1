import random
from random import uniform
import sys

x, y = uniform(-90,90), uniform(-180, 180)
z = random.randint(36,50)*500

print("latitude: {}".format(x))
print("longitude: {}".format(y))
print("altitude: {}".format(z))

sys.stdout.flush()

# with open('temporarytextfile', 'w') as s:
#     s.write("Latitude: " + str(x) + "\n")
#     s.write("Longitude: " + str(y) + "\n")
#     s.write("Altitude: " + str(z))

#  internalCommand.position = function(opts) {
#     var pythonProcess = spawn('python',['X:/CODING Projects/Air Force/airforce2/src/modules/simulatepositdata/positiondatasimulated.py']);
#     pythonProcess.stdout.on('data', (data) => {
#       client.say(sendTo, data) // Line to do something with the data returned from python script
#      });
    # // var acPositionData = fs.readFileSync('X:/CODING Projects/Air Force/airforce2/src/modules/simulatepositdata/temporarytextfile',
    # // {encoding:'utf8', flag:'r'});
    # // client.say(sendTo, acPositionData)