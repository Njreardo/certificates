/*** Generated by streamline 0.10.17 (generators) - DO NOT EDIT ***/var galaxy = require("streamline/lib/generators/runtime");(function(){})();(galaxy.unstar(function*(_) {var delay_ = galaxy.unstar(delay, 0), delayFail_ = galaxy.unstar(delayFail, 0); QUnit.module(module.id);
var flows = require("streamline/lib/util/flows");

function* delay(_, val) {
	(yield galaxy.invoke(flows, "nextTick", [_], 0));
	return val;
}

function* delayFail(_, err) {
	(yield galaxy.invoke(flows, "nextTick", [_], 0));
	throw err;
}

function sparse() {
	var a = [];
	a[3] = 33;
	a[4] = 44;
	a[9] = 99;
	return a;
}

function dump(a) {
	return a.reduce(function(s, v) {
		return s + '/' + v;
	}, '');
}

asyncTest("each", 7, galaxy.unstar(function*(_) {
	var result = 1;
	(yield galaxy.invoke(flows, "each", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, val) {
		result = result * (yield delay(_, val));
	}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield galaxy.invoke([1, 2, 3, 4], "forEach_", [_, galaxy.unstar(function*(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield galaxy.invoke([1, 2, 3, 4], "forEach_", [_, 2, galaxy.unstar(function*(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield galaxy.invoke([1, 2, 3, 4], "forEach_", [_, {
		parallel: 2
	}, galaxy.unstar(function*(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	}, 0)], 0));
	strictEqual(result, 24);
	result = 1;
	(yield galaxy.invoke([1, 2, 3, 4], "forEach_", [_, -1, galaxy.unstar(function*(_, val) {
		var v = (yield delay(_, val));
		result = result * v;
	}, 0)], 0));
	strictEqual(result, 24);
	result = '';
	(yield galaxy.invoke(sparse(), "forEach_", [_, galaxy.unstar(function*(_, val, i) {
		var v = (yield delay(_, val));
		result = result + '/' + i + ':' + v;
	}, 0)], 0));
	strictEqual(result, '/3:33/4:44/9:99');
	result = '';
	(yield galaxy.invoke(sparse(), "forEach_", [_, -1, galaxy.unstar(function*(_, val, i) {
		var v = (yield delay(_, val));
		result = result + '/' + i + ':' + v;
	}, 0)], 0));
	strictEqual(result, '/3:33/4:44/9:99');
	start();
}, 0));
asyncTest("map", 9, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "map", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, val) {
		return 2 * (yield delay(_, val));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "map_", [_, galaxy.unstar(function*(_, val) {
		return 2 * (yield delay(_, val));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "map_", [_, 2, galaxy.unstar(function*(_, val) {
		return 2 * (yield delay(_, val));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "map_", [_, {
		parallel: 2
	}, galaxy.unstar(function*(_, val) {
		return 2 * (yield delay(_, val));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "map_", [_, -1, galaxy.unstar(function*(_, val) {
		return 2 * (yield delay(_, val));
	}, 0)], 0));
	deepEqual(result, [2, 4, 6, 8]);
	result = (yield galaxy.invoke(sparse(), "map_", [_, galaxy.unstar(function*(_, val, i) {
		var v = (yield delay(_, val));
		return i + ':' + v;
	}, 0)], 0));
	strictEqual(result.length, 10);
	strictEqual(dump(result), '/3:33/4:44/9:99');
	result = (yield galaxy.invoke(sparse(), "map_", [_, -1, galaxy.unstar(function*(_, val, i) {
		var v = (yield delay(_, val));
		return i + ':' + v;
	}, 0)], 0));
	strictEqual(result.length, 10);
	strictEqual(dump(result), '/3:33/4:44/9:99');
	start();
}, 0));
asyncTest("filter", 9, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "filter", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) % 2;
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "filter_", [_, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) % 2;
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "filter_", [_, 2, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) % 2;
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "filter_", [_, {
		parallel: 2
	}, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) % 2;
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "filter_", [_, -1, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) % 2;
	}, 0)], 0));
	deepEqual(result, [1, 3]);
	result = (yield galaxy.invoke(sparse(), "filter_", [_, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) % 2;
	}, 0)], 0));
	strictEqual(result.length, 2);
	deepEqual(result, [33, 99]);
	result = (yield galaxy.invoke(sparse(), "filter_", [_, -1, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) % 2;
	}, 0)], 0));
	strictEqual(result.length, 2);
	deepEqual(result, [33, 99]);
	start();
}, 0));
asyncTest("every true", 7, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "every", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 5;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 5;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, 2, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 5;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, {
		parallel: 2
	}, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 5;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, -1, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 5;
	}, 0)], 0));
	strictEqual(result, true);
	result = (yield galaxy.invoke(sparse(), "every_", [_, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) > 30;
	}, 0)], 0));
	strictEqual(result, true);
	result = (yield galaxy.invoke(sparse(), "every_", [_, -1, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) > 30;
	}, 0)], 0));
	strictEqual(result, true);
	start();
}, 0));
asyncTest("every false", 7, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "every", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, 2, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, {
		parallel: 2
	}, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "every_", [_, -1, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, false);
	result = (yield galaxy.invoke(sparse(), "every_", [_, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) > 40;
	}, 0)], 0));
	strictEqual(result, false);
	result = (yield galaxy.invoke(sparse(), "every_", [_, -1, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) > 40;
	}, 0)], 0));
	strictEqual(result, false);
	start();
}, 0));
asyncTest("some true", 7, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "some", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, 2, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, {
		parallel: 2
	}, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, true);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, -1, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 3;
	}, 0)], 0));
	strictEqual(result, true);
	result = (yield galaxy.invoke(sparse(), "some_", [_, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) > 30;
	}, 0)], 0));
	strictEqual(result, true);
	result = (yield galaxy.invoke(sparse(), "some_", [_, -1, galaxy.unstar(function*(_, val, i) {
		return (yield delay(_, val)) > 30;
	}, 0)], 0));
	strictEqual(result, true);
	start();
}, 0));
asyncTest("some false", 7, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "some", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 0;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 0;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, 2, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 0;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, {
		parallel: 2
	}, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 0;
	}, 0)], 0));
	strictEqual(result, false);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "some_", [_, -1, galaxy.unstar(function*(_, val) {
		return (yield delay(_, val)) < 0;
	}, 0)], 0));
	strictEqual(result, false);
	result = (yield galaxy.invoke(sparse(), "some_", [_, galaxy.unstar(function*(_, val, i) {
		return !((yield delay(_, val)) > 20);
	}, 0)], 0));
	strictEqual(result, false);
	result = (yield galaxy.invoke(sparse(), "some_", [_, -1, galaxy.unstar(function*(_, val, i) {
		return !((yield delay(_, val)) > 20);
	}, 0)], 0));
	strictEqual(result, false);
	start();
}, 0));
asyncTest("reduce", 3, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "reduce", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, v, val) {
		return v * (yield delay(_, val));
	}, 0), 1], 0));
	strictEqual(result, 24);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "reduce_", [_, galaxy.unstar(function*(_, v, val) {
		return v * (yield delay(_, val));
	}, 0), 1], 0));
	strictEqual(result, 24);
	var result = (yield galaxy.invoke(sparse(), "reduce_", [_, galaxy.unstar(function*(_, v, val) {
		return v + '/' + (yield delay(_, val));
	}, 0), ''], 0));
	strictEqual(result, '/33/44/99');
	start();
}, 0));
asyncTest("reduceRight", 3, galaxy.unstar(function*(_) {
	var result = (yield galaxy.invoke(flows, "reduceRight", [_, [1, 2, 3, 4], galaxy.unstar(function*(_, v, val) {
		return v * (yield delay(_, val));
	}, 0), 1], 0));
	strictEqual(result, 24);
	var result = (yield galaxy.invoke([1, 2, 3, 4], "reduceRight_", [_, galaxy.unstar(function*(_, v, val) {
		return v * (yield delay(_, val));
	}, 0), 1], 0));
	strictEqual(result, 24);
	var result = (yield galaxy.invoke(sparse(), "reduceRight_", [_, galaxy.unstar(function*(_, v, val) {
		return v + '/' + (yield delay(_, val));
	}, 0), ''], 0));
	strictEqual(result, '/99/44/33');
	start();
}, 0));
asyncTest("sort", 4, galaxy.unstar(function*(_) {
	var array = [1, 2, 3, 4];
	(yield galaxy.invoke(flows, "sort", [_, array, galaxy.unstar(function*(_, a, b) {
		return (yield delay(_, a - b));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "In order array sort ok");
	(yield galaxy.invoke(array, "sort_", [_, galaxy.unstar(function*(_, a, b) {
		return (yield delay(_, a - b));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "In order array sort ok");
	array = [4, 3, 2, 1];
	(yield galaxy.invoke(array, "sort_", [_, galaxy.unstar(function*(_, a, b) {
		return (yield delay(_, a - b));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "Reverse array sort ok");
	array = [3, 1, 2, 4];
	(yield galaxy.invoke(array, "sort_", [_, galaxy.unstar(function*(_, a, b) {
		return (yield delay(_, a - b));
	}, 0)], 0));
	deepEqual(array, [1, 2, 3, 4], "Random array sort ok");
	start();
}, 0));
asyncTest("collectAll", 4, galaxy.unstar(function*(_) {
	var total = 0;
	var peak = 0;
	var count = 0;

	function doIt(i) {
		return galaxy.unstar(function*(_) {
			count++;
			peak = Math.max(count, peak);
			total = (yield delay(_, i)) + total;
			count--;
			return 2 * i;
		}, 0);
	}

	var results = (yield galaxy.invoke(flows.spray([doIt(1), doIt(2), doIt(3)]), "collectAll", [_], 0));
	equal(total, 6);
	ok(peak >= 2);
	equal(count, 0);
	deepEqual(results, [2, 4, 6]);
	start();
}, 0));
asyncTest("collectOne", 4, galaxy.unstar(function*(_) {
	var total = 0;
	var peak = 0;
	var count = 0;

	function doIt(i) {
		return galaxy.unstar(function*(_) {
			count++;
			peak = Math.max(count, peak);
			total = (yield delay(_, i)) + total;
			count--;
			return 2 * i;
		}, 0);
	}

	var result = (yield galaxy.invoke(flows.spray([doIt(1), doIt(2), doIt(3)]), "collectOne", [_], 0));
	ok(total == 1 || total == 2);
	ok(peak >= 2);
	ok(count > 0);
	ok(result == 2 || result == 4);
	start();
}, 0));
asyncTest("collectAll with limit", 1, galaxy.unstar(function*(_) {
	var total = 0;
	var peak = 0;
	var count = 0;

	function doIt(i) {
		return galaxy.unstar(function*(_) {
			count++;
			peak = Math.max(count, peak);
			total = (yield delay(_, i)) + total;
			count--;
			return 2 * i;
		}, 0);
	}

	var results = (yield galaxy.invoke(flows.spray([doIt(1), doIt(2), doIt(3)], 2), "collectAll", [_], 0));
	deepEqual([total, peak, count, results], [6, 2, 0, [2, 4, 6]]);
	start();
}, 0));
asyncTest("contexts", 3, galaxy.unstar(function*(_) {var testContext_ = galaxy.unstar(testContext, 0);
	function* testContext(_, x) {
		flows.setContext({
			val: x
		});
		var y = (yield delay(_, 2 * x));
		strictEqual(y, 2 * flows.getContext().val);
		return y + 1;
	}

	var result = (yield galaxy.invoke(flows.spray([

	galaxy.unstar(function*(_) {
		return (yield testContext(_, 3));
	}, 0),

	galaxy.unstar(function*(_) {
		return (yield testContext(_, 5));
	}, 0)

	]), "collectAll", [_], 0));
	deepEqual(result, [7, 11]);
	start();
}, 0));

asyncTest("futures multiplex", 3, galaxy.unstar(function*(_) {var doIt_ = galaxy.unstar(doIt, 1);
	var result1 = 0;
	var result2 = 0;
	var result3 = 0;

	function* doIt(future, _) {
		result1 = (yield galaxy.invoke(null, future, [_], 0)) + result1;
		result2 = (yield galaxy.invoke(null, future, [_], 0)) + result2;
		(yield delay(_));
		result3 = (yield galaxy.invoke(null, future, [_], 0)) + result3;
	}

	var f1 = delay_(false, 1);
	var f10 = delay_(false, 10);

	(yield galaxy.invoke(flows, "collect", [_, [doIt_(f1, false), doIt_(f10, false), doIt_(f1, false)]], 0));

	deepEqual(result1, 12);
	deepEqual(result2, 12);
	deepEqual(result3, 12);
	start();
}, 0));

asyncTest("trampoline", 1, galaxy.unstar(function*(_) {var sums_ = galaxy.unstar(sums, 0);
	function* sums(_, n) {
		var fn = galaxy.unstar(function*(_) {
			return n > 0 ? n + (yield sums(_, n - 1)) : 0;
		}, 0);
		if (n % 1000 === 0) return (yield galaxy.invoke(flows, "trampoline", [_, fn], 0));
		else return (yield (fn.__starred__0 || 0)(_));
	}
	equals((yield sums(_, 100000)), 50000 * 100001);
	start();
}, 0));

asyncTest("trampoline preserves context", 2, galaxy.unstar(function*(_) {
	var globals = require('streamline/lib/globals');
	var fn = galaxy.unstar(function*(_) {
		return globals.context.val;
	}, 0);
	globals.context.val = "abc";
	var result = (yield galaxy.invoke(flows, "trampoline", [_, fn], 0));
	strictEqual(result, "abc");
	strictEqual(globals.context.val, "abc");
	start();
}, 0));
}, 0).call(this, function(err) {
  if (err) throw err;
}));