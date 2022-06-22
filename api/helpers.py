from flask import jsonify

def isInt(id):
  try:
    int(id)
    return True
  except ValueError:
    return 'Id can\'t be cast at int', 404

def convertResponseToJson(pokemons):
  convertedResponse = []

  if isinstance(pokemons, list):
    for pokemon in pokemons:
      convertedResponse.append({
        "id": pokemon[0],
        "name": pokemon[1],
        "description": pokemon[2],
      })

  if not isinstance(pokemons, list):
    convertedResponse = {
      "id": pokemons[0],
      "name": pokemons[1],
      "description": pokemons[2],
    }

  return jsonify(convertedResponse)