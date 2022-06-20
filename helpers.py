def isInt(id):
  try:
    int(id)
    return True
  except ValueError:
    return 'Id can\'t be cast at int', 404