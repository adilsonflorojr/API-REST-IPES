const swaggerAutogen = require('swagger-autogen')()

output = './swagger_doc.json'
endpoints = ['./src/index']

swaggerAutogen(output, endpoints)