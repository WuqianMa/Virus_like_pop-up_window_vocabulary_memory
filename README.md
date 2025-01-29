# Vocabulary Flashcard App

This is a **React-based Vocabulary Flashcard Web App** that dynamically displays random words with their translations. The app reads a CSV file containing vocabulary words and their translations, then periodically shows them in animated flashcards with random colors and positions.

## 🚀 Features
- Reads vocabulary words and translations from a **CSV file**.
- Displays flashcards that appear at random positions on the screen.
- Automatically cycles through words at a set interval.
- Ensures **font size scales** with the card size for better readability.
- **Adaptive font size**: If a translation exceeds 10 words, it is displayed in a smaller font.
- Deployed via **GitHub Pages** for easy access.

## 🛠️ Installation & Setup

### **1️⃣ Clone the Repository**
```sh
git clone https://github.com/YOUR-GITHUB-USERNAME/REPOSITORY-NAME.git
cd REPOSITORY-NAME
```

### **2️⃣ Install Dependencies**
```sh
npm install
```

### **3️⃣ Run the Development Server**
```sh
npm start
```
This will start the app at `http://localhost:3000/`.

### **4️⃣ Building for Production**
If you want to create a production build, run:
```sh
npm run build
```
This will generate an optimized `build/` folder.

### **5️⃣ Running the Production Build Locally**
To test the production build locally, install `serve`:
```sh
npm install -g serve
```
Then, run:
```sh
serve -s build
```
This will start a local server, and you can access your app at `http://localhost:5000/`.

## 📁 CSV File Format
Ensure you have a `EnWords.csv` file in the `public/` directory, structured as:
```csv
word,translation
hello,hola
apple,manzana
computer,ordenador
```

## 🌍 Deploying to GitHub Pages
### **1️⃣ Install `gh-pages`**
```sh
npm install gh-pages --save-dev
```

### **2️⃣ Update `package.json`**
Add the following:
```json
"homepage": "https://your-github-username.github.io/repository-name",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

### **3️⃣ Deploy**
```sh
npm run deploy
```
After deployment, your app will be live at:
```
https://your-github-username.github.io/repository-name
```

## 🏗️ Future Improvements
- Add user interaction (e.g., click to reveal translation).
- Customizable word display settings.
- Support for multiple languages.

## 📝 License
This project is **open-source** and available under the MIT License.

---
👨‍💻 Built with ❤️ using **React + Styled Components**




