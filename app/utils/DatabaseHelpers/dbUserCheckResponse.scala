package utils.DatabaseHelpers

import models.User 

trait dbUserCheckResponse 

case class userFoundPasswordMatches(user: User) extends dbUserCheckResponse
case object userNotFound extends dbUserCheckResponse
case object userFoundPasswordNoMatch extends dbUserCheckResponse 
