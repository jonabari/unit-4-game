# unit-4-game
Trilogy Assignment #4 - jQuery game

Three known bugs:
1 - The text size doesn't adjust during battles, so the window size changes to accommodate (shorter copy or a font adjustment would fix this).

2 - Player attacks DO increase each instance, but the display does NOT reflect it. I chose not to fix this, as it's dependent on the third bug...

3 - After the first battle, the attack function cycles through multiple times, which makes the math in future battles inconsistent (it is still possible to reasonably win or lose). I can understand why this happens (on click event inside of a function). However, I do not have time to implement the fix, so I'm taking a hit.

Thanks for reading!