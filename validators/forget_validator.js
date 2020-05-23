const { check } = require('express-validator');

module.exports = [
    check('email').not().isEmpty().withMessage('メールアドレスは入力必須項目です。').isEmail().withMessage('メールアドレスを入力してください'),
    check('question').not().isEmpty().withMessage('好きな食べ物は入力必須項目です。')
];