import express from "express";
import { basic, dakuten, handakuten, combine } from "./static/alphabets.js";

const app = express();

let jpBasic = [];
let index = -1;
let romaji = "";
let hiragana = "";
let katakana = "";

app.get("/", (req, res) => {
    jpBasic = basic.slice(0);
    index = -1;
    romaji = "";
    hiragana = "";
    katakana = "";

    res.redirect("/start");
});

app.get("/start", (req, res) => {
    index = Math.floor(Math.random() * jpBasic.length);

    if(romaji != "") {
        romaji = jpBasic[index].romaji;
    }
    
    if(hiragana != "") {
        hiragana = jpBasic[index].hiragana;
    }
    
    if(katakana != "") {
        katakana = jpBasic[index].katakana;
    }

    res.render("body.ejs", {
        romaji: romaji,
        hiragana: hiragana,
        katakana: katakana,
        remain: jpBasic.length.toString(),
        finish: (46 - jpBasic.length).toString()
    });
});

app.get("/romaji", (req, res) => {
    if(romaji == "") {
        romaji = jpBasic[index].romaji;
    } else {
        romaji = "";
    }

    res.render("body.ejs", {
        romaji: romaji,
        hiragana: hiragana,
        katakana: katakana,
        remain: jpBasic.length,
        finish: 46 - jpBasic.length
    });
});

app.get("/hiragana", (req, res) => {
    if(hiragana == "") {
        hiragana = jpBasic[index].hiragana;
    } else {
        hiragana = "";
    }

    res.render("body.ejs", {
        romaji: romaji,
        hiragana: hiragana,
        katakana: katakana,
        remain: jpBasic.length,
        finish: 46 - jpBasic.length
    });
});

app.get("/katakana", (req, res) => {
    if(katakana == "") {
        katakana = jpBasic[index].katakana;
    } else {
        katakana = "";
    }

    res.render("body.ejs", {
        romaji: romaji,
        hiragana: hiragana,
        katakana: katakana,
        remain: jpBasic.length,
        finish: 46 - jpBasic.length
    });
});

app.get("/next", (req, res) => {
    if(jpBasic.length == 1) {
        res.render("body.ejs", {
            done: {
                title: "Congratulations!!!",
                desc: "You've done Basic Japanese Alphabets"
            }
        });
    } else {
        jpBasic.splice(index, 1);
        
        res.redirect("/start");
    }
});

app.get("/skip", (req, res) => {
    res.redirect("/start");
});

app.listen(3000, () => {
    console.log("Server is running at port 3000!!!");
});