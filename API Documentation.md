## API Documentation

### **Route** `/url`

#### Generate a new short URL

**POST** `http://localhost:3000/url` `[Auth Required]`

- **Headers**: `Authorization: Bearer <authToken>`
- **Body (JSON)**:
  ```json
  {
    "url": "https://example.com"
  }
  ```

#### Redirect to original URL using `shortId`

**GET** `http://localhost:3000/url/:shortId`

#### Get analytics for a short URL

**GET** `http://localhost:3000/url/analytics/:shortId`

---

### **Route** `/`

#### User dashboard (non-admins)

**GET** `http://localhost:3000/` `[Auth Required]`

- **Headers**: `Authorization: Bearer <authToken>`

#### Delete a specific short URL entry

**DELETE** `http://localhost:3000/delete/:shortURL_ID` `[Auth Required]`

- **Headers**: `Authorization: Bearer <authToken>`
- **Description**: Deletes a URL entry by its **ObjectID** from the database.

#### Admin dashboard

**GET** `http://localhost:3000/admin` `[Admin Auth Required]`

- **Headers**: `Authorization: Bearer <authToken>`

---

### **Route** `/user`

#### Create a new user account

**POST** `http://localhost:3000/user/`

- **Body (JSON)**:
  ```json
  {
    "name": "John Doe",
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```

#### User login

**POST** `http://localhost:3000/user/login`

- **Body (JSON)**:
  ```json
  {
    "email": "johndoe@example.com",
    "password": "securepassword123"
  }
  ```
