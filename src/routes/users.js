const router = require('express').Router();
const mongojs = require ('mongojs');
const db = mongojs('mean-db', ['users']);

router.get('/users', (req, res,next) => {
    db.users.find((err, users) => {
        if(err) return next(err);
        res.json(users);
    });
});

router.get('/users/:id', (req, res,next) => {
    db.users.findOne({_id: mongojs.ObjectId(req.params.id)},(err, user) => {
        if(err) return next(err);
        res.json(user);
    });
});
;

router.post('/users', (req, res, next) => {
    const user = req.body;
    if(!user.email){
        res.status(400).json({
            error: 'Bad data'
        });
    }else {
        db.users.save(user, (err, user) => {
            if(err) return next(err)
            res.json(user);
        })
    }
})

router.delete('/users/:id', (req, res, next) => {
    db.users.remove({_id: mongojs.ObjectId(req.params.id)}, (err, result) => {
        if(err) return next(err)
            res.json(result);
    });
})

router.put('/users/:id',(req, res, next) => {
    const user = req.body
    const updateuser = {};

    if(user.email) {
        updateuser.email = user.email;
    }

    if(!updateuser) {
        res.status(400).json({
            error: 'Bad Request'
        })
    }else {
        db.users.update({_id: mongojs.ObjectId(req.params.id)},updateuser, (err, user) => {
            if(err) return next(err);
            res.json(user)
        });
    }

})

module.exports = router;