/** Gets the param from either the query string
 * or body of request
 */
module.exports.getQueryOrBodyParam = (req, param) => {
  const { query, body } = req;
  if (query[param]) {
    return query[param]
  }
  if (body && body[param]) {
    return body[param]
  }
}