export const adaptToClient = (user) => {
  const adaptedUser = Object.assign({}, user, {
    avatarUrl: user.avatar_url
  });

  delete adaptedUser.avatar_url;
  return adaptedUser;
};
