# rest_rate
To run the app:
1. npm install
2. npm run db
3. npm run server
4. npm run client

To test the rest api with db:

curl -d '{"name":"alex", "password":"aaaa"}' -H "Content-Type: application/json" -X POST http://localhost:80000/users
