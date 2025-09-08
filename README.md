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
- `GET  /all-users?search=&page=1&limit=10` (tous les utilisateurs)
- `GET  /users?search=&page=1&limit=10`
- `GET  /members?search=&page=1&limit=10`
- `POST /members` { name, email, password, role }
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
- `Authorization: Bearer <token>` requis pour les routes protégées.
- **Connexion possible avec :** Comptes User (admin/member) ET comptes Member créés par l'admin.

## 📋 Modèles de données

### User
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashé)",
  "role": "admin | member",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Member
```json
{
  "_id": "ObjectId",
  "name": "string",
  "email": "string (unique)",
  "password": "string (hashé)",
  "role": "string",
  "createdBy": "ObjectId (User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

### Task
```json
{
  "_id": "ObjectId",
  "title": "string",
  "description": "string?",
  "priority": "faible | moyenne | elevée",
  "status": "A_faire | en_cours | terminée",
  "dueDate": "Date?",
  "assignee": "ObjectId (Member)?",
  "createdBy": "ObjectId (User)",
  "createdAt": "Date",
  "updatedAt": "Date"
}
```

## 🔗 API Endpoints détaillés

### Authentication

#### POST `/api/auth/register`
**Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "member" // optionnel, défaut: "member"
}
```
**Response (201):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "ObjectId",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member"
    },
    "token": "jwt_token_here"
  }
}
```

#### POST `/api/auth/login`
**Body:**
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```
**Note:** Fonctionne avec les comptes User ET Member
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "ObjectId",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member"
    },
    "token": "jwt_token_here"
  }
}
```

#### GET `/api/auth/me`
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "user": {
      "id": "ObjectId",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "member"
    }
  }
}
```

### Members

#### GET `/api/members`
**Headers:** `Authorization: Bearer <token>`
**Query params:** `?search=john&page=1&limit=10`
**Permissions:** Tous les utilisateurs authentifiés peuvent voir les membres
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "_id": "ObjectId",
        "name": "John Doe",
        "email": "john@example.com",
        "role": "member",
        "createdBy": "ObjectId",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### POST `/api/members`
