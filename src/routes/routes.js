const express = require('express');
const router = express.Router();
const User = require('../models/users');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const passport = require('passport');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, '..', 'Uploads'));
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
    }
});
const upload = multer({ storage: storage }).single('image');

// Rutas públicas
router.get('/', async (req, res) => {
    try {
        const users = await User.find().exec();
        res.render('index', {
            title: 'Home Page',
            users: users,
            message: req.session.message
        });
        req.session.message = null;
    } catch (err) {
        res.json({ message: err.message });
    }
});

router.get('/add', (req, res) => {
    res.render('add_users', { title: 'Agregar Usuarios' });
});

router.get('/users', (req, res) => {
    res.send('USUARIOS');
});

router.get('/edit/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findById(id).exec();
        res.render('edit_users', { title: 'Modificar Usuarios', user: user });
    } catch (err) {
        res.json({ message: err.message });
        res.redirect('/');
    }
});

// Rutas de autenticación
router.get('/signup', (req, res) => {
    res.render('signup',{title:'Página de Registro'});
});

router.post('/signup', passport.authenticate('local-signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', (req, res) => {
    res.render('signin',{title:'Página de Inicio de Sesión'});
});

router.post('/signin', passport.authenticate('local-signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

// Rutas protegidas (requieren autenticación)
router.get('/profile', isAuthenticated, (req, res) => {
    res.render('profile',{title:'Página de Perfil'});
});

router.get('/logout', (req, res, next) => {
    req.logout((err) => {
        if (err) { return next(err); }
        res.redirect('/');
    });
});

router.get('/products', isAuthenticated, (req, res) => {
    res.send('Página de Productos');
});

// Rutas de acciones
router.post('/add', upload, async (req, res) => {
    try {
        const hashedPassword = await User.encryptPassword(req.body.password);
        const imageUrl = req.file.filename;
        const user = new User({
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: imageUrl,
            password: hashedPassword,
        });
        await user.save();
        req.session.message = {
            type: 'success',
            message: 'Usuario Registrado Exitosamente!',
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

router.post('/update/:id', upload, async (req, res) => {
    try {
        let id = req.params.id;
        let new_image = req.file ? req.file.filename : req.body.old_image;

        if (req.file) {
            try {
                fs.unlinkSync('./Uploads/' + req.body.old_image);
            } catch (err) {
                console.log(err);
            }
        }

        await User.findByIdAndUpdate(id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            image: new_image,
        }).exec();

        req.session.message = {
            type: 'success',
            message: 'Usuario modificado Exitosamente!',
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message, type: 'danger' });
    }
});

router.get('/delete/:id', async (req, res) => {
    try {
        let id = req.params.id;
        const result = await User.findByIdAndDelete(id).exec();
        if (result && result.image !== '') {
            try {
                fs.unlinkSync('./Uploads/' + result.image);
            } catch (err) {
                console.log(err);
            }
        }
        req.session.message = {
            type: 'success',
            message: '¡Usuario eliminado correctamente!',
        };
        res.redirect('/');
    } catch (err) {
        res.json({ message: err.message });
    }
});

// Middleware para verificar autenticación
function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

module.exports = router;