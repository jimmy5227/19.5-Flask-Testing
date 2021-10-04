from boggle import Boggle
from flask import Flask, render_template, request, jsonify, session

boggle_game = Boggle()

app = Flask(__name__)
app.config['SECRET_KEY'] = 'HelloWorld'


@app.route('/')
def index():
    board = boggle_game.make_board()
    session['board'] = board
    return render_template('index.html', board=board)


@app.route('/check-word')
def check_word():
    word = request.args['word']
    board = session['board']
    result = boggle_game.check_valid_word(board, word)
    return jsonify({'result': result})
