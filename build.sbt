import scala.language.postfixOps
import PlayKeys._

name := """Security-Project"""

version := "0.1-SNAPSHOT"

lazy val root = (project in file(".")).enablePlugins(PlayScala)

scalaVersion := "2.11.8"
javaOptions in run += "-Dhttp.port=<port>"
libraryDependencies ++= Seq(
  cache,
  ws,
  "org.scalatestplus.play" %% "scalatestplus-play" % "1.5.1" % Test,
  "com.typesafe.play" %% "play-slick" % "2.1.0",
  "com.typesafe.play" %% "play-slick-evolutions" % "2.1.0",
  "org.postgresql" % "postgresql" % "9.4.1212",
  "com.github.t3hnar" %% "scala-bcrypt" % "3.0",
  "com.pauldijou" %% "jwt-play" % "0.12.1",
  filters
)

resolvers += "scalaz-bintray" at "http://dl.bintray.com/scalaz/releases"
resolvers += Resolver.sonatypeRepo("releases")

fork in run := true
/*
 * UI Build Scripts
 */

val Success = 0 // 0 exit code
val Error = 1 // 1 exit code

PlayKeys.playRunHooks <+= baseDirectory.map(UIBuild.apply)
/*
 * HTTPS configuration 
 */
PlayKeys.devSettings := Seq("play.server.http.port" -> "disabled", "play.server.https.port" -> "9443")

val isWindows = System.getProperty("os.name").toLowerCase().contains("win")

def runScript(script: String)(implicit dir: File): Int = {
if(isWindows){ Process("cmd /c " + script, dir) } else { Process(script, dir) } }!

def uiWasInstalled(implicit dir: File): Boolean = (dir / "node_modules").exists()

def runNpmInstall(implicit dir: File): Int =
  if (uiWasInstalled) Success else runScript("npm install")

def ifUiInstalled(task: => Int)(implicit dir: File): Int =
  if (runNpmInstall == Success) task
  else Error

def runProdBuild(implicit dir: File): Int = ifUiInstalled(runScript("npm run build-prod"))

def runDevBuild(implicit dir: File): Int = ifUiInstalled(runScript("npm run build"))

def runUiTests(implicit dir: File): Int = ifUiInstalled(runScript("npm run test-no-watch"))

lazy val `ui-dev-build` = TaskKey[Unit]("Run UI build when developing the application.")

`ui-dev-build` := {
  implicit val UIroot = baseDirectory.value / "ui"
  if (runDevBuild != Success) throw new Exception("Oops! UI Build crashed.")
}

lazy val `ui-prod-build` = TaskKey[Unit]("Run UI build when packaging the application.")

`ui-prod-build` := {
  implicit val UIroot = baseDirectory.value / "ui"
  if (runProdBuild != Success) throw new Exception("Oops! UI Build crashed.")
}

lazy val `ui-test` = TaskKey[Unit]("Run UI tests when testing application.")

`ui-test` := {
  implicit val UIroot = baseDirectory.value / "ui"
  if (runUiTests != 0) throw new Exception("UI tests failed!")
}

`ui-test` <<= `ui-test` dependsOn `ui-dev-build`

dist <<= dist dependsOn `ui-prod-build`

stage <<= stage dependsOn `ui-prod-build`

test <<= (test in Test) dependsOn `ui-test`
