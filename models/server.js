
const express = require('express');
const cors = require('cors');
const path = require('path');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../db/config');


class Server {

    constructor() {

        this.app = express();
        this.port = process.env.PORT;
        this.paths = {
            auth:      '/api/auth',
            users:      '/api/users',
            categories: '/api/categories',
            products:   '/api/products',
            search:     '/api/search',
            upload:     '/api/upload',
            email:      '/api/email',
        };

        // database
        this.databaseCNN();

        this.middlewares();

        this.routes();
        
        
    }

    async databaseCNN() {
        await dbConnection();
    }
    
    middlewares() {
        
        // CORS
        this.app.use( cors() );

        // Public Directory
        this.app.use(express.static('public')); // this is the route / 

        // Handling other routes to avoid error when page is reload and get blank page
        // this.app.get('*', ( req, res ) => {
        //     res.sendFile( path.resolve( __dirname, 'public/index.html' ) )
        // });
        
        this.app.use(express.json()); // any info on Body will be parse and transform to JSON

        // Upload files
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));

    }

    routes() {
        this.app.use( this.paths.auth, require('../routes/auth') );
        this.app.use( this.paths.users, require('../routes/users') );
        this.app.use( this.paths.categories, require( '../routes/categories' ));
        this.app.use( this.paths.products, require('../routes/products') );
        this.app.use( this.paths.search, require('../routes/search') );
        this.app.use( this.paths.upload, require('../routes/uploads') );
        this.app.use( this.paths.email, require('../routes/email') );

        

    }




    listen() {
        
        this.app.listen(this.port,  () => {
            console.log(`App listening on port ${this.port}`);
        } )
    }

};


module.exports = Server;
