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
import play.api.Logger
import controllers.Secured
import models.Cart
import models.Selection

@Singleton
class ItemController @Inject()(environment: Environment, DatabaseController: DatabaseController) extends Controller with Secured {


  def validateJson[A : Reads] = BodyParsers.parse.json.validate(
    _.validate[A].asEither.left.map(e => BadRequest(JsError.toJson(e)))
  )

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

  implicit val itemWrites = new Writes[Item] {
    def writes(item: Item) = Json.obj(
      "id" -> item.itemID.get,
      "name" -> item.name,
      "quantity" -> item.quantity,
      "price" -> item.price,
      "description" -> item.description,
      "imagesrc" -> item.imagesrc)
  }

  def showItems(page: Int) = Action.async { request =>
    
    if(page < 0)
      Future(BadRequest("invalid page number"))
    DatabaseController.retrieveItems(page-1).map { items =>
      Ok(Json.obj(
        "status" -> "successful",
        "items" -> items))
    }
  }
  
  implicit val selectionWrites = new Writes[Selection] { 
    def writes(selection: Selection) = Json.obj(
      "id" -> selection.id,
      "userID" -> selection.userID,
      "itemID" -> selection.itemID
    ) 
  }
  implicit val cartWrites = new Writes[Cart] { def writes(cart: Cart) = Json.obj("selections" -> cart.selections) } 

  def retrieveCart() = Authenticated.async {  implicit request =>
    DatabaseController.retrieveCart(request.user.userID).map {  selections =>
      val cart = Cart(Seq.empty[Selection])
      selections.foreach(selection => cart.selections :+ selection)
      Ok(Json.obj("status" -> "successful", "cart" -> cart))
    }
    Future(Ok(""))
  }

  case class addItemToCartForm(itemID: Int, quantity: Int)

  implicit val addItemToCartFormReads: Reads[addItemToCartForm] = (
    (JsPath \ "itemID").read[Int] and
    (JsPath \ "quantity").read[Int]
  )(addItemToCartForm)

  def addItemToCart() = Authenticated.async(validateJson[addItemToCartForm]) { implicit request =>
    val body = request.body
    DatabaseController.addSelection(Selection(null, body.itemID, body.quantity, request.user.userID)).map{selectionID =>
      Ok(Json.obj("status" -> "successful", "selectionID" -> selectionID))
    }
  }
  /*case class removeItemFromCartForm(selectionID: Int)

  implicit val removeItemFromCartFormReads: Reads[removeItemFromCartForm] = (
    (JsPath \ "selectionID").read[Int]
  )(removeItemFromCartForm)

  def removeItemFromCart() = Authenticated.async(validateJson[addItemToCartForm]) {
    DatabaseController.removeSelection(request.body.seletionID).map{_ =>
      Ok(Json.obj("status" -> "successful"))
    }
  }
*/
}
