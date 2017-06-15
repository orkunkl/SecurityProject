curl -v -H "Content-Type: application/json" \
-X POST -d '{
  "username" : "xd",
  "email": "kulce@gmail.com",
  "name": "orkun",
  "surname": "kulce",
  "password": "xd"
}' \
https://localhost:9443/register


exit 0