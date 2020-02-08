# rest_rate
To run the app:
1. npm install
2. npm run dev-db
3. npm run dev-server
4. npm run dev

To test the rest api with db:

curl -d '{"name":"alex", "password":"aaaa"}' -H "Content-Type: application/json" -X POST http://localhost:80000/users
