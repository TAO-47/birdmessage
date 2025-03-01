import os
from flask import Flask, render_template, jsonify

app = Flask(__name__)

# Load the secret message from the static folder
def get_secret_message():
    secret_file_path = os.path.join("static", "secret.txt")  # Read from static/
    with open(secret_file_path, "r") as file:
        return file.read().strip()

@app.route("/")
def home():
    return render_template("birdmessage.html")

@app.route("/message")
def secret_message():
    message = get_secret_message()
    return jsonify({"message": message})

if __name__ == "__main__":
    app.run(debug=True)
