import Joi from 'joi'

export function saveUser(req, res, next) {
    const schema = Joi.object({
        user: Joi.string().regex(/^[a-zA-Z0-9-_]{3,}$/).required(),
        email: Joi.string().regex(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/).required(),
        password: Joi.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*#?&]{8,32}$/).required()
    });

    const { error, value } = schema.validate(req.body);

    if (error) {
        switch (error.details[0].context.key) {
            case 'user':
                res.status(400).send({
                    error: `Devi fornire un username valido:
                    <br>
                    1. Deve contenere solo lettere, numeri e "-,_".
                    `
                });
                break;
            case 'email':
                res.status(400).send({
                    error: 'Devi fornire un indirizzo email valido'
                });
                break;
            case 'password':
                res.status(400).send({
                    error: `La password deve rispettare le seguenti regole:
                    <br>
                    1. Deve contenere i seguenti caratteri: minuscole, maiuscole, numeri.
                    <br>
                    2. Può contenere caratteri speciali (@, $, !, %, *, #, ?, &).
                    <br>
                    3. Deve essere lunga almeno 8 caratteri e non superare i 32 caratteri.
                    `
                });
                break;
            default:
                res.status(400).send({
                    error: 'Informazioni di registrazione non valide'
                });
        }
    } else {
        next();
    }
}
