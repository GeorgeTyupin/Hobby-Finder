from . import database

def loadAdToDatabase(data, session):
  if session['login']:
    data['author_id'] = session['id']
    db = database.Database()
    if data['ad_name']:
      db.addAD(data)
  if data['ad_name']:
    return db.loadAdsTable()