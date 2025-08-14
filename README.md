# Gestion des Tâches d'une Équipe (MVC)

Node.js/Express/MongoDB + JWT + Joi + Pagination/Filtres. Prêt pour MongoDB Atlas + Render/Heroku.

## 🚀 Démarrage local
```bash
npm install
npm run dev

```

**Routes de base** (prefix: `/api`)
- `POST /auth/register` { name, email, password, role? }
- `POST /auth/login` { email, password }
- `GET  /auth/me` (Bearer token)
- `GET  /members?search=&page=1&limit=10`
- `POST /members` { name, email, role }
- `GET  /members/:id`
- `PUT  /members/:id`
- `DELETE /members/:id`
- `GET  /tasks?status=&priority=&assignee=&search=&page=1&limit=10&sort=-createdAt`
- `POST /tasks` { title, description?, priority?, status?, dueDate?, assignee? }
- `GET  /tasks/:id`
- `PUT  /tasks/:id`
- `DELETE /tasks/:id`

## 🔐 Auth
- JWT signé avec `JWT_SECRET`, expire selon `JWT_EXPIRES_IN` (7j par défaut).
- `Authorization: Bearer <token>` pour toutes les routes membres/tâches.

## 📦 Déploiement Render
1. Push sur GitHub.
2. Render → New Web Service → Connecte ton repo.
3. Build Command: `npm install` – Start Command: `npm start`.
4. **Environment**: ajoute `MONGODB_URI`, `JWT_SECRET`, `JWT_EXPIRES_IN`.
5. Activer le *auto-deploy* si tu veux.

## ☁️ Déploiement Heroku
```bash
heroku create your-app
heroku config:set MONGODB_URI=... JWT_SECRET=... JWT_EXPIRES_IN=7d
git push heroku main
```

## 🧪 cURL rapides
```bash
# Register
curl -s -X POST http://localhost:5000/api/auth/register -H "Content-Type: application/json" -d '{"name":"Admin","email":"admin@mail.com","password":"secret","role":"admin"}'

# Login
curl -s -X POST http://localhost:5000/api/auth/login -H "Content-Type: application/json" -d '{"email":"admin@mail.com","password":"secret"}'

# Créer un membre (remplacer TOKEN ci-dessous)
curl -s -X POST http://localhost:5000/api/members -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d '{"name":"Nene","email":"nene@mail.com","role":"dev"}'

# Créer une tâche
curl -s -X POST http://localhost:5000/api/tasks -H "Authorization: Bearer TOKEN" -H "Content-Type: application/json" -d '{"title":"Préparer la soutenance","priority":"elevée","status":"en_cours"}'
```

## 🧱 Structure
```
GestionTaches
├─ server.js
├─ Procfile
├─ .env.example
└─ src
   ├─ app.js
   ├─ config/db.js
   ├─ models/
   ├─ controllers/
   ├─ middleware/
   ├─ validators/
   └─ routes/
```

## ✅ Notes
- Index texte pour `search` sur Task et Member.
- `populate('assignee')` sur les tâches.
- Middleware centralisé d’erreurs + 404.
- Code en ES Modules (Node 18+).
