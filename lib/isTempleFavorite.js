const isTempleFavorite = (user, templeId) => {
  let savedFavorite = false;
  if (user) {
    const favorites = Object.values(user.favorites);
    for (let favoriteId of favorites)
      if (favoriteId.equals(templeId)) savedFavorite = true;
  }
  return savedFavorite;
};

module.exports = isTempleFavorite;
