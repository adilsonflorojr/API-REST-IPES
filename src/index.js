require('dotenv').config(); 
const express = require('express');
const path = require('path');
const userRoutes = require('./routes/Authentication/userRoutes'); 
const treeRoutes = require('./routes/Authentication/treeRoutes');
const createInitialAdmin = require('./initialSetup/createInitialAdmin');

const swagger = require('swagger-ui-express')
const swaggerFile = require('../swagger_doc.json')

const syncModels = require('./configs/syncModel');
const app = express();

app.use(express.json());
app.use('/qrcode', express.static(path.join(__dirname, 'qrcode')));
app.use('/usuarios', userRoutes); 
app.use('/ipes', treeRoutes);
app.use('/swaggerDoc', swagger.serve, swagger.setup(swaggerFile))
syncModels()
  .then(() => createInitialAdmin())
  .then(() => {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
      console.log(`Servidor rodando na porta ${PORT}`);
    });
  })
  .catch(error => console.error('Erro ao iniciar server:', error));
