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
import play.filters.csrf._
import services.Authenticator
import controllers.Secured

@Singleton
class AdminController @Inject()(environment: Environment, DatabaseController: DatabaseController, authenticator: Authenticator) extends Controller with Secured{

  def validateJson[A: Reads] = BodyParsers.parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

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
    authenticator.auth(request.session).flatMap { user =>
      val item = request.body
      DatabaseController.insertItem(Item(item.itemID, item.name, item.quantity, item.price, item.description, item.categoryID, null)).map { addedItem =>
        Ok(Json.obj("status" -> "Successful")).withSession(request.session + ("uploadID" -> addedItem.itemID.get.toString))
      }
    }
  }

  def uploadItemPicture() = Admin.async(parse.multipartFormData) { request =>
    for {
      userOpt <- authenticator.auth(request.session)
    } yield {
      val p2 = for {
        user <- userOpt
        itemID <- request.session.get("uploadID")
        file <- request.body.file("picture")
      } yield {
        import java.io.File
        val filename = file.filename
        val contentType = file.contentType
        file.ref.moveTo(new File("/tmp/picture/" + filename))
        Ok(Json.obj("status" -> "Successful"))
      }
      p2.getOrElse(Ok(Json.obj("status" -> "Successful")))
    }
  }

  case class removeItemForm(itemID: Int)

  implicit val removeItemFormReads: Reads[removeItemForm] = (
    (JsPath \ "itemID").read[Int](min(0))
    ).map(removeItemForm.apply _)

  def removeItem() = Admin.async (validateJson[removeItemForm]) { request =>
    authenticator.auth(request.session).flatMap {
      _ match {
        case Some(user) =>
          val item = request.body
          DatabaseController.removeItem(item.itemID).map { _ =>
            Ok(Json.obj("status" -> "Successful"))
          }
        case None => Future(Ok(""))
      }
    }  
  }
}
