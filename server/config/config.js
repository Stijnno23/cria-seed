/*jslint node:true*/
module.exports = {
    deployment: {
        port: 6051,
        repoUrl: "https://github.com/Stijnno23/cria-seed",
        user: "lous23@live.nl, bryanvanelden@hotmail.nl, dion_westmaas@msn.com",
        to: "theo.theunissen@gmail.com",
        userName: "CRIA-testert",
        password: "topSecret!"
    },
    development: {
        db: 'mongodb://localhost/test',    // change books with your database
        port: 6502,                             // change with your port number
        debug: true                             // set debug to true|false
    },
    test: {
        db: 'mongodb://localhost/books-tst',    // change books with your database
        port: 6503,                             // change with your port number
        debug: true                             // set debug to true|false
    },
    acceptance: {
        db: 'mongodb://localhost/books-acc',    // change books with your database
        port: 6504,                             // change with your port number
        debug: true                             // set debug to true|false
    },
    production: {
        db: 'mongodb://localhost/books-prd',    // change books with your database
        port: 6505,                             // change with your port number
        debug: false                            // set debug to true|false
    }
};
