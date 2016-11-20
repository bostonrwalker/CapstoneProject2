from flask import Flask
app = Flask(__name__)

import WealthStream.api
import WealthStream.views
