export default function getHeader(sessionID) {
  return { headers: { Authorization: `session ${sessionID}` } };
}
