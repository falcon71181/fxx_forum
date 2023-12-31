# FXX FORUM
live - https://fxx-forum.vercel.app/

build using - NEXT_JS , Typescript, Tailswind CSS, MongoDB Atlas Database, Bcrypt, JWT

## ⚡What is FXX FORUM?

FXX Forum is an interactive online platform that facilitates engaging discussions and community interaction. With user registration and login features, members can post topics, share opinions, and engage in conversations, fostering a dynamic space for diverse discussions.

Check it out at <a href="https://fxx-forum.vercel.app"><kbd>fxx-forum.vercel.app</kbd></a>.

## 🧬 Running locally for development
1. Clone the repository:

```bash
git clone https://github.com/falcon71181/fxx_forum
cd fxx_forum
```

2. Create a .env.local file in the server directory and set the PORT variable:
```env
MONGODB_URI=mongodb+srv://xxxxxxxxxxxxxxx
JWT_SECRET=your_jwt_secret
NEXT_PUBLIC_HOST=http://localhost:3000/
ALLOWED_METHODS="GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS"
ALLOWED_ORIGIN="*"
ALLOWED_HEADERS="Content-Type, Authorization"
EXPOSED_HEADERS=""
MAX_AGE="86400"
CREDENTIALS="true"
DOMAIN_URL="http://localhost:3000"
```

3. Install the Node Modules :
```bash
npm install
```

4. Start the server and client :
```bash
npm run dev
```
