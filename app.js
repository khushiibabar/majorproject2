// if(process.env.NODE_ENV != "production"){
// require('dotenv').config()
// }


// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError");
// const session = require("express-session");
// const MongoStore = require('connect-mongo');
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");

// const listingsRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js")

// //const MONGO_URL = "mongodb://127.0.0.1:27017/wanderlust";
// const dbUrl = process.env.ATLASDB_URL;

// main()
//   .then(() => {
//     console.log("Connected to DB");
//   })
//   .catch((err) => {
//     console.log(err);
//   });



// // async function main() {
// //   await mongoose.connect(dbUrl);
// // }
// await mongoose.connect(dbUrl, {
//   directConnection: true,
// });


// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "public")));

// // const store = MongoStore.create({
// //   mongoUrl: dbUrl,
// //   crypto: {
// //     secret: process.env.SECRET,
// //   },
// //   touchAfter: 24 * 3600,
// // });
// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   mongoOptions: {
//     directConnection: true,
//   },
//   crypto: {
//     secret: process.env.SECRET,
//   },
//    touchAfter: 24 * 3600,
// });

// store.on("error", (err) => {
//   console.log("ERROR IN MONGO SESSION STORE", err);
// });

// //session
// const sessionOptions = {
//   store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// app.use(session(sessionOptions));
// app.use(flash());

// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));

// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// // app.get("/", (req, res) => {
// //   res.send("Hi I am root.");
// // });

// app.get("/", (req, res) => {
//   res.redirect("/listings");   // or res.send("Hello root 🚀")
// });

// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// // app.get("/demouser", async (req, res) => {
// //   let fakeUser = new User({
// //     email: "delta@gmail.com",
// //     username: "delta-student",
// //   });

// //   let registeredUser = await User.register(fakeUser, "helloworld");
// //   res.send(registeredUser);
// // });

// app.use("/listings", listingsRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);

// //session
// // app.get("/contact", (req, res) => {
// //   //browser ke query me kuch bhi data se sakte he, by default me annonymous aayega bs
// //     let {name = "annonymous"} = req.query;
// //     req.session.name = name;
// //     console.log(req.session);
// //     res.send(name);
// // })

// // app.get("/account", (req, res) => {
// //     res.send(`hello, ${req.session.name}`);
// // })
// //session close

// // app.all("*", (req, res, next) => {
// // next(new ExpressError(404, "Page Not Found!"));
// // });

// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).render("error.ejs", { message });
// });

// // app.listen(8080, () => {
// //   console.log("app listening on port 8080");
// // });
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`✅ Server is running on port ${port}`);
// });

// if (process.env.NODE_ENV != "production") {
//   require("dotenv").config();
// }

// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const path = require("path");
// const methodOverride = require("method-override");
// const ejsMate = require("ejs-mate");
// const ExpressError = require("./utils/ExpressError");
// const session = require("express-session");
// const MongoStore = require("connect-mongo");
// const flash = require("connect-flash");
// const passport = require("passport");
// const LocalStrategy = require("passport-local");
// const User = require("./models/user.js");

// const listingsRouter = require("./routes/listing.js");
// const reviewRouter = require("./routes/review.js");
// const userRouter = require("./routes/user.js");

// const dbUrl = process.env.ATLASDB_URL;

// /* =======================
//    DATABASE CONNECTION
// ======================= */
// async function main() {
//   try {
//     await mongoose.connect(dbUrl, {
//       family: 4, // 👈 IPv4 force (Render + Atlas fix)
//       serverSelectionTimeoutMS: 10000,
//     });
//     console.log("Connected to DB");
//   } catch (err) {
//     console.error("Mongo connection error:", err);
//   }
// }

// main();

// /* =======================
//    APP CONFIG
// ======================= */
// app.set("view engine", "ejs");
// app.set("views", path.join(__dirname, "views"));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());
// app.use(methodOverride("_method"));
// app.engine("ejs", ejsMate);
// app.use(express.static(path.join(__dirname, "public")));

