const express = require('express');
const app = express();

let posts = {
        "todos": [
            {
                "id": "0",
                "title": "Add, mark as Done and remove a note from the main page",
                "description": "First",
                "edit": false,
                "checked": true,
                "archived": false
            },
            {
                "id": "1",
                "title": "Edit notes on a separate page",
                "description": "Second",
                "edit": false,
                "checked": true,
                "archived": false
            },
            {
                "id": "2",
                "title": "Find a note by name or text inside",
                "description": "Third",
                "edit": false,
                "checked": true,
                "archived": false
            },
            {
                "id": "3",
                "title": "Load notes by HTTP request",
                "description": "Fourth",
                "edit": false,
                "checked": true,
                "archived": false
            },
            {
                "id": "4",
                "title": "Ability to archive your note and rearchive it back from 'Archive' page",
                "description": "Fifth",
                "edit": false,
                "checked": true,
                "archived": false
            }
        ],
        "title": "",
        "description": "",
        "search": "",
        "searchResult": [],
        "edit": 0,
        "editResult": "",
        "archive": [
            {
                "id": "5",
                "title": "All is done",
                "description": "YEAH!!!",
                "edit": false,
                "checked": false,
                "archived": true
            },
        ]
};


const corsMiddleware = (req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', '*');
  res.setHeader('Access-Control-Allow-Headers', '*');
  next();
};

app.use(express.json());
app.use(corsMiddleware);


app.get('/posts', (req, res) => {
    res.status(200).json(posts);
});

app.get('/posts/:id', (req, res) => {
    const id = req.params.id;
    const item = posts.todos.find(item => item.id === id);

    if (id) {
        res.status(200).json(item);
    } else {
        res.status(404).json({ msg: 'item not found' });
    }
});

app.post('/posts', (req, res) => {
    const item = req.body;
    posts.todos.push(item);
    res.status(200).send();
});

app.delete('/posts/:id', (req, res) => {
    const id = req.params.id;
    if (id) {
        posts.todos = posts.todos.filter(item => item.id !== id);
        res.status(200).send();
    } else {
        res.status(404).json({ msg: 'Item not found' });
    }
});

app.put('/posts/:id', (req, res) => {
    const newItem = req.body;
    const id = req.params.id;

    posts.todos = posts.todos.map(item => {
        if (item.id === id) {
            item = {...newItem, id};
        }
        return item;
    });

    res.status(200).send(posts)
});

app.put('/posts', (req, res) => {
    const newItem = req.body;

    posts = newItem;

    res.status(200).send()
});


app.listen(3001, () => {
    console.log('app working');
});
