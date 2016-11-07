from pulp import *

class Slope(object):

    def __init__(self, delta_w, delta_u):
        self.deltaWealth = delta_w
        self.deltaUtility = delta_u

class UtilityFunction(object):

    def __init__(self, initialUtility, slopes):
        self.initialUtility = initialUtility
        self.slopes = slopes

class SpendingObjective(object):
    
    def __init__(self, name, utility):
        self.name = name
        self.utility = utility

class SpendingAction(object):

    def __init__(self, objective, wealthSpent, utilityReceived):
        self.objective = objective
        self.wealthSpent = wealthSpent
        self.utilityReceived = utilityReceived

class SpendingBasket(object):

    def __init__(self, spendingActions, totalWealthSpent, totalUtilityReceived):
        self.spendingActions = spendingActions
        self.totalWealthSpent = totalWealthSpent
        self.totalUtilityReceived = totalUtilityReceived

class UtilityCombiner(object):

    def __init__(self, spendingObjectives, wealthRange=None, wealthStep=None):
        '''
        spendingObjectives: List of objectives.
            a single element is a list of (delta_w, delta_u) tuples
        wealthRange: Tuple of min and max total available wealth
        wealthStep: Amount to shift wealth by when doing optimization
        '''
        self.initialUtilities = []
        self.objectiveSlopes = []
        for elem in spendingObjectives:
            temp = elem.utility
            self.initialUtilities.append(temp.initialUtility)
            self.objectiveSlopes.append(temp.slopes)
        self.zeroUtility = sum(self.initialUtilities)
        self.nObjectives = len(spendingObjectives)
        self.minWealth = wealthRange(0) if wealthRange else 0
        # check that maxWealth is more than minWealth
        self.maxWealth = wealthRange(1) if wealthRange else 0
        self.wealthStep = wealthStep if wealthStep else 0
        self.out = []
        self.generateVars()
        self.generateProblem()

    def generateVars(self):
        x_list = []
        y_list = []
        self.w = {}
        self.u = {}

        for i in xrange(self.nObjectives):
            x_list.append([])
            y_list.append([])
            n = len(self.objectiveSlopes[i])
            for j in xrange(n):
                x_list[i].append(str(i) + str(j))
                if j < (n - 1):
                    y_list[i].append(str(i) + str(j))
                self.w[str(i) + str(j)] = self.objectiveSlopes[i][j].deltaWealth
                self.u[str(i) + str(j)] = self.objectiveSlopes[i][j].deltaUtility

        x_joined = [j for i in x_list for j in i]
        y_joined = [j for i in y_list for j in i]

        self.x_list = x_list
        self.y_list = y_list
        self.x = LpVariable.dicts("x", x_joined, 0, 1)
        self.y = LpVariable.dicts("y", y_joined, 0, 1, LpInteger)

    def generateProblem(self):
        self.prob = LpProblem("UtilityCombiner", LpMaximize)

        # add objective
        self.prob += lpSum([self.x[j] * self.u[j] for i in self.x_list for j in i])

        # add constraints
        self.prob += lpSum([self.x[j] * self.w[j] for i in self.x_list for j in i]) == self.minWealth

        for i in xrange(len(self.y_list)):
            for j in xrange(len(self.y_list[i])):
                self.prob += self.x[str(i) + str(j)] - self.y[str(i) + str(j)] >= 0
                self.prob += self.y[str(i) + str(j)] - self.x[str(i) + str(j + 1)] >= 0

    def solveGivenWealth(self, wealth, save=False):
        self.prob.constraints['_C1'].changeRHS(wealth)
        self.prob.solve()
        
        if save:
            self.out.append((wealth, self.prob.objective.value() + self.zeroUtility))
        else:
            out = []
            for i in xrange(len(self.x_list)):
                wealth = 0
                utility = 0
                for j in xrange(len(self.x_list[i])):
                    curr = self.x[str(i) + str(j)].varValue
                    wealth += self.w[str(i) + str(j)] * curr
                    utility += self.u[str(i) + str(j)] * curr
                out.append((wealth, utility + self.initialUtilities[i]))
            return out

    def outToUtility(self):
        out = self.out
        new = []
        for i in xrange(len(out)):
            if i == 0:
                if self.minWealth != 0:
                    new.append(out[i])
            elif i == 1:
                if (len(new) != 0) and ((out[1][1] - out[0][1]) == (out[0][1])):
                    new[-1] = (new[-1][0] + out[1][0], new[-1][1] + out[1][1])
                else:
                    new.append(out[i])
            elif (out[i][1] - out[i - 1][1]) == (out[i - 1][1] - out[i - 2][1]):
                new[-1] = (new[-1][0] + out[i][0], new[-1][1] + out[i][1])
        return new

    def solveFull(self):
        for i in xrange(self.minWealth, self.maxWealth, self.wealthStep):
            self.solveGivenWealth(self, i, True)
        # convert format of other utility functions

def appreciateUtility(utilityFunction, riskFreeRate):
    for elem in utiltiyFunction:
        elem[0] = elem[0] / (1 + riskFreeRate)
    return utilityFunction

def getUtilization(wealth, spendingObjectives):
    solver = UtilityCombiner(spendingObjectives)
    solution = solver.solveGivenWealth(wealth)
    spendingActions = []
    totalWealthSpent = 0
    totalUtilityReceived = 0
    for i in xrange(len(solution)):
        action = SpendingAction(spendingObjectives[i], solution[i][0], solution[i][1])
        totalWealthSpent += action.wealthSpent
        totalUtilityReceived += action.utilityReceived
        spendingActions.append(action)
    return SpendingBasket(spendingActions, totalWealthSpent, totalUtilityReceived)

if __name__ == "__main__":
    obj1 = SpendingObjective('obj1', UtilityFunction(0, [Slope(2, 5), Slope(5, 2)]))
    obj2 = SpendingObjective('obj2', UtilityFunction(0, [Slope(6, 1), Slope(1, 7)]))
    basket = getUtilization(6.9, [obj1, obj2])

