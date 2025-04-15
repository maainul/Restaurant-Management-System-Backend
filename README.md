## **Authentication** and **Authorization** using **Access tokens** and **Refresh tokens**. These tokens are essential for securing your application and managing user sessions.

---

### **What Are Access Tokens and Refresh Tokens?**

#### **1. Access Token**
- **Purpose**: Used to authenticate and authorize API requests.
- **Lifetime**: Short-lived (e.g., 15 minutes to 1 hour).
- **Storage**: Typically stored in memory (e.g., in the client's state or a variable).
- **Usage**: Sent with every request to access protected resources (e.g., user profile, protected routes).
- **Security**: If compromised, the damage is limited because the token expires quickly.

#### **2. Refresh Token**
- **Purpose**: Used to obtain a new access token when the current one expires.
- **Lifetime**: Long-lived (e.g., 7 days to several months).
- **Storage**: Securely stored (e.g., in an HTTP-only cookie or a secure storage mechanism).
- **Usage**: Sent to the server to request a new access token without requiring the user to log in again.
- **Security**: Must be stored securely because it has a longer lifetime and can be used to generate new access tokens.

---

### **Why Use Both Tokens?**

1. **Security**:
   - Access tokens are short-lived, reducing the risk of misuse if they are compromised.
   - Refresh tokens are long-lived but stored securely, reducing the need for frequent logins.

2. **User Experience**:
   - Users don't need to log in repeatedly because the refresh token can generate new access tokens.

3. **Scalability**:
   - Access tokens can be validated quickly (e.g., using a signature), reducing the load on your database.

---

### **How It Works**

1. **Login**:
   - The user provides their credentials (e.g., email and password).
   - The server validates the credentials and generates:
     - An **access token** (short-lived).
     - A **refresh token** (long-lived).
   - The server sends both tokens to the client.

2. **Accessing Protected Resources**:
   - The client includes the **access token** in the `Authorization` header of every request.
   - The server validates the access token and grants access to the requested resource.

3. **Access Token Expires**:
   - When the access token expires, the client sends the **refresh token** to the server to request a new access token.
   - The server validates the refresh token and issues a new access token.

4. **Logout**:
   - The client deletes the access token and refresh token.
   - Optionally, the server can invalidate the refresh token (e.g., by maintaining a blacklist).

---

### **Implementation Steps**

#### **1. Generate Tokens**
Use a library like `jsonwebtoken` to generate access and refresh tokens.

##### Install `jsonwebtoken`
```bash
npm install jsonwebtoken
```

##### Generate Tokens
```typescript
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = "your-access-token-secret";
const REFRESH_TOKEN_SECRET = "your-refresh-token-secret";

const generateAccessToken = (userId: string): string => {
    return jwt.sign({ userId }, ACCESS_TOKEN_SECRET, { expiresIn: "15m" });
};

const generateRefreshToken = (userId: string): string => {
    return jwt.sign({ userId }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });
};
```

---

#### **2. Login Endpoint**
Return both tokens when the user logs in.

##### Example Login Controller
```typescript
import { Request, Response } from "express";
import { generateAccessToken, generateRefreshToken } from "../utils/jwt";
import userService from "../services/UserService";

class AuthController {
    login = async (req: Request, res: Response) => {
        const { email, password } = req.body;

        // Authenticate user
        const user = await userService.login(email, password);
        if (!user) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate tokens
        const accessToken = generateAccessToken(user.id);
        const refreshToken = generateRefreshToken(user.id);

        // Send tokens to the client
        res.json({ accessToken, refreshToken });
    };
}

export default AuthController;
```

---

#### **3. Protect Routes**
Use middleware to validate the access token for protected routes.

##### Example Middleware
```typescript
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET = "your-access-token-secret";

export const authenticateToken = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Bearer <token>

    if (!token) {
        return res.status(401).json({ message: "Access token is required" });
    }

    jwt.verify(token, ACCESS_TOKEN_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: "Invalid or expired token" });
        }
        req.user = user; // Attach user to the request object
        next();
    });
};
```

##### Protect a Route
```typescript
import { authenticateToken } from "../middlewares/authenticateToken";

app.get("/profile", authenticateToken, (req, res) => {
    res.json({ message: "Protected route", user: req.user });
});
```

---

#### **4. Refresh Token Endpoint**
Allow clients to request a new access token using the refresh token.

##### Example Refresh Token Controller
```typescript
import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import { generateAccessToken } from "../utils/jwt";

const REFRESH_TOKEN_SECRET = "your-refresh-token-secret";

class AuthController {
    refreshToken = async (req: Request, res: Response) => {
        const { refreshToken } = req.body;

        if (!refreshToken) {
            return res.status(401).json({ message: "Refresh token is required" });
        }

        jwt.verify(refreshToken, REFRESH_TOKEN_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({ message: "Invalid or expired refresh token" });
            }

            // Generate a new access token
            const accessToken = generateAccessToken(user.userId);
            res.json({ accessToken });
        });
    };
}

export default AuthController;
```

---

#### **5. Logout**
Invalidate the refresh token (optional) and delete tokens on the client side.

##### Example Logout Controller
```typescript
class AuthController {
    logout = async (req: Request, res: Response) => {
        // Optionally, invalidate the refresh token (e.g., by maintaining a blacklist)
        res.json({ message: "Logged out successfully" });
    };
}
```

---

### **Security Best Practices**

1. **Use HTTPS**:
   - Always use HTTPS to encrypt data in transit.

2. **Secure Storage**:
   - Store refresh tokens in **HTTP-only cookies** to prevent JavaScript access.
   - Store access tokens in memory (e.g., in a variable or state).

3. **Token Expiry**:
   - Use short expiry times for access tokens (e.g., 15 minutes).
   - Use longer expiry times for refresh tokens (e.g., 7 days).

4. **Token Rotation**:
   - Rotate refresh tokens on each use to enhance security.

5. **Blacklist Tokens**:
   - Maintain a blacklist of invalidated tokens (e.g., after logout).

---

### **Final Notes**

- **Access tokens** are used for short-term authentication and authorization.
- **Refresh tokens** are used for long-term session management.
