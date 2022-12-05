const mapDBtoAlbumModel = ({
  id,
  name,
  year,
  created_at,
  updated_at,
}) => ({
  id,
  name,
  year,
  createdAt: created_at,
  updatedAt: updated_at,
});

const mapDBtoSongModel = ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  created_at,
  updated_at,
}) => ({
  id,
  title,
  year,
  genre,
  performer,
  duration,
  createdAt: created_at,
  updatedAt: updated_at,
});

module.exports = {mapDBtoAlbumModel, mapDBtoSongModel};
