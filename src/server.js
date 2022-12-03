const Hapi = require('@hapi/hapi');

const albums = require('./api/albums');
const AlbumService = require('./services/inMemory/AlbumsService');
const AlbumValidator = require('./validator/notes');

const songs = require('./api/songs');
const SongsService = require('./services/inMemory/SongsService');
const SongValidator = require('./validator/songs');

const init = async () => {
  
  const albumService = new AlbumService();
  const songService = new SongsService();

  const server = Hapi.server({
    port: 5000,
    host: process.env.NODE_ENV !== 'production' ? 'localhost' : '0.0.0.0',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([{
      plugin: albums,
      options: {
        service: albumService,
        validator: AlbumValidator,
      }
    }, {
      plugin: songs,
      options: {
        service: songService,
        validator: SongValidator,
      }
    }
  ]);

  await server.start();
  console.log(`Server berjalan pada ${server.info.uri}`);
};

init();