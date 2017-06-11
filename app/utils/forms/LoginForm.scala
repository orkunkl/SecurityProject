package utils.forms
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.libs.json.Reads._
/**
  * Created by orkun on 27/04/17.
  */
case class LoginForm(username: String, password: String)

