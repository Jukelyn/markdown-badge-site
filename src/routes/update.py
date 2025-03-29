# pylint: disable=E0401
"""
This endpoint re-downloads the README file and re-creates the badge data.
"""
from flask import render_template
import src.parse_md as parse


def update_route(app):
    """
    Registers the update route of the application.

    Args:
        app (Flask): _description_
    """

    @app.route("/update", methods=["POST"])
    def update():
        """
        Handles requests to the `/update` route.

        If the request method is POST it updates the badge data.
        """

        file = parse.get_readme()
        badges = parse.parse_markdown_tables(file)
        parse.save_to_json(badges)

        return render_template("index.html")
