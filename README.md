# `EduBot`

**Description**  
Project ini bertujuan untuk siswa tingkat SMA/K belajar dengan tutor virtual.
Tutor virtual disini berupa ChatBot AI yang di spesifikasi hanya pada satu pelajaran.
Siswa dapat bertanya terkait materi yang dipelajari atau meminta ChatBot membuatkan quiz
untuk soal latihan, AI nya juga dapat memberikan rekomendasi video dari youtube terkait materi yang ditanyakan.

---

## 🧑‍💻 Team

| **Name**                   | **Role**     |
| -------------------------- | ------------ |
| Nashir Resta Fauzian       | Backend Dev  |
| Muhammad Yudha Pratama     | Backend Dev  |
| Rafi Ikbar Fahrezy         | Frontend Dev |
| Natanael Adrie Christiawan | Frontend Dev |

---

## 🚀 Features

- **🤖 AI ChatBot**: Ajukan pertanyaan dalam bahasa natural dan dapatkan respons yang cerdas secara real-time.

## 🛠 Tech Stack

**Frontend:**

- ReactJs
- MaterialUi
- ...

**Backend:**

- ExpressJs
- TypeScript
- Firebase Admin SDK
- PostgresSql

---

## 🚀 How to Run the Project

### Step 1. Clone the Repository by branch

```bash
git git clone --branch frontend https://github.com/NRestFzn/ai-x-softdev.git
cd frontend

git git clone --branch backend https://github.com/NRestFzn/ai-x-softdev.git
cd backend
```

### Step 2. Copy & Paste env

```
- Copy everything from .env.example file
- Create .env file and paste it

```

### Step 3. Setup Backend

```
- build the app first with "npm run build"
- run "npm run generate:secret" for jwt secret
- get Gemini API key from aistudio.google.com

```

### Step 4. Get Firebase Admin SDK Credentials (Backend)

```
- Open firebase console
- Open project setting from the gear icon menu, then go to service account
- Click generate new private key, you'll receive json file
- Move the credentials to env ascendingly

```

### Step 5. Setup docker (Backend)

```
docker-compose up -d

```

### Step 6. Setup database (Backend)

```
- npm run migrate (run migrations to database)
- npm run migrate:revert (revert latest migration)
```

### Step 7. Run Application (Backend)

```
- npm run build => npm run start:prod
- npm run watch:dev
...

## 📋 Requirements (optional)

- Node.js v22.14.0+
- npm v11.4.1
```
