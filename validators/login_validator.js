const { check } = require('express-validator');

module.exports = [
    check('email').not().isEmpty().withMessage('メールアドレスは入力必須項目です。').isEmail().withMessage('メールアドレスを入力してください'),
    check('password').not().isEmpty().withMessage('パスワードは入力必須項目です。')
];