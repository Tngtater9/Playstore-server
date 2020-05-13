const express = require('express');
const morgan = require('morgan');
const appList = require('./apps.js');

const app = express();

app.use(morgan('common'));

app.get('/apps',(req, res) =>{
    let apps = appList;

    let { sort, genres } = req.query;
    
    if(sort){
        sort = sort.toLowerCase();
        sort = sort.charAt(0).toUpperCase() + sort.slice(1);
        
        if(![ 'App', 'Rating' ].includes(sort)){
            res
                .status(400)
                .send("Sort must be my app name or rating");
        }
        
        apps = apps.sort((a, b) => {
            return a[sort] > b[sort] ? 1 : a[sort] < b[sort] ? -1 : 0;
            });
    }

    if(genres){
        genres = genres.toLowerCase();
        genres = genres.charAt(0).toUpperCase() + genres.slice(1);

        
        if(!['Action', 'Puzzle', 'Strategy', 'Casual', 'Arcade', 'Card'].includes(genres)){
            res
                .status(400)
                .send("Genres include Action, Puzzle, Strategy, Casual, Arcade, or Card");
            }
        
        apps = apps.filter(app => app.Genres.includes(genres));
    }

    res.json(apps);
});

module.exports = app;