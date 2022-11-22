import posts from "./tuits.js";
let tuits = posts;

export default (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
}

const findTuits  = (req, res) => {
    res.json(tuits);
}

const createTuit = (req, res) => {
    const newTuit = req.body;
    newTuit._id = (new Date()).getTime()+'';
    newTuit.likes = 0;
    newTuit.liked = false;
    tuits.push(newTuit);
    res.json(newTuit);
}

const updateTuit = (req, res) => {
    const tuitdIdToUpdate = req.params.tid;
    const updates = req.body;
    tuits = tuits.map((t) =>

        t._id.toString() === tuitdIdToUpdate ?
            {...t, ...updates} :
            t
    );
    res.sendStatus(200);
}

const deleteTuit = (req, res) => {
    const tuitIdToDelete = req.params['tid'];
    console.log(tuitIdToDelete.toString());
    tuits = tuits.filter(t=>
        t._id.toString() !== tuitIdToDelete);
    res.sendStatus(200);
}
