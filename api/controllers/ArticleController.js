/**
 * ArticleController
 *
 * @description :: Server-side logic for managing articles
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	hi: function (req, res) {
	 return res.send("Hi there!");
 },
 bye: function (req, res) {
	 return res.redirect("http://www.sayonara.com");
 },
 customquery: function(req, res) {
	 Article.query('SELECT article.title FROM article', function(err, results) {
		 if (err) return res.serverError(err);
		 return res.ok(results.rows);
	 });
 },
 text: function (req, res) {
	 // ...
	 Article.query('SELECT article.xml FROM article where article.id = 3', function(err, results) {
		if (err) return res.serverError(err);
		// return res.ok(results.rows);
		return res.view('articletext', {
			xml: results.rows[0].xml,
			test: 'jo'
		});
	});

 },
};
