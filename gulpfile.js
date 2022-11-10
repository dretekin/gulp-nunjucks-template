const fs = require("fs");
const { src, dest, watch, series } = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");

function nunjucks(cb) {
	src("src/index.html")
		.pipe(nunjucksRender({ path: "src/" }))
		.pipe(dest("dist/"));
	cb();
}

function css(cb) {
	const styles = fs.readdirSync("src/styles");
	let stylesRules = "";
	styles.forEach((style) => {
		stylesRules += fs.readFileSync(`src/styles/${style}`, {
			encoding: "utf-8",
		});
	});
	fs.writeFileSync("dist/style.css", stylesRules);
	cb();
}

exports.default = function () {
	// watch("src/*.html", nunjucks);
	watch(["src/*.html", "src/styles/*"], series(css, nunjucks));
};
