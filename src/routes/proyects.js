const router = require('express').Router();
const mongojs = require ('mongojs');
const db = mongojs('mean-db', ['proyects']);

router.get('/proyects', (req, res,next) => {
    db.proyects.find((err, proyects) => {
        if(err) return next(err);
        res.json(proyects);
    });
});

router.get('/proyects/:id', (req, res,next) => {
    db.proyects.findOne({_id: mongojs.ObjectId(req.params.id)},(err, proyect) => {
        if(err) return next(err);
        res.json(proyect);
    });
});
;

router.post('/proyects', (req, res, next) => {
    const proyect = req.body;
    if(!proyect.title || !(proyect.isDone + '')){
        res.status(400).json({
            error: 'Bad data'
        });
    }else {
        db.proyects.save(proyect, (err, proyect) => {
            if(err) return next(err)
            res.json(proyect);
        })
    }
})

router.delete('/proyects/:id', (req, res, next) => {
    db.proyects.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if(err) return next(err)
            res.json(result);
    });
})

router.put('/proyects/:id',(req, res, next) => {
    const proyect = req.body
    const updateproyect = {};

    if(proyect.isDone) {
        updateproyect.isDone = proyect.isDone;
    }

    if(proyect.title) {
        updateproyect.title = proyect.title;
    }

    if(!updateproyect) {
        res.status(400).json({
            error: 'Bad Request'
        })
    }else {
        db.proyects.update({_id: mongojs.ObjectId(req.params.id)},updateproyect, (err, proyect) => {
            if(err) return next(err);
            res.json(proyect)
        });
    }

})

module.exports = router;