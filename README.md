# Features implemented
1. Login / Register User
   * Auto complete for country
   * Upload avatar
   * Check login name availability
   * Password hashing / Token generation
2. Edit profile
   * Update name
   * Update country
3. User profile:
   * Show user details
   * Show user reviews
4. Reviews:
   * Add, edit, remove reviews.
   * Upload photos
   * Rate by categories
5. Search:
   * Quick Search 
      * Restaurant names auto complete
   * Advanced Search
      * Search by name
      * Search by avarage rating
      


# rest_rate
To run the app:
1. npm install
2. npm run db
3. npm run server
4. npm run client

To test the rest api with db:

curl -d '{"name":"alex", "password":"aaaa"}' -H "Content-Type: application/json" -X POST http://localhost:80000/users



