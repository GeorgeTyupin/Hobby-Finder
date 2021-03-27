from . import database
from flask import Flask, render_template, make_response, request, session, redirect

def POST(session, login, password):
  db = database.Database()

  result = db.loadUsersTable(login)

  if result:
    return "Такой пользователь уже существует"

  db.addUser(login, password)

  result = db.loadUsersTable(login)
  session['login'] = login
  session['id'] = result[0]
  # session['category'] = result[3]
  session['auth'] = True
  response = make_response(redirect("/"))
  return response
