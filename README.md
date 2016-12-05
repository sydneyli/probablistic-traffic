# Probabalistic traffic simulations
## CS269i project
## Kerem Goksel, Saachi Jain, Sydney Li
Run `make` and open index.html to play with stuff.
Make lets you compile different models together!
* `modelHarness.wppl` implements functionality that's common to all models like action choosing(`act`), simulation(`simulate`), state guessing for players, utility and player switching.
* `modelAnalysis.wppl` provides analysis methods, all wrapped in an `analyzeState(state)` method that visualizes various decisions and outcomes for both players when starting from the given state
* `commands.wppl` is the final file that lets you specify which states you want to analyze
* `traffic.wppl` is the basic model file. All models need to implement the following:
    * Constants:
        * `defaultDepth`: `int` that defines how many steps into the future the agents look when deciding
        * `actExecutions`: `int` that determines how many executions the enumerative inference runs when inferring action choice
        * `simulateExecutions: `int` that determines how many executions the enumerative inference runs when inferring simulation outcomes
    * Methods:
        * `pedPrior(state)`: function that return a distribution over the pedestrian's action given a state
        * `carPrior(state)`: function that returns a distribution over the car's action given a state
        * `transition(state, move, player)`: function that transitions a given state to the new state given the specified player's action
        * `crashed(state)`: returns true if a crash happened in the given state
        * `carReward(state)`: returns the reward the car gets if this is the terminal state
        * `pedReward(state)`: returns the reward the ped gets if this is the terminal state
        * `isTerminal(state)`: returns whether the state is terminal
        * `guessCarState(state)`: returns the pedestrian's guess of the full state (can return the same state if all information is global, otherwise pedestrian has to randomly guess a specific state given its information)
        * `guessPedState(state)`: returns the car's guess of the full state (can return the same state if all information is global, otherwise car has to randomly guess a specific state given its information)
