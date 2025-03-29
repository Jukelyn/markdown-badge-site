# pylint: disable=E0401
"""
This endpoint re-downloads the README file and re-creates the badge data.
"""
import flask as Flask
from flask import render_template
import src.parse_md as parse


def update_route(app: Flask):
    """_summary_

    Args:
        app (Flask): _description_
    """

    @app.route("/update", methods=["POST"])
    def update():
        """Updates the badge data."""

        file = parse.get_readme()
        badges = parse.parse_markdown_tables(file)
        parse.save_to_json(badges)

        return render_template("index.html")
