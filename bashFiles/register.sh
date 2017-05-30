curl -v -H "Content-Type: application/json" \
-X POST -d '{
  "username" : "annen",
  "email": "kulce@gmail.com",
  "name": "orkun",
  "surname": "kulce",
  "password": "123"
}' \
http://localhost:9000/register


exit 0