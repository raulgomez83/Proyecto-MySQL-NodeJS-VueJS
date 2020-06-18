require('dotenv').config();

const cors = require('cors');

const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const fileUpload = require('express-fileupload');
const path = require('path');
const app = express();
const port = process.env.PORT;

const { getAllUsers } = require('./controllers/user/list_allusers');
const { newUser } = require('./controllers/user/new_user');
const { validateUser } = require('./controllers/user/validation');
const { loginUser } = require('./controllers/user/login');
const { getUser } = require('./controllers/user/get_data_user');
const { updateUser } = require('./controllers/user/update_user');
const { updatePassword } = require('./controllers/user/update_password');
const { disableUser } = require('./controllers/user/disable');
const { deleteUser } = require('./controllers/user/delete');
const { reactivateUser } = require('./controllers/user/reactivate');
const { recoveryPassword } = require('./controllers/user/recoverypassword');

const { userIsAuthenticated, userIsAdmin } = require('./middlewares/auth');

const {
  getAllPresentations
} = require('./controllers/presentation/list_allpresentations');

const {
  newPresentation
} = require('./controllers/presentation/new_presentation');
const { getPresentationsTops3 } = require('./controllers/presentation/tops3');
const { getPresentation } = require('./controllers/presentation/get_data');
const { getSearchPresentations } = require('./controllers/presentation/search');
const { updatePresentation } = require('./controllers/presentation/update');
const { deletePresentation } = require('./controllers/presentation/delete');

const { newRating } = require('./controllers/rating/new_rating.js');
const { getAllRatings } = require('./controllers/rating/list_all_votes');

const { viewPresentation } = require('./controllers/watches/new_view');
const {
  getHistoryUserPresentation
} = require('./controllers/user/data_presentation_history');
const {
  getHistoryUserRating
} = require('./controllers/user/data_rating_history');
const { getContact } = require('./controllers/presentation/contact.js');
const {
  getSearchPresentationsSpecial
} = require('./controllers/presentation/search_special');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(fileUpload());
app.use(cors());
app.use(express.static(path.join(__dirname, 'static')));

//SEARCH ROUTES
app.post('/search', getSearchPresentations); //Búsqueda general del landing
app.post('/presentation/specialsearch', getSearchPresentationsSpecial); // Búsqueda específica en presentaciones

//ADMIN ROUTES
app.get('/users', userIsAuthenticated, userIsAdmin, getAllUsers); //Lista todos los usuarios
app.delete('/user/delete/:id', userIsAuthenticated, userIsAdmin, deleteUser); //Borra un usuario
app.get('/ratings', userIsAuthenticated, userIsAdmin, getAllRatings); //Lista todas la votaciones
//Muestra una visita a una presentación

//USER ROUTES
app.put('/user/password/:id', userIsAuthenticated, updatePassword); //Cambia la contaseña de un usuario
app.put('/user/disable/:id', userIsAuthenticated, disableUser); //Desactiva un usuario
app.put('/user/reactivate', reactivateUser); //Reactiva un usuario desactivado
app.get('/user/historyratings/:id', userIsAuthenticated, getHistoryUserRating); //Muestra los historiales
app.get(
  '/user/historypresentations/:id',
  userIsAuthenticated,
  getHistoryUserPresentation
);
app.put('/user/recovery', recoveryPassword); //Permite logear con una contraseña temporal

app.get('/user/:id', userIsAuthenticated, getUser); //Muestra los datos de un usuario
app.put('/user/:id', userIsAuthenticated, updateUser); //Edita los datos de un usuario
app.post('/presentation', userIsAuthenticated, newPresentation); //Permite subir una presentación a un usuario
app.post('/presentation/rating/:id', userIsAuthenticated, newRating); //Permite votar una presentación
app.post('/presentation/contact/:id', userIsAuthenticated, getContact); //Permite poner en contacto a un usuario con el usuario que subió la presentación
app.put('/presentation/:id', userIsAuthenticated, updatePresentation); //Permite editar la presentación
app.delete('/presentation/:id', userIsAuthenticated, deletePresentation); //Permite borrar la presentación

//PUBLIC ROUTES
app.post('/user', newUser); //Crea un nuevo usuario
app.get('/users/validate', validateUser); //Valida un usuario
app.post('/users/login', loginUser); //logea a un usuario
app.get('/presentations', getAllPresentations); //Lista todas las presentaciones
app.get('/presentations/top3', getPresentationsTops3); //Muestra las listas top de presentaciones
app.get('/presentation/:id', getPresentation); //Muestra la información de una presentación
app.post('/presentation/view/:id', viewPresentation);

app.use((error, req, res, next) => {
  res.status(error.httpCode || 500).send({
    status: 'error',
    message: error.message
  });
});

app.use((req, res) => {
  res.status(404).send({
    status: 'error',
    message: 'Not found'
  });
});
app.listen(port, () => {
  console.log(`Server working ${port}`);
});
