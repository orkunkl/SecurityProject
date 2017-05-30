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

@Singleton
class PaymentController @Inject()(environment: Environment, DatabaseController: DatabaseController) extends Controller {

  def pay() = TODO

}
