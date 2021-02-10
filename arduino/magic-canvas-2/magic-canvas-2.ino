#include <ServoEasing.h>
#include <Servo.h>
#include "wave.h"

int laserPositionsLength = sizeof(laser_positions)/sizeof(laser_positions[0]);
int tablePositionsLength = sizeof(table_positions)/sizeof(table_positions[0]);

ServoEasing laser;
Servo table;

int tickDuration = 250;

int laserI = 0;
int lastLaserPos = 0;
int tableI = 255;

unsigned int tickI = 0;
int laserEvery = 4;
int msPerLaser = tickDuration * laserEvery;
int tableEvery = 9;

void setup() {
  laser.setSpeed(40);
  laser.attach(9);  // attaches the servo on pin 9 to the servo object
  table.attach(2);
  Serial.begin(115200);
}

void moveLaser() {
  int laserPos;
  int degreesDiff;
  int degreesPerSecond;
  laserI = laserI == laserPositionsLength - 1 ? 0 : laserI + 1;
  laserPos = pgm_read_byte(&laser_positions[laserI]);
  degreesDiff = abs(laserPos - lastLaserPos);
  degreesPerSecond = (degreesDiff * (msPerLaser / 1000));
  Serial.println("Move laser; lastPos, pos, diff, degreesPerSecond: ");
  Serial.println(lastLaserPos);
  Serial.println(laserPos);
  Serial.println(degreesDiff);
  Serial.println(degreesPerSecond);
  lastLaserPos = laserPos;
  laser.setSpeed(degreesPerSecond);
  laser.startEaseTo(laserPos);
  
}

void moveTable() {
  int tablePos;
  tableI = tableI == tablePositionsLength - 1 ? 0 : tableI + 1;
  tablePos = pgm_read_byte(&table_positions[tableI]);
  Serial.print("Move table: ");
  Serial.println(tablePos);
  table.write(tablePos);
}

void loop() {
  tickI++;
  if (tickI % laserEvery == 0) {
    moveLaser();
  }
  if (tickI % tableEvery == 0) {
    moveTable();
  }
  delay(tickDuration);
}
