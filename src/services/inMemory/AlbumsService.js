const { nanoid } = require("nanoid");

class AlbumService {
  constructor(){
    this._albums = [];
  }

  addAlbum({ name, year }){
    const id = nanoid(16);
    const createdAt = new Date().toISOString();
    const updatedAt = createdAt;

    const newAlbum = {
      name, year, id, createdAt, updatedAt,
    };

    this._albums.push(newAlbum);

    const isSuccess = this._albums.filter((album) => album.id === id).length > 0;

    if (!isSuccess){
      throw new Error('Album gagal ditambahkan');
    }

    return id;
  }

  getAlbums(){
    return this._albums;
  }

  getAlbumById(id){
    const album = this._albums.filter((a) => a.id === id)[0];

    if (!album){
      throw new Error('Album gagal ditemukan');
    }

    return album;
  }

  editAlbumById(id, {name, year}){
    console.log(id);
    const index = this._albums.findIndex((album) => album.id === id);
    console.log(index);

    if (index === -1){
      throw new Error('Album gagal diperbarui. Id tidak ditemukan');
    }

    const updatedAt = new Date().toDateString();

    this._albums[index] = {
      ...this._albums[index],
      name,
      year,
      updatedAt,
    }
  }

  deleteAlbumById(id){
    const index = this._albums.findIndex((album) => album.id === id);

    if (index === -1){
      throw new Error('Album gagal dihapus. Id tidak ditemukan');
    }

    this._albums.splice(index, 1);
  }
}

module.exports = AlbumService;