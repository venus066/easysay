import { Router } from 'express';

const router = Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/signin', function(req, res, next) {
    res.render('signin', { title: 'Express' });
});

router.get('/signup', function(req, res, next) {
    res.render('signup', { title: 'Express' });
});

router.get('/error', function(req, res, next) {
    res.render('error', { message: 'Access forbidden', error: 403 });
});

export default router;