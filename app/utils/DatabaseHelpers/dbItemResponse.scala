package utils.DatabaseHelpers

import models.Item

sealed trait dbItemCheckResponse 

case class itemFound(item: Item) extends dbItemCheckResponse
case object itemNotFound extends dbItemCheckResponse
