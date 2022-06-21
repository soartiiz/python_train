from asyncio.windows_events import NULL
from flask import Flask, request, jsonify, g
from helpers import isInt
import sqlite3

app = Flask(__name__)
app.run(debug = True)

DATABASE = 'database.db'

def get_db():
  db = getattr(g, '_database', None)
  if db is None:
      db = g._database = sqlite3.connect(DATABASE)
  return db

@app.teardown_appcontext
def close_connection(exception):
    db = getattr(g, '_database', None)
    if db is not None:
        db.close()

with app.app_context():
  cur = get_db().cursor()
  cur.execute('''CREATE TABLE IF NOT EXISTS "pokemons" (
              "id"	INTEGER NOT NULL UNIQUE,
              "name"	TEXT NOT NULL,
              "description"	TEXT NOT NULL,
              PRIMARY KEY("id" AUTOINCREMENT)
            );''')

pokemons = [
  { "id": 0, "name": 'Salamèche' },
  { "id": 1, "name": 'Carapuce' },
  { "id": 2, "name": 'Bulbizarre' }
]

@app.route("/", methods = ['GET'])
def findPokemon():
  with app.app_context():
    cur = get_db().cursor()

    cur.execute('SELECT * FROM pokemons')
    pokemons = cur.fetchall()

    close_connection('')
    return jsonify(pokemons)

@app.route("/<id>", methods = ['GET'])
def findOnePokemon(id):
  if isInt(id) != True:
    return isInt(id)

  with app.app_context():
    cur = get_db().cursor()
    cur.execute('SELECT * FROM pokemons WHERE id=' + id)
    pokemon = cur.fetchone()

    if not pokemon:
      return 'Not found', 404

    close_connection('')
  return jsonify(pokemon)

@app.route("/create", methods = ['POST'])
def createPokemon():
  data = request.get_json()

  if not "name" in data:
    return 'Name required', 400

  if not "description" in data:
    return 'Description required', 400

  with app.app_context(): 
    cur = get_db().cursor()
    cur.execute("INSERT INTO pokemons (name, description) VALUES ('" + data['name'] + "', '" + data['description'] + "')")
    get_db().commit()
    close_connection('')

  data['id'] = len(pokemons)
  pokemons.append(data)
  return jsonify(pokemons)

@app.route("/<id>", methods = ['PUT'])
def updatePokemon(id):
  if isInt(id) != True:
    return isInt(id)

  data = request.get_json()

  try:
    index = next((index for (index, d) in enumerate(pokemons) if d["id"] == int(id)), None)
    pokemons[index]['name'] = data['name']

    return pokemons[index]
  except StopIteration:
    return 'Not found', 404

@app.route("/<id>", methods = ['DELETE'])
def deletePokemon(id):
  if isInt(id) != True:
    return isInt(id)

  try:
    pokemon = next(item for item in pokemons if item["id"] == int(id))
    return pokemon
  except StopIteration:
    return 'Not found', 404