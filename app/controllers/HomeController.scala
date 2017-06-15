package controllers

import scala.concurrent.Future

import javax.inject._
import play.api._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import play.api.libs.json.Reads._
import play.api.mvc._
import services.{DatabaseController, DatabaseTrait}

@Singleton
class HomeController @Inject()(environment: Environment, DatabaseController: DatabaseController) extends Controller {

  def index = Action.async {
    Future{Ok(views.html.index("Your new Play & Angular 2 application is ready."))}
  }
  
}
