import sys
import json
from flask import Flask, request
from flask_restplus import Resource, Api, fields
from flask_api import status
from WealthStream import app

sys.path.append('/Users/bostonwalker/Desktop/WealthStream/Prototype/Model/')

from utility import *

api = Api(app, prefix = '/api', doc = '/api', validate = True)

################################################################################
# Base data models
################################################################################

# UtilityFunction
#------------------------------------------------------------------------------#
#------------------------------------------------------------------------------#
utility_function_model = api.model('UtilityFunction', {
	'initialUtility': fields.Float(required = True, description = 'Utility of zero wealth'),
	'slopes': fields.List(fields.Nested(api.model('Slope', {
		'deltaWealth': fields.Float(required = True, minimum = 0),
		'deltaUtility': fields.Float(required = True)
	})), required = True, description = 'Segments of utility function')
})

# SpendingObjective
#------------------------------------------------------------------------------#
#------------------------------------------------------------------------------#
spending_objective_model = api.model('SpendingObjective', {
	'name': fields.String(required = True),
	'utility': fields.Nested(utility_function_model, required = True)
})

# SpendingAction
#------------------------------------------------------------------------------#
#------------------------------------------------------------------------------#
spending_action_model = api.model('SpendingAction', {
	'objective': fields.Nested(spending_objective_model),
	'wealthSpent': fields.Float(required = True, description = 'Dollar amount of wealth spent'),
	'utilityReceived': fields.Float(required = True, description = 'Utility received in utils')
})

# SpendingBasket
#------------------------------------------------------------------------------#
#------------------------------------------------------------------------------#
spending_basket_model = api.model('SpendingBasket', {
	'spendingActions': fields.List(fields.Nested(spending_action_model),
		required = True, description = 'Optimal set of spending actions'),
	'totalWealthSpent': fields.Float(required = True, description = 'Total dollar amount of wealth spent'),
	'totalUtilityReceived': fields.Float(required = True, description = 'Total utility received in optimal spending solution')
})

################################################################################
# Endpoints
################################################################################

# /api/get_utilization
#------------------------------------------------------------------------------#
# Combine utility functions to infer spending decisions and realized utility,
# given a fixed amount of wealth
#------------------------------------------------------------------------------#

get_utilization_model = api.model('GetUtilizationModel', {
	'wealth': fields.Float(required = True, description = 'Dollar amount of wealth'),
	'spendingObjectives': fields.List(fields.Nested(spending_objective_model),
 		required = True, description = 'List of spending objectives'
 	)
})

@api.route('/optimal_spending_basket')
@api.response(200, 'Successful optimization', spending_basket_model)
@api.response(400, 'Validation Error')
class GetUtilizationHandler(Resource):
	@api.expect(get_utilization_model)
	@api.marshal_with(spending_basket_model)
	def put(self):
		# Expect two arguments: wealth (numeric) and spendingObjectives (object)
		wealth = api.payload['wealth']
		spending_objectives = map(SpendingObjective.fromJson, api.payload['spendingObjectives'])
		# Call underlying function
		spendingBasket = getUtilization(wealth, spending_objectives)
		return spendingBasket, status.HTTP_200_OK

	def mediatypes(self):
		return ['application/json']

if __name__ == '__main__':
    app.run(debug=True)
