curl -v -H "Content-Type: application/json" \
-X POST -d '{
  "username" : "xd",
  "email": "kulce@gmail.com",
  "name": "orkun",
  "surname": "kulce",
  "password": "xd"
}' \
http://localhost:9000/register


exit 0