**Headers:** `Authorization: Bearer <token>`
**Permissions:** Seuls les administrateurs peuvent créer des membres
**Body:**
```json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "password": "password123",
  "role": "manager"
}
```
**Response (201):**
```json
{
  "status": "success",
  "data": {
    "member": {
      "_id": "ObjectId",
      "name": "Jane Smith",
      "email": "jane@example.com",
      "role": "manager",
      "createdBy": "ObjectId",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### GET `/api/members/:id`
**Headers:** `Authorization: Bearer <token>`
**Permissions:** Tous les utilisateurs authentifiés peuvent voir un membre
**Response (200):** Même structure que POST

#### PUT `/api/members/:id`
**Headers:** `Authorization: Bearer <token>`
**Permissions:** Seuls les administrateurs peuvent modifier des membres
**Body:** Champs à modifier
**Response (200):** Membre mis à jour

#### DELETE `/api/members/:id`
**Headers:** `Authorization: Bearer <token>`
**Permissions:** Seuls les administrateurs peuvent supprimer des membres
**Response (200):**
```json
{
  "status": "success",
  "message": "Membre supprimé !"
}
```

### Tasks

#### GET `/api/tasks`
**Headers:** `Authorization: Bearer <token>`
**Query params:** `?status=A_faire&priority=elevée&assignee=ObjectId&search=projet&page=1&limit=10&sort=-createdAt`
**Response (200):**
```json
{
  "status": "success",
  "data": {
    "items": [
      {
        "_id": "ObjectId",
        "title": "Développer l'API",
        "description": "Créer les endpoints REST",
        "priority": "elevée",
        "status": "en_cours",
        "dueDate": "2024-12-31T23:59:59.000Z",
        "assignee": {
          "_id": "ObjectId",
          "name": "John Doe",
          "email": "john@example.com"
        },
        "createdBy": "ObjectId",
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 10,
      "total": 1,
      "pages": 1
    }
  }
}
```

#### POST `/api/tasks`
**Headers:** `Authorization: Bearer <token>`
**Body:**
```json
{
  "title": "Nouvelle tâche",
  "description": "Description optionnelle",
  "priority": "moyenne",
  "status": "A_faire",
  "dueDate": "2024-12-31T23:59:59.000Z",
  "assignee": "ObjectId"
}
```
**Response (201):**
```json
{
  "status": "success",
  "data": {
    "task": {
      "_id": "ObjectId",
      "title": "Nouvelle tâche",
      "description": "Description optionnelle",
      "priority": "moyenne",
      "status": "A_faire",
      "dueDate": "2024-12-31T23:59:59.000Z",
      "assignee": "ObjectId",
      "createdBy": "ObjectId",
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

#### GET `/api/tasks/:id`
**Headers:** `Authorization: Bearer <token>`
**Response (200):** Tâche avec assignee populé

#### PUT `/api/tasks/:id`
**Headers:** `Authorization: Bearer <token>`
**Body:** Champs à modifier
**Response (200):** Tâche mise à jour

#### DELETE `/api/tasks/:id`
**Headers:** `Authorization: Bearer <token>`
**Response (200):**
```json
{
  "status": "success",
  "message": "Tache supprimée"
}
```

## ⚠️ Gestion d'erreurs

### Erreurs communes
```json
// 400 - Validation error
{
  "status": "echec",
  "message": "Données invalides",
  "errors": ["Le nom est requis", "Email invalide"]
}

// 401 - Non authentifié
{
  "status": "echec",
  "message": "Token manquant ou invalide"
}

// 404 - Ressource non trouvée
{
  "status": "echec",
  "message": "Tache non trouvée"
}

// 403 - Accès refusé
{
  "status": "echec",
  "message": "Accès refusé. Seuls les administrateurs peuvent créer des membres."
}

// 409 - Conflit
{
  "status": "echec",
  "message": "Email dejà utilisé"
}

// 500 - Erreur serveur
{
  "status": "echec",
  "message": "Erreur interne du serveur"
}
```

## 🚀 Configuration

### Variables d'environnement (.env)
```env
PORT=5000
MONGODB_URL=mongodb://localhost:27017/gestion-taches
JWT_SECRET=votre_secret_jwt_tres_securise
JWT_EXPIRES_IN=7d
NODE_ENV=development
```

### Installation et démarrage
```bash
# Installation des dépendances
npm install

# Démarrage en développement
npm run dev

# Démarrage en production
npm start
```

## 📦 Structure du projet
```
src/
├── config/
│   └── db.js              # Configuration MongoDB
├── controllers/
│   ├── authController.js  # Logique d'authentification
│   ├── memberController.js # Logique des membres
│   └── taskController.js  # Logique des tâches
├── middleware/
│   ├── auth.js           # Middleware d'authentification
│   ├── errorHandler.js   # Gestion globale des erreurs
│   └── validate.js       # Middleware de validation
├── models/
│   ├── User.js           # Modèle utilisateur
│   ├── Member.js         # Modèle membre
│   └── Task.js           # Modèle tâche
├── routes/
│   ├── authRoutes.js     # Routes d'authentification
│   ├── memberRoutes.js   # Routes des membres
│   ├── taskRoutes.js     # Routes des tâches
│   └── index.js          # Router principal
├── validators/
│   ├── auth.js           # Validation auth
│   ├── member.js         # Validation membres
│   └── task.js           # Validation tâches
└── app.js                # Configuration Express
```

## 🔧 Fonctionnalités

- ✅ Authentification JWT
- ✅ CRUD complet pour utilisateurs, membres et tâches
- ✅ Pagination et filtres
- ✅ Validation des données avec Joi
- ✅ Gestion d'erreurs centralisée
- ✅ Sécurité avec Helmet et CORS
- ✅ Compression des réponses
- ✅ Logging avec Morgan
- ✅ Hashage des mots de passe avec bcrypt
- ✅ Relations entre modèles (populate)

## 🌐 Déploiement

### Render/Heroku
1. Créer un compte sur Render ou Heroku
2. Connecter votre repository GitHub
3. Configurer les variables d'environnement
4. Déployer automatiquement

### MongoDB Atlas
1. Créer un cluster sur MongoDB Atlas
2. Obtenir l'URL de connexion
3. Mettre à jour `MONGODB_URL` dans les variables d'environnement

## 📱 Utilisation Frontend

### Exemple avec Axios (React/Vue/Angular)
```javascript
// Configuration de base
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token
api.interceptors.request.use(config => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Exemples d'utilisation

// Connexion
const login = async (email, password) => {
  const response = await api.post('/auth/login', { email, password });
  localStorage.setItem('token', response.data.data.token);
  return response.data;
};

// Récupérer les tâches
const getTasks = async (filters = {}) => {
  const params = new URLSearchParams(filters);
  const response = await api.get(`/tasks?${params}`);
  return response.data;
};

// Créer une tâche
const createTask = async (taskData) => {
  const response = await api.post('/tasks', taskData);
  return response.data;
};

// Mettre à jour une tâche
const updateTask = async (id, updates) => {
  const response = await api.put(`/tasks/${id}`, updates);
  return response.data;
};
```

### Exemple avec Fetch (Vanilla JS)
```javascript
// Fonction utilitaire
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('token');
  const config = {
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    },
    ...options
  };
  
  const response = await fetch(`http://localhost:5000/api${endpoint}`, config);
  return response.json();
};

// Exemples d'utilisation
const tasks = await apiCall('/tasks?status=A_faire&page=1');
const newTask = await apiCall('/tasks', {
  method: 'POST',
  body: JSON.stringify({ title: 'Nouvelle tâche' })
});
```
