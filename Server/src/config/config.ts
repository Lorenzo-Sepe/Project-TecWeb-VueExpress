module.exports={
    port:  process.env.PORT || 8081,
    db:{
        database: process.env.DB_NAME || 'hivemind',
        user: process.env.DB_USER || 'hivemind'
        password: process.env.DB_PASS || 'hivemind',
        options:{
            dialect: process.env.DIALECT 'sqlite',
            host: process.env.STORE 'localhost',
            storage:'./hivemind.sqlite'
        }
    }
}