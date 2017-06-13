package models

/**
  * Created by orkun on 27/04/17.
  */
case class User(userID: Option[Int], username: String, email: String, name: String, surname: String, password: String, isAdmin: Boolean)
