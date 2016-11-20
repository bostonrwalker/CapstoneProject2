import nose
from nose.tools import *
import json

from WealthStream import api

from . import test_app

def test_get_utilization_1():
	# Test with single, linear function of wealth
	payload = {
		"wealth": 1000,
		"spendingObjectives": [
			{
				"name": "rent",
				"utility": {
					"initialUtility": -5000,
					"slopes": [
						{
							"deltaWealth": 5000,
							"deltaUtility": 10000
						}
					]
				}
			}
		]
	}
	################################################################################
	resp = test_app.put("/api/optimal_spending_basket", data = json.dumps(payload), headers = { "Content-Type": "application/json" })
	status_code = resp.status_code
	data = json.loads(resp.data)
	################################################################################
	
  	# Check that optimization was successful
  	eq_(status_code,200)

  	# Check that optimal utility is as expected
  	eq_(1, len(data["spendingActions"]))
  	eq_("rent", data["spendingActions"][0]["objective"]["name"])
  	eq_(1000, data["spendingActions"][0]["wealthSpent"])
  	eq_(-3000, data["spendingActions"][0]["utilityReceived"])
  	eq_(1000, data["totalWealthSpent"])
  	eq_(-3000, data["totalUtilityReceived"])

