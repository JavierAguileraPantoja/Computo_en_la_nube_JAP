const express = require('express');
const engine = require('ejs-mate');
const path = require('path');
const morgan = require('morgan');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');

// Requerimientos e inicializaciones
const app = express();
require('./database');
require('./passport/local-auth');

// Configuraciones
app.set('views', path.join(__dirname, 'views'));
app.engine('ejs', engine);
app.set('view engine', 'ejs');
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// Middlewares de sesión y autenticación (¡orden importante!)
app.use(session({
    secret: 'miclave',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// Variables globales para mensajes flash y usuario
app.use((req, res, next) => {
    app.locals.signupMensaje = req.flash('signupMensaje');
    app.locals.signinMensaje = req.flash('signinMensaje');
    app.locals.user = req.user;
    res.locals.message=req.session.message;
    next();
});

// Archivos estáticos
app.use('/Uploads', express.static(path.join(__dirname,'Uploads')));

// Rutas
app.use('/', require('./routes/routes.js'));

// Iniciando Servidor
app.listen(app.get('port'), () => {
    console.log('SERVIDOR EN PUERTO', app.get('port'));
});