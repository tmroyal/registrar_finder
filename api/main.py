from flask import Flask, request, jsonify
from flask_cors import CORS, cross_origin
import whois
from whois.parser import PywhoisError


whois.parser.WhoisEntry._regex['registrar_url'] = 'Registrar URL: *(.+)'

app = Flask(__name__)
cors = CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

def format_result(message, code=200):
    return {
        "message": message,
        "code": code
    }

@app.route("/domain")
@cross_origin()
def index():
    name = request.args.get("name", "")
    result = {}
    if not name:
        result = format_result(
            message="name not provided",
            code=400
        )
    else:
        try:
            domain = whois.whois( name )
            if not domain.registrar:
                result = format_result(
                    message="registrar not found",
                    code=404
                )
            else:
                result = format_result({
                    'registrar': domain.registrar,
                    'registrar_url': domain.registrar_url
                })
        except PywhoisError:
            result = format_result(
                message="registrar not found",
                code=404
            )
    return jsonify(result), result.get('code', 200)
