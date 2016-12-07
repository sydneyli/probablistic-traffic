all: long
long: long_build model
long_build:
	cp longModel.wppl compiled.wppl
model:
	cat modelHarness.wppl >> compiled.wppl
	cat modelAnalysis.wppl >> compiled.wppl
	cat commands.wppl >> compiled.wppl
	sed -e '/CODEHERE/ {' -e 'r compiled.wppl' -e 'd' -e '}' page.html > index.html
	rm compiled.wppl
clean:
	rm index.html
