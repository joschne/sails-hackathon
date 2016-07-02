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



		Article.query('SELECT article.xml FROM article where article.id = ' + req.param('id'), function(err, results) {



			if (err) return res.serverError(err);

			if (!results.rows[0]) return res.notFound();

			//Transform xml to html
			var libxslt = require('libxslt');
			var libxmljs = libxslt.libxmljs;

			var stylesheetObj = libxmljs.parseXml('<?xml version="1.0" encoding="UTF-8"?><xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">     <xsl:template match="tag">        <link-popover hds-url="{@hds}" hds-unordered-urls="{@hds_unordered}" dbpedia-url="{@d_dbpedia}" wikipedia-url="{@d_wiki}" label="{.}">         <xsl:value-of select="."/>        </link-popover>    </xsl:template> </xsl:stylesheet>', { nocdata: true });
			var stylesheet = libxslt.parse(stylesheetObj);

			var document = libxmljs.parseXml(results.rows[0].xml);
			stylesheet.apply(document, function(err, result){
				console.log();
				// return res.ok(results.rows);
				return res.view('articletext', {
					xml: result.toString(),
					test: 'jo'
				});
				// result is now a libxmljs document containing the result of the transformation
			});
		});

	},
};
