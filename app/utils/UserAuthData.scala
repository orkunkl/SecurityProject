package utils
import play.api.libs.json._
import play.api.libs.functional.syntax._
import play.api.libs.json.Reads._
case class UserAuthData(userID: Int, username: String, password: String, isAdmin: Boolean)

object UserAuthData {
	implicit val UserAuthDataReads: Reads[UserAuthData] = (
  		(JsPath \ "userID").read[Int] and
  		(JsPath \ "username").read[String] and
  		(JsPath \ "password").read[String] and
  		(JsPath \ "isAdmin").read[Boolean]
	)(UserAuthData.apply _)
	implicit val UserAuthDataWrites = new Writes[UserAuthData] {
    	def writes(user: UserAuthData) = Json.obj(
      		"userID" -> user.userID,
      		"username" -> user.username,
      		"password" -> user.password,
      		"isAdmin" -> user.isAdmin
    	)
  	}
}