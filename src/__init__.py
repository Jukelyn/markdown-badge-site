# pylint: disable=E0401
"""_summary_"""
import os
from dotenv import load_dotenv
from flask import Flask
from src.routes import register_routes

load_dotenv()
app = Flask(__name__,
            template_folder="../templates",
            static_folder="../static")

app.secret_key = os.getenv("SECRET_KEY")
register_routes(app)
