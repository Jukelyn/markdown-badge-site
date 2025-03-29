# pylint: disable=E0401
"""_summary_"""
from flask import render_template
from src.utils import timestamp


def index_route(app):
    """_summary_

    Args:
        app (_type_): _description_
    """

    @app.route("/", methods=["GET", "POST"])
    def index():
        """Renders the main page."""

        current_time = timestamp.get_time()

        return render_template("index.html", currentTime=current_time)
