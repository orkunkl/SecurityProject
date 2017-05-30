package services

/**
  * Created by orkun on 27/04/17.
  */
import javax.inject._

import akka.actor.ActorSystem
import play.api.db.slick.{DatabaseConfigProvider, HasDatabaseConfigProvider}
import slick.driver.JdbcProfile
import play.api.libs.concurrent.Execution.Implicits.defaultContext
import slick.driver.PostgresDriver.api._

import scala.concurrent.Future

import models._
import utils.DatabaseHelpers._
import play.api.Logger



/**
  * Created by orkun on 18/02/17.
  */
@Singleton
class DatabaseController @Inject()(protected val dbConfigProvider: DatabaseConfigProvider, val system: ActorSystem) extends  HasDatabaseConfigProvider[JdbcProfile] 
	with SlickMapping with DatabaseTrait {
 
  /*
  *
  *   User Related
  *
  */
  def addNewUser(user: User): Future[User] = db.run(UserTable.returning(UserTable.map(user => user)) += user)

  def userLookup(username: String, password: String): Future[dbUserCheckResponse] = db.run(UserTable.filter(_.username === username).result.headOption).map{ response =>
    response match {
  		case Some(user: User) => {
  			if(user.password == password){
  				userFoundPasswordMatches(user)
        }
  			else
  				userFoundPasswordNoMatch
  		}
  		case None => userNotFound
  	}
  }
  
  /*
   * 	
   *  Item Related 
   *
   */

   def retrieveItem(id: Int): Future[dbItemCheckResponse] = {
      db.run(ItemTable.filter(_.id === id).result.headOption).map {
        _ match {
          case None => itemNotFound
          case Some(item) => itemFound(item)
        }
      }
   }
   def retrieveItems(page: Int): Future[Seq[Item]] = db.run(ItemTable.take(page.floor.toInt).drop(10).result)

   def insertItem(item: Item) : Future[Item] = db.run(ItemTable.returning(ItemTable.map(item => item)) += item)

   def removeItem(itemID: Int) : Future[Unit] = db.run(ItemTable.filter(_.id === itemID).delete).map { _ => ()}

   def updatePicture(itemID: Int, pictureDir: String) : Future[Unit] = db.run(
     (for { item <- ItemTable if item.id === itemID } yield item.picDir).update(pictureDir)).map{ _ => ()}
  /*
   *  
   *  Address Related 
   *
   */

   def insertAddress(address: Address, user: User) : Future[Unit] = {
     for {
      id <- db.run(AddressTable.returning(AddressTable.map(element => element.id)) += address)
     } yield {
      db.run(UserAddressRelationTable += UserAddressRelation(user.userID.get, id)).map{ _ => ()}
     }
   }
 }