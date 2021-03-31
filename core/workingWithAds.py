from . import database

def loadAdToDatabase(data, session):
  data['author_id'] = session['login']
  if data['ad_category'] or data['ad-description'] or data['ad_name']:
    db = database.Database()
    db.addAD(data)
  print(data)
  return data
