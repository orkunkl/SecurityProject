package models

import java.sql.Timestamp

/**
  * Created by orkun on 27/04/17.
  */
case class PurchaseStatus(id: Option[Int], expirationDate: Timestamp, status: Short)
