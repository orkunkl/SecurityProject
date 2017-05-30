package services

/**
  * Created by orkun on 27/04/17.
  */

import java.sql.Timestamp

import models._
import play.api.db.slick.HasDatabaseConfigProvider
import slick.driver.{JdbcProfile}
import slick.lifted.{TableQuery, Tag}
import slick.driver.PostgresDriver.api._

/**
  */
trait SlickMapping { self: HasDatabaseConfigProvider[JdbcProfile] =>

  val UserTable = TableQuery[UserTable]

  class UserTable(tag: Tag) extends Table[User](tag, "users") {

    def userID = column[Int]("user_id", O.PrimaryKey, O.AutoInc)
    def email = column[String]("email")
    def username = column[String]("username")
    def name = column[String]("name")
    def surname = column[String]("surname")
    def password = column[String]("password")
    def isAdmin = column[Boolean]("is_admin")

    override def * = (userID.?, username, email, name, surname, password, isAdmin) <> (User.tupled, User.unapply)
  }

  val AddressTable = TableQuery[AddressTable]

  class AddressTable(tag: Tag) extends Table[Address](tag, "addresses") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def userID = column[Int]("user_id")
    def street = column[String]("street")
    def number = column[Int]("number")
    def city = column[String]("city")
    def zipCode = column[Int]("zip_code")
    def state = column[String]("state")
    def country = column[String]("country")

    def userID_FK = foreignKey("userID_FK", userID, UserTable)(_.userID, onUpdate=ForeignKeyAction.Restrict, onDelete=ForeignKeyAction.Cascade)

    override def * = (id.?, userID, street, number, city, zipCode, state, country) <> (Address.tupled, Address.unapply)
  }

  val SelectionTable = TableQuery[UserTable]

  class SelectionTable(tag: Tag) extends Table[Selection](tag, "selections") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def userID = column[Int]("user_id")
    def expirationDate = column[Timestamp]("expiration_date")
    def status = column[Short]("status")

    def userID_FK = foreignKey("userID_FK", userID, UserTable)(_.userID, onUpdate=ForeignKeyAction.Restrict, onDelete=ForeignKeyAction.Cascade)

    override def * = (id.?, userID, expirationDate, status) <> (Selection.tupled, Selection.unapply)
  }

  val ItemTable = TableQuery[ItemTable]

  class ItemTable(tag: Tag) extends Table[Item](tag, "items") {

    def id = column[Int]("user_id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")
    def quantity = column[Int]("quantity")
    def price = column[Float]("price")
    def description = column[String]("description")
    def categoryID = column[Int]("category_id")
    def picDir = column[String]("picture_directory")
    override def * = (id.?, name, quantity, price, description, categoryID, picDir) <> (Item.tupled, Item.unapply)
  }

  val CategoryTable = TableQuery[CategoryTable]

  class CategoryTable(tag: Tag) extends Table[Category](tag, "categories") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def name = column[String]("name")

    override def * = (id.?, name) <> (Category.tupled, Category.unapply)
  }
  val PurchaseStatusTable = TableQuery[PurchaseStatusTable]

  class PurchaseStatusTable(tag: Tag) extends Table[PurchaseStatus](tag, "purchaseStatus") {

    def id = column[Int]("id", O.PrimaryKey, O.AutoInc)
    def expirationDate = column[Timestamp]("expiration_date")
    def status = column[Short]("status")

    override def * = (id.?, expirationDate, status) <> (PurchaseStatus.tupled, PurchaseStatus.unapply)
  }
    val UserAddressRelationTable = TableQuery[UserAddressRelationTable]

  class UserAddressRelationTable(tag: Tag) extends Table[UserAddressRelation](tag, "userAddressRelation") {

    def userID = column[Int]("user_id")
    def addressID = column[Int]("address_id")

    def userID_FK = foreignKey("userID_FK", userID, UserTable)(_.userID, onUpdate=ForeignKeyAction.Restrict, onDelete=ForeignKeyAction.Cascade)
    def addressID_FK = foreignKey("addressID_FK", addressID, AddressTable)(_.id, onUpdate=ForeignKeyAction.Restrict, onDelete=ForeignKeyAction.Cascade)


    override def * = (userID, addressID) <> (UserAddressRelation.tupled, UserAddressRelation.unapply)
  }
}