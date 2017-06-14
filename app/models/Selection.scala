package models

import java.sql.Timestamp

/**
  * Created by orkun on 27/04/17.
  */
case class Selection(id: Option[Int], itemID: Int, quantity: Int, userID: Int)
