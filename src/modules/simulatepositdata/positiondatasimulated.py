import random
from random import uniform

x, y = uniform(-90,90), uniform(-180, 180)
z = random.randint(36,50)*500

print("latitude: {}".format(x))
print("longitude: {}".format(y))
print("altitude: {}".format(z))

with open('temporarytextfile', 'w') as s:
    s.write("Latitude: " + str(x) + "\n")
    s.write("Longitude: " + str(y) + "\n")
    s.write("Altitude: " + str(z))