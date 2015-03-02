TEST_TIMES=20

TMP_REPORT_FORMAT=real=%E, user=%U, sys=%S, PercentageCPU=%P maxMem=%M Kbytes

test:
	gmake run script=array
#	gmake d8_run script=array
	gmake iojs_run script=array
#	gmake run script=echo
#	gmake d8_run script=print

run:
	echo "Text $(script).js"
	time -o timeResult.node -f "$(TMP_REPORT_FORMAT)" csh -c " repeat $(TEST_TIMES) $(NODE_BIN) src/$(script).js 1>/dev/null"
	echo "Text $(script).php"
	time -o timeResult.php -f "$(TMP_REPORT_FORMAT)" csh -c " repeat $(TEST_TIMES) $(PHP_BIN) src/$(script).php 1>/dev/null"


d8_run:
	time -o timeResult.v8 -f "$(TMP_REPORT_FORMAT)" csh -c " repeat $(TEST_TIMES) $(D8_BIN) src/$(script).js 1>/dev/null"

iojs_run:
	time -o timeResult.io -f "$(TMP_REPORT_FORMAT)" csh -c " repeat $(TEST_TIMES) $(IOJS_BIN) src/$(script).js 1>/dev/null"

