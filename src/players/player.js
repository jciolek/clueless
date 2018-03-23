function Player({ id, name, isProtected = false }) {
  return {
    id,
    name,
    pieces: {},
    isProtected
  };
}

export default Player;
