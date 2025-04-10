# 🛠️ Contribution Guidelines

Follow these steps before starting to contribute. Directly cloning and working on the code is **NOT** allowed.

---

## ✅ First: Check Your Assigned Remote Branch

- On the GitHub repo page, check the top-left where it says `main`.
- Click and look for a branch with **your name**. That’s your assigned remote branch.
- **DO NOT** work on `main` or any other branch unless told to.

---

## ✅ Second: Clone the Repository

- Click the green **Code** button.
- Copy the link and clone the repository into VS Code:

```
git clone https://github.com/atharva012004/CoLab1.git
cd your-repo
```

---

## ✅ Third: Setup Local Branch & Start Work

After cloning, follow these steps carefully:

### 1. Fetch All Remote Branches

```
git fetch --all
```

### 2. Create a Local Branch and Connect to Remote  
Replace `your-branch-name` with your actual branch name:

```
git checkout -b your-branch-name origin/your-branch-name
```

> 💡 Tip: Keep your local and remote branch names the same to avoid confusion.

### 3. After Work is Done – Commit & Push

```
git add .
git commit -m "Your message"
git push origin your-branch-name
```

---

## ✅ Fourth: Raise an Issue Before Starting Work

- Always **raise an issue** mentioning:
  - What file you’re working on
  - What exactly you’re going to do
- **Wait till it is assigned to you** before making changes.

---

## 🔧 Additional Setup (for running the project)

### 1. Install Dependencies

Go inside both `client` and `server` folders and install dependencies:

```
cd client
npm install

cd ../server
npm install
```

### 2. Run the Project (in separate terminals)

**Client:**

```
cd client
npm run dev
```

**Server:**

```
cd server
npm start
```

---

✅ Let’s keep the codebase clean and the teamwork smooth.  
If you have any doubts — **ask before you commit!**
