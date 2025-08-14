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
- `Authorization
