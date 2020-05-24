const { check } = require('express-validator');

module.exports = [
    check('username').not().isEmpty().withMessage('お名前は入力必須項目です。'),
    check('email').not().isEmpty().withMessage('メールアドレスは入力必須項目です。同じアドレスは使えません').isEmail().withMessage('メールアドレスを入力してください'),
    check('question').not().isEmpty().withMessage('好きな食べ物は入力必須項目です。'),
    check('password').not().isEmpty().withMessage('パスワードは入力必須項目です。').isLength({ min: 5 }).withMessage('パスワードは5文字以上入力してください')
];