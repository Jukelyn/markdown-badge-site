# pylint: disable=E0401
"""This module provides the route for the index page."""
import json
from flask import render_template
from src.utils import timestamp

DATA_PATH = "data/badges.json"


def index_route(app):
    """
    Registers the main entry point of the application.

    Args:
        app (Flask): The Flask application instance.
    """

    @app.route("/", methods=["GET"])
    def index():
        """
        Handles requests to the main `/` route.
        """

        with open(DATA_PATH, "r", encoding="utf-8") as f:
            data = json.load(f)

        print(data)
        current_time = timestamp.get_time()
        return render_template("index.html",
                               data=data,
                               currentTime=current_time)
