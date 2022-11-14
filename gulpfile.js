const fs = require("fs");
const { src, dest, watch, series } = require("gulp");
const nunjucksRender = require("gulp-nunjucks-render");

function nunjucks(cb) {
	src("src/*.html")
		.pipe(nunjucksRender({ path: "src/" }))
		.pipe(dest("dist/"));
	cb();
}

function css(cb) {
	// const styles = fs.readdirSync("src/styles");
	const styleSheets = ["base"];
	let styleRules = "";
	styleSheets.forEach((styleSheet) => {
		const comment = `
/*************************

	${styleSheet}
				
**************************/
`;
		styleRules +=
			comment +
			fs.readFileSync(`src/styles/${styleSheet}.css`, {
				encoding: "utf-8",
			});
	});
	fs.writeFileSync("dist/style.css", styleRules);
	cb();
}

function js(cb) {
	src("src/scripts/*").pipe(dest("dist/"));
	cb();
}

exports.default = function () {
	// watch("src/*.html", nunjucks);
	watch(
		["src/*.html", "src/styles/*", "src/scripts/*"],
		series(css, js, nunjucks)
	);
};
