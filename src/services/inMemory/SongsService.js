const { nanoid } = require("nanoid");
const InvariantError = require("../../exceptions/InvariantError");
const NotFoundError = require("../../exceptions/NotFoundError");

class SongsService {
  constructor(){
    this._songs = [];
  }

  addSong({ name, year, genre, performer, duration }){
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newSong = {
      id, name, year, genre, performer, duration, createdAt, updatedAt,
    };

    this._songs.push(newSong);

    const isSuccess = this._songs.filter((song) => song.id === id).length > 0;

    if (!isSuccess) {
      throw new InvariantError('Lagu gagal ditambahkan');
    }

    return id;
  }

  getSongs(){
    return this._songs;
  }

  getSongById(id){
    const song = this._songs.filter((s) => s.id === id)[0];

    if (!song) {
      throw new NotFoundError('Song gagal ditemukan');
    }

    return song;
  }

  editSongById(id, {name, year, genre, performer, duration}){
    const index = this._songs.findIndex((song) => song.id === id);
    
    if (index === -1) {
      throw new NotFoundError('Song gagal diperbarui. Id tidak ditemukan');
    }

    const updatedAt = new Date().toDateString();

    this._songs[index] = {
      ...this._songs[index],
      name, 
      year, 
      genre, 
      performer, 
      duration,
      updatedAt,
    }
  }

  deleteSongById(id){
    const index = this._songs.findIndex((song) => song.id === id);

    if (index === -1) {
      throw new NotFoundError('Song gagal dihapus. Id tidak ditemukan');
    }

    this._songs.splice(index, 1);
  }
}

module.exports = SongsService;
