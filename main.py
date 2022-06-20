from flask import Flask, request, jsonify
from helpers import isInt
import sqlite3

con.sql

app = Flask(__name__)
app.run(debug = True)

pokemons = [
  { "id": 0, "name": 'Salamèche' },
  { "id": 1, "name": 'Carapuce' },
  { "id": 2, "name": 'Bulbizarre' }
]

@app.route("/", methods = ['GET'])
def findPokemon():
  return jsonify(pokemons)

@app.route("/add", methods = ['POST'])
def addPokemon():
  data = request.get_json()

  if not "name" in data:
    return 'Name required', 400

  data['id'] = len(pokemons)
  pokemons.append(data)
  return jsonify(pokemons)

@app.route("/<id>", methods = ['GET'])
def findOnePokemon(id):
  if isInt(id) != True:
    return isInt(id)

  try:
    pokemon = next(item for item in pokemons if item["id"] == int(id))
    return pokemon
  except StopIteration:
    return 'Not found', 404

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