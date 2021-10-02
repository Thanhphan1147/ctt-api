var constants = require('./configs/globals');
require('./server/utils/dateUtils')
const http = require('http');
const app = require('./app');
const mongoConnection = require('./mongo/connect');

exports.promise = mongoConnection.connectToMongoAtlas()
  .then(() => {
		console.log('Connected to atlas cluster');
  })
  .catch((err) => {
		console.log('Error connection to atlas cluster', err);
  })
  .then(function CreateServer() {
  // API endpoints
	  const indexRouter = require('./routes/index');
	  const usersRouter = require('./routes/users');
	  const scheduleEndpoint = require('./server/endpoints/scheduleEndpoint');
	  const authEndpoint = require('./server/endpoints/authEndpoint');

	  const errorHandler = error => {
		if (error.syscall !== 'listen') {
		  throw error;
		}
		const address = server.address();
		const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
		switch (error.code) {
		  case 'EACCES':
			console.error(bind + ' requires elevated privileges.');
			process.exit(1);
			break;
		  case 'EADDRINUSE':
			console.error(bind + ' is already in use.');
			process.exit(1);
			break;
		  default:
			throw error;
		}
  };

  /**
   * Get port from environment and store in Express.
   */
  const port = constants.PORT || 3000;
  app.use('/', indexRouter);
  app.use('/users', usersRouter);
  app.set('port', port);
  app.get('/test', function (req,res) {
		console.log('testing');
		res.end('hello');
  });
  app.get('/password', (req, res) => {
  	const bcrypt = require('bcrypt');
  	const cfgs = require('./configs/crypto')
  	const ftp = "YeuMaiTronDoi";
  	bcrypt.hash(ftp, cfgs.SALT_ROUNDS, (err, hash) => {
  		res.json({
			  status: 200,
			  message: "generated",
			  hash: hash
			})
  	})
  })

  app.use('/api/schedule', scheduleEndpoint);
  app.use('/api/authenticate', authEndpoint);

  /**
   * In the end catch Errors
   */
  app.use((error, req, res, next) => {
		// Sets HTTP status code
		res.status(error.status || 500)

		// Sends response
		res.json({
		  status: error.status || 500,
		  message: error.message,
		  stack: error.stack
		})
  })

  /**
   * Create HTTP server.
   */
  const server = http.createServer(app);
  /**
   * Listen on provided port, on all network interfaces.
   */
  server.on('error', errorHandler);
  server.on('listening', () => {
		const address = server.address();
		const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
		console.log(`API running at:${bind}`);
  });

  exports.server = server.listen(port);
  exports.close = mongoConnection.closeDB;
  return server;

});
