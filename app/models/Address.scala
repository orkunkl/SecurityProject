package models

/**
  * Created by orkun on 27/04/17.
  */
case class Address(id: Option[Int], userID: Int, street: String, number: Int, city: String, zipCode: Int, state: String, contry: String)
