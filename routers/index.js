const express = require('express');
const router = express.Router();
const index_controller = require('../controllers/index_controller');
const user_controller = require('../controllers/user_controller');
const message_controller = require('../controllers/message_controller');
const coment_controller = require('../controllers/coment_controller');
const userExtractor = require('../jwtMiddleware')


//-----------------------------INDEX---------------------------

router.get('/', index_controller.index_get);

router.post('/', userExtractor, index_controller.index_post);

router.post('/login', index_controller.login);

router.post('/signin', index_controller.signin);


//-----------------------------USERS---------------------------

router.get('/users', userExtractor, user_controller.user_get);

router.post('/user/create', user_controller.user_create_post);


//-----------------------------MESSAGES---------------------------

router.get('/message', userExtractor, message_controller.message_get);

router.post('/message/create', userExtractor, message_controller.message_create_post);

router.post('/message/:id', message_controller.message_detail);

router.post('/message/:id/delete', userExtractor, message_controller.message_delete_post);


//-----------------------------COMENTS---------------------------


router.post('/coment/create', userExtractor, coment_controller.coment_create_post);

router.get('/coment/:id/delete', userExtractor, coment_controller.coment_delete_get);

module.exports = router;