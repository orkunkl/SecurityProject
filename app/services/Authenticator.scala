package services
import scala.concurrent.Future

import javax.inject._
import models.User
import play.api.mvc._
import services.DatabaseController
import utils.DatabaseHelpers._
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import com.github.t3hnar.bcrypt._
@Singleton
class Authenticator @Inject()(DatabaseController: DatabaseController) {
	def auth(session: Session): Future[Option[User]] = {
		val p = for {
			username <- session.get("username")
			password <- session.get("password")
		} yield {
			DatabaseController.userLookup(username, password.bcrypt).map {
			  _ match {
			  	case userFoundPasswordMatches(user) => Some(user)
			  	case _ => None
			  }
			}
		}
		p.get
	}
}