// /* =======================
//    SESSION STORE
// ======================= */
// const store = MongoStore.create({
//   mongoUrl: dbUrl,
//   mongoOptions: {
//     family: 4, // 👈 SAME FIX HERE
//   },
//   crypto: {
//     secret: process.env.SECRET,
//   },
//   touchAfter: 24 * 3600,
// });

// store.on("error", (err) => {
//   console.log("ERROR IN MONGO SESSION STORE", err);
// });

// const sessionOptions = {
//   store,
//   secret: process.env.SECRET,
//   resave: false,
//   saveUninitialized: true,
//   cookie: {
//     expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
//     maxAge: 7 * 24 * 60 * 60 * 1000,
//     httpOnly: true,
//   },
// };

// app.use(session(sessionOptions));
// app.use(flash());

// /* =======================
//    PASSPORT
// ======================= */
// app.use(passport.initialize());
// app.use(passport.session());
// passport.use(new LocalStrategy(User.authenticate()));
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

// /* =======================
//    GLOBAL MIDDLEWARE
// ======================= */
// app.use((req, res, next) => {
//   res.locals.success = req.flash("success");
//   res.locals.error = req.flash("error");
//   res.locals.currUser = req.user;
//   next();
// });

// /* =======================
//    ROUTES
// ======================= */
// app.get("/", (req, res) => {
//   res.redirect("/listings");
// });

// app.use("/listings", listingsRouter);
// app.use("/listings/:id/reviews", reviewRouter);
// app.use("/", userRouter);

// /* =======================
//    ERROR HANDLER
// ======================= */
// app.use((err, req, res, next) => {
//   let { statusCode = 500, message = "Something went wrong!" } = err;
//   res.status(statusCode).render("error.ejs", { message });
// });

// /* =======================
//    SERVER
// ======================= */
// const port = process.env.PORT || 8080;
// app.listen(port, () => {
//   console.log(`✅ Server is running on port ${port}`);
// });

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

const express = require("express");
const app = express();
const mongoose = require("mongoose");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const ExpressError = require("./utils/ExpressError");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");

const listingsRouter = require("./routes/listing.js");
const reviewRouter = require("./routes/review.js");
const userRouter = require("./routes/user.js");

const dbUrl = process.env.ATLASDB_URL;
if (!dbUrl) {
  console.error("❌ ATLASDB_URL is missing");
  process.exit(1);
}

/* =======================
   DATABASE CONNECTION
======================= */
async function connectDB() {
  try {
    await mongoose.connect(dbUrl, {
      family: 4, // IPv4 force (Render + Atlas)
      serverSelectionTimeoutMS: 10000,
    });
    console.log("✅ Connected to DB");
  } catch (err) {
    console.error("❌ Mongo connection error:", err);
    process.exit(1);
  }
}

/* =======================
   APP CONFIG
======================= */
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.engine("ejs", ejsMate);

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname, "public")));

// Render/HTTPS safe
app.set("trust proxy", 1);

/* =======================
   SESSION STORE
======================= */
const store = MongoStore.create({
  mongoUrl: dbUrl,
  mongoOptions: { family: 4 },
  crypto: { secret: process.env.SECRET },
  touchAfter: 24 * 3600,
});

store.on("error", (err) => {
  console.error("❌ SESSION STORE ERROR", err);
});

const sessionOptions = {
  store,
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  },
};

app.use(session(sessionOptions));
app.use(flash());

/* =======================
   PASSPORT
======================= */
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/* =======================
   GLOBAL MIDDLEWARE
======================= */
app.use((req, res, next) => {
  res.locals.success = req.flash("success");
  res.locals.error = req.flash("error");
  res.locals.currUser = req.user;
  next();
});

/* =======================
   ROUTES
======================= */
app.get("/", (req, res) => res.redirect("/listings"));
app.use("/listings", listingsRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);

/* =======================
   ERROR HANDLER
======================= */
app.use((err, req, res, next) => {
  const { statusCode = 500, message = "Something went wrong!" } = err;
  res.status(statusCode).render("error.ejs", { message });
});

/* =======================
   START SERVER (AFTER DB)
======================= */
const port = process.env.PORT || 8080;

connectDB().then(() => {
  app.listen(port, () => {
    console.log(`✅ Server is running on port ${port}`);
  });
});
