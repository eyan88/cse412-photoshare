const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    try {
        const token = req.header('Authorization');
        if (!token) return res.status(400).json({ msg: 'invalid authorization '});

        jwt.verify(token, 'tokensecret', (err, user) => {
            if (err) return res.status(400).json({ msg: "invalid authorization "});
            req.user = user;
            next();
        });
    } catch {
        return res.status(500).json({ msg: err });
    }
}

module.exports = auth;