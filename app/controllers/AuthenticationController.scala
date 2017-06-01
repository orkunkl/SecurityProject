package controllers

import scala.concurrent.Future

import javax.inject._
import models._
import play.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.libs.json.Reads._
import play.api.mvc._
import services.{DatabaseController}
import utils.forms._
import utils.DatabaseHelpers._
import utils.UserAuthData
import play.api.Logger
import services.Authenticator
import com.github.t3hnar.bcrypt._
import pdi.jwt._
import pdi.jwt.JwtSession._
import pdi.jwt.Jwt._
import play.filters.csrf._

@Singleton
class AuthenticationController @Inject()(environment: Environment, DatabaseController: DatabaseController, authenticator: Authenticator, addToken: CSRFAddToken, checkToken: CSRFCheck) extends Controller {

  def validateJson[A : Reads] = BodyParsers.parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  /**
  *
  *   Register    
  *
  */
  implicit val RegisterFormReads: Reads[RegisterForm] = (
    (JsPath \ "username").read[String] and
    (JsPath \ "email").read[String] and
    (JsPath \ "name").read[String] and
    (JsPath \ "surname").read[String] and
    (JsPath \ "password").read[String]
  )(RegisterForm)


  def register = addToken {  
      Action.async(validateJson[RegisterForm]){ implicit request =>
        val user = request.body
        for {
          checkUsername <- DatabaseController.checkUsernameTaken(user.username)
          if checkUsername
          addedUser <- DatabaseController.addNewUser(User(None, user.username, user.email, user.name, user.surname, user.password.bcrypt, false))
        } yield {
          Logger.info("/register recieved user : " + addedUser)
          Ok(Json.obj("status" -> "Successful")).addingToJwtSession("user", UserAuthData(addedUser.userID.get, addedUser.username, addedUser.password, addedUser.isAdmin))
        }
        Future(Ok(Json.obj("status" -> "Successful")))
    }
  }
  
  /*
  *
  *   Login
  *
  */
  implicit val LoginFormReads: Reads[LoginForm] = (
    (JsPath \ "username").read[String] and
    (JsPath \ "password").read[String]
  )(LoginForm)

  def login = addToken {
    Action.async(validateJson[LoginForm]) { implicit request =>
    
      val user = request.body
      DatabaseController.userLookup(user.username, user.password).map{
        _ match {
          case userFoundPasswordMatches(user) => Ok(Json.obj("status" -> "Successful")).addingToJwtSession("user", UserAuthData(user.userID.get, user.username, user.password, user.isAdmin))
          case userFoundPasswordNoMatch => Ok(Json.obj("status" -> "password do not match"))
          case userNotFound => Ok(Json.obj("status" -> "user not found"))
        }
      }
    }
  }

  def logout = Action.async {
    Future{
      Ok(Json.obj("status" -> "successful")).withNewSession
    }
  }

}
