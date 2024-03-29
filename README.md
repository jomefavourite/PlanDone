<p align="center">
<img src="./public/images/PlanDone-white.svg" alt="plandone" >
</p>

<img src="./public/images/plandone-cover.png" alt="plandone cover" />

---

<p align="center">
  <a href="https://plandone-student.herokuapp.com/">View Demo</a> | 
  <a href="https://github.com/jomefavourite/PlanDone/issues">Report a Bug</a>  |
  <a href="https://github.com/jomefavourite/PlanDone/pulls">Contribute</a>
</p>

## Introducing PlanDone

PlanDone is a platform made for Students who would like to learn smart, be productive and access everything they need while studying in one place.

By giving students the ability to save their notes, tasks and forecast their Cumulative Grade Point Average (CGPA) score, which can all be accessed at any time. So now you can make sure you Plan and then complete (Done)

[Read the article to find out more about PlanDone](https://favouritejome.hashnode.dev/introducing-plandone-getting-plans-done)

## Demo

[Try PlanDone](https://plandone-student.herokuapp.com/)

## Features

- Creating notes, editing, saving and deleting Notes.
- Creating tasks, saving and deleting Tasks.
- Forecast your CGPA score needed to be on either a first, second and third class based on your previous GPA scores.
- Adding useful links to be accessed easily later on.

## 🛠️ Installation Steps

1. Clone the repository

```bash
git clone https://github.com/jomefavourite/PlanDone
```

2. Change the working directory

```bash
cd PlanDone
```

3. Install dependencies

```bash
npm install
```

4. Create `.env` file in root and add your variables

```bash
GOOGLE_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID
GOOGLE_CLIENT_SECRET = YOUR_GOOGLE_CLIENT_SECRET
MONGO_URI = YOUR_MONGO_URI
PORT = 3000
SESSION_SECRET = YOUR_SESSION_SECRET
```

5. Run the app

```bash
npm run dev
```

You are all set! Open [localhost:3000](http://localhost:3000/) to see the app.

## Built With

- **[Node.js](https://nodejs.org/en/)** for authentication, routing.
- **[Express](https://expressjs.com/)** for ease while working with Node.js
- **[EJS](https://ejs.co/)**: A template engine language that generates HTML markup with plain JavaScript.
- **[SASS](https://sass-lang.com/)**: Sass is a preprocessor scripting language that is interpreted or compiled into Cascading Style Sheets.
- **[MongoDD/Mongoose](https://www.mongodb.com/)** for managing, storing or retrieving information.
- **[Railway](https://railway.app/)** for hosting the application.

## 🛡️ License

This project is licensed under the MIT License - see the [`LICENSE`](LICENSE) file for details.
