all:
	sed -e '/CODEHERE/ {' -e 'r traffic.wppl' -e 'd' -e '}' page.html > index.html
	open index.html
clean:
	rm index.html



