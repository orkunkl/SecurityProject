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


@Singleton
class ItemController @Inject()(environment: Environment, DatabaseController: DatabaseController) extends Controller {


  def validateJson[A : Reads] = BodyParsers.parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

  implicit val itemWrites = new Writes[Item] {
    def writes(item: Item) = Json.obj(
      "id" -> item.itemID,
      "name" -> item.name,
      "quantity" -> item.quantity,
      "price" -> item.price,
      "description" -> item.description,
      "categoryID" -> item.categoryID)
  }

  def showItem(id: Int) = Action.async { request =>
    if(id >= 0)
      DatabaseController.retrieveItem(id).map {
        _ match {
          case itemNotFound => Ok(Json.obj("status" -> "item not found"))
          case itemFound(item) => Ok(Json.obj(
            "status" -> "successful", 
            "item" -> Json.toJson(item)))
        }
      }
    else
      Future(BadRequest("invalid id"))
  }
  
  def showItems(page: Int) = Action.async { request =>
    
    if(page < 0)
      Future(BadRequest("invalid page number"))

    DatabaseController.retrieveItems(page).map { items =>
      Ok(Json.obj(
        "status" -> "successful",
        "items" -> Json.toJson(items)
        ))
    }
  }

}