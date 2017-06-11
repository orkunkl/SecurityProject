package models
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.libs.json.Reads._
/**
  * Created by orkun on 27/04/17.
  */
case class User(userID: Option[Int], username: String, email: String, name: String, surname: String, password: String, isAdmin: Boolean)
