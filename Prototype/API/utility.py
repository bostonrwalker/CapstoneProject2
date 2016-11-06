from pulp import *

class UtilityCombiner(object):

    def __init__(self, objectiveUtilities, wealthRange, wealthStep):
        '''
        objectiveUtilities: List of utility functions for each objective.
            a single element is a list of (delta_w, delta_u) tuples
        wealthRange: Tuple of min and max total available wealth
        wealthStep: Amount to shift wealth by when doing optimization
        '''
        self.objectiveUtilities = objectiveUtilities
        self.nObjectives = len(objectiveUtilities)
        self.minWealth = wealthRange(0)
        # check that maxWealth is more than minWealth
        self.maxWealth = wealthRange(1)
        self.wealthStep = wealthStep
        self.out = []

    def generateVars(self):
        self.x_list = []
        self.y_list = []
        self.w = {}
        self.u = {}

        for i in xrange(self.nObjectives):
            x.append([])
            y.append([])
            n = len(self.objectiveUtilities[i])
            for j in xrange(n):
                x[i].append(str(i) + str(j))
                if j < (n - 1):
                    y[i].append(str(i) + str(j))
                w[str(i) + str(j)] = self.objectiveUtilities[i][j][0]
                u[str(i) + str(j)] = self.objectiveUtilities[i][j][1]

        x_joined = [j for i in x_list for j in i]
        y_joined = [j for i in y_list for j in i]

        self.x = LpVariable.dicts("x", x_joined, 0, 1)
        self.y = LpVariable.dicts("y", y_joined, 0, 1, LpInteger)

    def generateProblem(self):
        self.prob = LpProblem("UtilityCombiner", LpMaximize)

        # add objective
        self.prob += lpSum([self.x[str(i) + str(j)] * self.u[str(i) + str(j)] for i in self.x_list for j in i])

        # add constraints
        self.prob += lpSum([self.x[str(i) + str(j)] * self.w[str(i) + str(j)] for i in self.x_list for j in i]) == self.minWealth

        for i in xrange(len(self.y_list)):
            for j in xrange(len(self.y_list[i])):
                self.prob += self.x[str(i) + str(j)] - self.y[str(i) + str(j)] >= 0
                self.prob += self.y[str(i) + str(j)] - self.x[str(i) + str(j + 1)] >= 0

    def solveCurrWealth(self, currWealth):
        self.prob.constraints['_C1'].changeRHS(currWealth)
        self.prob.solve()
        self.out.append(currWealth, prob.objective.value())
        # add actual solutions?

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

    def solveFull(self):
        for i in xrange(self.minWealth, self.maxWealth, self.wealthStep):
            self.solveCurrWealth(self, i)
        # convert format of other utility functions

def appreciateUtility(utilityFunction, riskFreeRate):
    for elem in utiltiyFunction:
        elem[0] = elem[0] / (1 + riskFreeRate)
    return utilityFunction
