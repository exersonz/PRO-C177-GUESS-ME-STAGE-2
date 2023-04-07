from flask import Flask, render_template, jsonify
import random

# initalizing flask
app = Flask(__name__)

# words list
words = [
    {
        "inputs": 6,
        "hint": "MLB",
        "word": "baseball"
    },
    {
        "inputs": 5,
        "hint": "Korean short ribs",
        "word": "galbi"
    },
    {
        "inputs": 9,
        "hint": "Hershey's _________",
        "word": "chocolate"
    },
    {
        "inputs": 5,
        "hint": "Jungle Animal",
        "word": "tiger"
    },
    {
        "inputs": 10,
        "hint": "Fruit (berry)",
        "word": "strawberry"
    }
]

# writing a flask API to render index.html
@app.route("/")
def index():
    return render_template("index.html")

# writing a flask API to get the words
@app.route("/get-word")
def get_word():
    return jsonify({
        "status": "success",
        "word": random.choice(words)
    })

if __name__ == "__main__":
    app.run()