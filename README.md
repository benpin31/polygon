# Polygon classes and sat-collision-algorithm
The purpose of this project is to create a js version of 2D sat collision algorithm which allow to detect collision between 2 hitbox in game. Better version clearly already exists, but I do this project for learning purpose.

Module polygon contains some classes to manage polygon gemetry in code. Principal classes is classes polygon which contains a method sat for (Separating Axes Theorem) which compute if two polygones are separated.

Other classes are : 
- point, vector, straightLine : they are requisite in polygon definitions and methods
- square which extend polygon in the special case of square
