import Joi from 'joi'

export function saveUser(req, res, next) {
    const schema = Joi.object({
        user: Joi.string().alphanum().min(3).max(30).required(),
        email: Joi.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,32}$/).required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        switch (error.details[0].context.key) {
            case 'user':
                res.status(400).send({
                    error: 'You must provide a valid username'
                });
                break;
            case 'email':
                res.status(400).send({
                    error: 'You must provide a valid email address'
                });
                break;
            case 'password':
                res.status(400).send({
                    error: `The password provided failed to match the following rules:
                    <br>
                    1. It must contain the following characters: lower case, upper case, numerics, specials (@, $, !, %,*, #, ?, &).
                    <br>
                    2. It must be at least 8 characters in length and not greater than 32 characters in length.
                    `
                });
                break;
            default:
                res.status(400).send({
                    error: 'Invalid registration information'
                });
        }
    } else {
        next();
    }
}
