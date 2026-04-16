const express    = require('express');
const router     = express.Router();
const controller = require('../pacientes/pacientes.controller');

router.get('/',  controller.get);
router.post('/', controller.post);
router.put('/:id',  controller.put);
router.delete('/:id', controller.destroy);

module.exports = router;