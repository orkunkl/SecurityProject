package controllers

import scala.concurrent.Future

import javax.inject._
import play.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Reads._
import play.api.mvc._
import services.{DatabaseController, DatabaseTrait}
import utils.DatabaseHelpers._
import play.api.libs.functional.syntax._
import play.api.libs.json._
import play.api.libs.json.Reads._
import models.Item
import controllers.Secured
import utils.forms.LoginForm
import pdi.jwt._
import pdi.jwt.JwtSession._
import pdi.jwt.Jwt._
import utils.UserAuthData

@Singleton
class AdminController @Inject()(environment: Environment, DatabaseController: DatabaseController) extends Controller with Secured{

  def validateJson[A: Reads] = BodyParsers.parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  def adminLogin = Action.async(validateJson[LoginForm]) { implicit request =>
    
    val user = request.body
    DatabaseController.userLookup(user.username, user.password).map{
      _ match {
        case userFoundPasswordMatches(user) => {
          if(user.isAdmin)
            Ok(Json.obj("status" -> "Successful")).addingToJwtSession("user", UserAuthData(user.userID.get, user.username, user.password, user.isAdmin))
          else
            Ok(Json.obj("status" -> "User is not admin"))
        }
        case userFoundPasswordNoMatch => Ok(Json.obj("status" -> "password do not match"))
        case userNotFound => Ok(Json.obj("status" -> "user not found"))
      }  
    }
  }
  case class ItemFormat(itemID: Option[Int], name: String, quantity: Int, price: Float, description: String, categoryID: Int)

  implicit val itemReads: Reads[ItemFormat] = (
    (JsPath \ "itemID").readNullable[Int] and
      (JsPath \ "name").read[String] and
      (JsPath \ "quantity").read[Int] and
      (JsPath \ "price").read[Float] and
      (JsPath \ "description").read[String] and
      (JsPath \ "categoryID").read[Int]
    ) (ItemFormat)

  //case class Item(itemID: Option[Int], name: str,ng, quantity: Int, price: Float, description: String, categoryID: Int)

  def addItem() = Admin.async(validateJson[ItemFormat]) { request =>
    val item = request.body
    DatabaseController.insertItem(Item(item.itemID, item.name, item.quantity, item.price, item.description, null)).map { addedItem =>
      Ok(Json.obj("status" -> "Successful")).withSession(request.session + ("uploadID" -> addedItem.itemID.get.toString))
    }
  }
  implicit val LoginFormReads: Reads[LoginForm] = (
    (JsPath \ "username").read[String] and
    (JsPath \ "password").read[String]
  )(LoginForm)
  
  def uploadItemPicture() = Admin.async(parse.multipartFormData) { request =>
    
    request.session.get("uploadID") match {
        case Some(uploadID: String) => {
          request.body.file("picture") match {
            case Some(file) => {
              import java.io.File
              val filename = file.filename
              val contentType = file.contentType
              file.ref.moveTo(new File("/tmp/picture/" + filename))
              Future(Ok(Json.obj("status" -> "Successful")))
            }
            case None => Future(Ok(Json.obj("status" -> "no id found")))

          }
        }
        case None => Future(Ok(Json.obj("status" -> "no id found")))
    }
  }

  case class removeItemForm(itemID: Int)

  implicit val removeItemFormReads: Reads[removeItemForm] = (
    (JsPath \ "itemID").read[Int](min(0))
    ).map(removeItemForm.apply _)

  def removeItem() = Admin.async (validateJson[removeItemForm]) { request =>
    val item = request.body
    DatabaseController.removeItem(item.itemID).map { _ =>
      Ok(Json.obj("status" -> "Successful"))
    }
  }
}
