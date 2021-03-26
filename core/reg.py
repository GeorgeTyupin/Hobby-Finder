from . import database
from flask import Flask, render_template, make_response, request, session, redirect

def POST(session, login, password):
  db = database.Database()

  result = db.loadUsersTable(login)

  if result:
    return "Такой пользователь уже существует"

  db.addUser(login, password)

  print('1')
  result = db.loadUsersTable(login)
  session['login'] = login
  session['id'] = result[0]
  # session['category'] = result[3]
  session['auth'] = True
  print('2')
  response = make_response(redirect("/"))
  print('3')
  return response
