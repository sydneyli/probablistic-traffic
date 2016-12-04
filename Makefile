all: standard
long: long_build model
standard: standard_build model
long_build:
	cp longModel.wppl compiled.wppl
standard_build:
	cp traffic.wppl compiled.wppl
model:
	cat modelAnalysis.wppl >> compiled.wppl
	cat commands.wppl >> compiled.wppl
	sed -e '/CODEHERE/ {' -e 'r compiled.wppl' -e 'd' -e '}' page.html > index.html
	rm compiled.wppl
clean:
	rm index.htmlj
