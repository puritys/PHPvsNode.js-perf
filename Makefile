TEST_TIMES=20

TMP_REPORT_FORMAT=real=%E, user=%U, sys=%S, PercentageCPU=%P maxMem=%M Kbytes

test:
	gmake run script=echo

run:
	echo "Text $(script).js"
	time -o timeResult.js -f "$(TMP_REPORT_FORMAT)" csh -c " repeat $(TEST_TIMES) $(NODE_BIN) src/$(script).js 1>/dev/null"
	echo "Text $(script).php"
	time -o timeResult.php -f "$(TMP_REPORT_FORMAT)" csh -c " repeat $(TEST_TIMES) $(PHP_BIN) src/$(script).php 1>/dev/null"

