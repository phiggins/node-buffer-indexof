'use strict';
var test = require('tape')
var bindexOf = require('../')

var b = new Buffer('abcdef');
var buf_a = new Buffer('a');
var buf_bc = new Buffer('bc');
var buf_f = new Buffer('f');
var buf_z = new Buffer('z');
var buf_empty = new Buffer('');

test('node 6 buffer indexOf tests', function(t) {
  t.equal(bindexOf(b, 'a'), 0);
  t.equal(bindexOf(b, 'a', 1), -1);
  t.equal(bindexOf(b, 'a', -1), -1);
  t.equal(bindexOf(b, 'a', -4), -1);
  t.equal(bindexOf(b, 'a', -b.length), 0);
  t.equal(bindexOf(b, 'a', NaN), 0);
  t.equal(bindexOf(b, 'a', -Infinity), 0);
  t.equal(bindexOf(b, 'a', Infinity), -1);
  t.equal(bindexOf(b, 'bc'), 1);
  t.equal(bindexOf(b, 'bc', 2), -1);
  t.equal(bindexOf(b, 'bc', -1), -1);
  t.equal(bindexOf(b, 'bc', -3), -1);
  t.equal(bindexOf(b, 'bc', -5), 1);
  t.equal(bindexOf(b, 'bc', NaN), 1);
  t.equal(bindexOf(b, 'bc', -Infinity), 1);
  t.equal(bindexOf(b, 'bc', Infinity), -1);
  t.equal(bindexOf(b, 'f'), b.length - 1);
  t.equal(bindexOf(b, 'z'), -1);
  t.equal(bindexOf(b, ''), -1);
  t.equal(bindexOf(b, '', 1), -1);
  t.equal(bindexOf(b, '', b.length + 1), -1);
  t.equal(bindexOf(b, '', Infinity), -1);
  t.equal(bindexOf(b, buf_a), 0);
  t.equal(bindexOf(b, buf_a, 1), -1);
  t.equal(bindexOf(b, buf_a, -1), -1);
  t.equal(bindexOf(b, buf_a, -4), -1);
  t.equal(bindexOf(b, buf_a, -b.length), 0);
  t.equal(bindexOf(b, buf_a, NaN), 0);
  t.equal(bindexOf(b, buf_a, -Infinity), 0);
  t.equal(bindexOf(b, buf_a, Infinity), -1);
  t.equal(bindexOf(b, buf_bc), 1);
  t.equal(bindexOf(b, buf_bc, 2), -1);
  t.equal(bindexOf(b, buf_bc, -1), -1);
  t.equal(bindexOf(b, buf_bc, -3), -1);
  t.equal(bindexOf(b, buf_bc, -5), 1);
  t.equal(bindexOf(b, buf_bc, NaN), 1);
  t.equal(bindexOf(b, buf_bc, -Infinity), 1);
  t.equal(bindexOf(b, buf_bc, Infinity), -1);
  t.equal(bindexOf(b, buf_f), b.length - 1);
  t.equal(bindexOf(b, buf_z), -1);
  t.equal(bindexOf(b, buf_empty), -1);
  t.equal(bindexOf(b, buf_empty, 1), -1);
  t.equal(bindexOf(b, buf_empty, b.length + 1), -1);
  t.equal(bindexOf(b, buf_empty, Infinity), -1);
  t.equal(bindexOf(b, 0x61), 0);
  t.equal(bindexOf(b, 0x61, 1), -1);
  t.equal(bindexOf(b, 0x61, -1), -1);
  t.equal(bindexOf(b, 0x61, -4), -1);
  t.equal(bindexOf(b, 0x61, -b.length), 0);
  t.equal(bindexOf(b, 0x61, NaN), 0);
  t.equal(bindexOf(b, 0x61, -Infinity), 0);
  t.equal(bindexOf(b, 0x61, Infinity), -1);
  t.equal(bindexOf(b, 0x0), -1);

  // test offsets
  t.equal(bindexOf(b, 'd', 2), 3);
  t.equal(bindexOf(b, 'f', 5), 5);
  t.equal(bindexOf(b, 'f', -1), 5);
  t.equal(bindexOf(b, 'f', 6), -1);

  t.equal(bindexOf(b, new Buffer('d'), 2), 3);
  t.equal(bindexOf(b, new Buffer('f'), 5), 5);
  t.equal(bindexOf(b, new Buffer('f'), -1), 5);
  t.equal(bindexOf(b, new Buffer('f'), 6), -1);

  // This one doesn't make any sense
  // t.equal(bindexOf(new Buffer('ff'), new Buffer('f'), 1, 'ucs2'), -1);

  // test hex encoding
  t.equal(
    bindexOf(
      new Buffer(b.toString('hex'), 'hex'),
      '64',
      0,
      'hex'
    ),
    3
  );
  t.equal(
    bindexOf(
      new Buffer(b.toString('hex'), 'hex'),
      new Buffer('64', 'hex'), 0, 'hex'
    ),
    3
  );

  // test base64 encoding
  t.equal(
    bindexOf(
      new Buffer(b.toString('base64'), 'base64'),
      'ZA==', 0, 'base64'
    ),
    3
  );
  t.equal(
    bindexOf(
      new Buffer(b.toString('base64'), 'base64'),
      new Buffer('ZA==', 'base64'), 0, 'base64'
    ),
    3
  );

  // test ascii encoding
  t.equal(
    bindexOf(
      new Buffer(b.toString('ascii'), 'ascii'),
      'd', 0, 'ascii'
    ),
    3
  );
  t.equal(
    bindexOf(
      new Buffer(b.toString('ascii'), 'ascii'),
      new Buffer('d', 'ascii'), 0, 'ascii'
    ),
    3
  );

  // test latin1 encoding
  t.equal(
    bindexOf(
      new Buffer(b.toString('latin1'), 'latin1'),
      'd',
      0,
      'latin1'
    ),
    3
  );
  t.equal(
    bindexOf(
      new Buffer(b.toString('latin1'), 'latin1'),
      new Buffer('d', 'latin1'),
      0,
      'latin1'
    ),
    3
  );
  t.equal(
    bindexOf(
      new Buffer('aa\u00e8aa', 'latin1'),
      '\u00e8',
      'latin1'
    ),
    2
  );
  t.equal(
    bindexOf(
      new Buffer('\u00e8', 'latin1'),
      '\u00e8',
      'latin1'
    ),
    0
  );
  t.equal(
    bindexOf(
      new Buffer('\u00e8', 'latin1'),
      new Buffer('\u00e8', 'latin1'),
      0,
      'latin1'
    ),
    0
  );

  // test binary encoding
  t.equal(
    bindexOf(
      new Buffer(b.toString('binary'), 'binary'),
      'd',
      0,
      'binary'
    ),
    3
  );
  t.equal(
    bindexOf(
      new Buffer(b.toString('binary'), 'binary'),
      new Buffer('d', 'binary'),
      0,
      'binary'
    ),
    3
  );
  t.equal(
    bindexOf(
      new Buffer('aa\u00e8aa', 'binary'),
      '\u00e8',
      0,
      'binary'
    ),
    2
  );
  t.equal(
    bindexOf(
      new Buffer('\u00e8', 'binary'),
      '\u00e8',
      0,
      'binary'
    ),
    0
  );
  t.equal(
    bindexOf(
      new Buffer('\u00e8', 'binary'),
      new Buffer('\u00e8', 'binary'),
      0,
      'binary'
    ),
    0
  );


  // test optional offset with passed encoding
  t.equal(new Buffer('aaaa0').indexOf('30', 'hex'), 4);
  t.equal(new Buffer('aaaa00a').indexOf('3030', 'hex'), 4);

  {
    // test usc2 encoding
    var twoByteString = new Buffer('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

    t.equal(8, twoByteString.indexOf('\u0395', 4, 'ucs2'));
    t.equal(6, twoByteString.indexOf('\u03a3', -4, 'ucs2'));
    t.equal(4, twoByteString.indexOf('\u03a3', -6, 'ucs2'));
    t.equal(4, twoByteString.indexOf(
      new Buffer('\u03a3', 'ucs2'), -6, 'ucs2'));
    t.equal(-1, twoByteString.indexOf('\u03a3', -2, 'ucs2'));
  }

  var mixedByteStringUcs2 =
      new Buffer('\u039a\u0391abc\u03a3\u03a3\u0395', 'ucs2');
  t.equal(6, mixedByteStringUcs2.indexOf('bc', 0, 'ucs2'));
  t.equal(10, mixedByteStringUcs2.indexOf('\u03a3', 0, 'ucs2'));
  t.equal(-1, mixedByteStringUcs2.indexOf('\u0396', 0, 'ucs2'));

  t.equal(
      6, mixedByteStringUcs2.indexOf(new Buffer('bc', 'ucs2'), 0, 'ucs2'));
  t.equal(
      10, mixedByteStringUcs2.indexOf(new Buffer('\u03a3', 'ucs2'), 0, 'ucs2'));
  t.equal(
      -1, mixedByteStringUcs2.indexOf(new Buffer('\u0396', 'ucs2'), 0, 'ucs2'));

  {
    var twoByteString = new Buffer('\u039a\u0391\u03a3\u03a3\u0395', 'ucs2');

    // Test single char pattern
    t.equal(0, twoByteString.indexOf('\u039a', 0, 'ucs2'));
    t.equal(2, twoByteString.indexOf('\u0391', 0, 'ucs2'), 'Alpha');
    t.equal(4, twoByteString.indexOf('\u03a3', 0, 'ucs2'), 'First Sigma');
    t.equal(6, twoByteString.indexOf('\u03a3', 6, 'ucs2'), 'Second Sigma');
    t.equal(8, twoByteString.indexOf('\u0395', 0, 'ucs2'), 'Epsilon');
    t.equal(-1, twoByteString.indexOf('\u0392', 0, 'ucs2'), 'Not beta');

    // Test multi-char pattern
    t.equal(
        0, twoByteString.indexOf('\u039a\u0391', 0, 'ucs2'), 'Lambda Alpha');
    t.equal(
        2, twoByteString.indexOf('\u0391\u03a3', 0, 'ucs2'), 'Alpha Sigma');
    t.equal(
        4, twoByteString.indexOf('\u03a3\u03a3', 0, 'ucs2'), 'Sigma Sigma');
    t.equal(
        6, twoByteString.indexOf('\u03a3\u0395', 0, 'ucs2'), 'Sigma Epsilon');
  }

  var mixedByteStringUtf8 = new Buffer('\u039a\u0391abc\u03a3\u03a3\u0395');
  t.equal(5, mixedByteStringUtf8.indexOf('bc'));
  t.equal(5, mixedByteStringUtf8.indexOf('bc', 5));
  t.equal(5, mixedByteStringUtf8.indexOf('bc', -8));
  t.equal(7, mixedByteStringUtf8.indexOf('\u03a3'));
  t.equal(-1, mixedByteStringUtf8.indexOf('\u0396'));


  // Test complex string indexOf algorithms. Only trigger for long strings.
  // Long string that isn't a simple repeat of a shorter string.
  var longString = 'A';
  for (var i = 66; i < 76; i++) {  // from 'B' to 'K'
    longString = longString + String.fromCharCode(i) + longString;
  }

  var longBufferString = new Buffer(longString);

  // pattern of 15 chars, repeated every 16 chars in long
  var pattern = 'ABACABADABACABA';
  for (var i = 0; i < longBufferString.length - pattern.length; i += 7) {
    var index = longBufferString.indexOf(pattern, i);
    t.equal((i + 15) & ~0xf, index, 'Long ABACABA...-string at index ' + i);
  }
  t.equal(510, longBufferString.indexOf('AJABACA'), 'Long AJABACA, First J');
  t.equal(
      1534, longBufferString.indexOf('AJABACA', 511), 'Long AJABACA, Second J');

  pattern = 'JABACABADABACABA';
  t.equal(
      511, longBufferString.indexOf(pattern), 'Long JABACABA..., First J');
  t.equal(
      1535, longBufferString.indexOf(pattern, 512), 'Long JABACABA..., Second J');

  // Search for a non-ASCII string in a pure ASCII string.
  var asciiString = new Buffer(
      'arglebargleglopglyfarglebargleglopglyfarglebargleglopglyf');
  t.equal(-1, asciiString.indexOf('\x2061'));
  t.equal(3, asciiString.indexOf('leb', 0));

  // Search in string containing many non-ASCII chars.
  var allCodePoints = [];
  for (var i = 0; i < 65536; i++) allCodePoints[i] = i;
  var allCharsString = String.fromCharCode.apply(String, allCodePoints);
  var allCharsBufferUtf8 = new Buffer(allCharsString);
  var allCharsBufferUcs2 = new Buffer(allCharsString, 'ucs2');

  // Search for string long enough to trigger complex search with ASCII pattern
  // and UC16 subject.
  t.equal(-1, allCharsBufferUtf8.indexOf('notfound'));
  t.equal(-1, allCharsBufferUcs2.indexOf('notfound'));

  // Needle is longer than haystack, but only because it's encoded as UTF-16
  t.equal(new Buffer('aaaa').indexOf('a'.repeat(4), 'ucs2'), -1);

  t.equal(new Buffer('aaaa').indexOf('a'.repeat(4), 'utf8'), 0);
  t.equal(new Buffer('aaaa').indexOf('你好', 'ucs2'), -1);

  // Haystack has odd length, but the needle is UCS2.
  t.equal(new Buffer('aaaaa').indexOf('b', 'ucs2'), -1);

  {
    // Find substrings in Utf8.
    var lengths = [1, 3, 15];  // Single char, simple and complex.
    var indices = [0x5, 0x60, 0x400, 0x680, 0x7ee, 0xFF02, 0x16610, 0x2f77b];
    for (var lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i];
        var length = lengths[lengthIndex];

        if (index + length > 0x7F) {
          length = 2 * length;
        }

        if (index + length > 0x7FF) {
          length = 3 * length;
        }

        if (index + length > 0xFFFF) {
          length = 4 * length;
        }

        var patternBufferUtf8 = allCharsBufferUtf8.slice(index, index + length);
        t.equal(index, allCharsBufferUtf8.indexOf(patternBufferUtf8));

        var patternStringUtf8 = patternBufferUtf8.toString();
        t.equal(index, allCharsBufferUtf8.indexOf(patternStringUtf8));
      }
    }
  }

  {
    // Find substrings in Usc2.
    var lengths = [2, 4, 16];  // Single char, simple and complex.
    var indices = [0x5, 0x65, 0x105, 0x205, 0x285, 0x2005, 0x2085, 0xfff0];
    for (var lengthIndex = 0; lengthIndex < lengths.length; lengthIndex++) {
      for (var i = 0; i < indices.length; i++) {
        var index = indices[i] * 2;
        var length = lengths[lengthIndex];

        var patternBufferUcs2 =
            allCharsBufferUcs2.slice(index, index + length);
        t.equal(
            index, allCharsBufferUcs2.indexOf(patternBufferUcs2, 0, 'ucs2'));

        var patternStringUcs2 = patternBufferUcs2.toString('ucs2');
        t.equal(
            index, allCharsBufferUcs2.indexOf(patternStringUcs2, 0, 'ucs2'));
      }
    }
  }

  t.throws(function() {
    bindexOf(b, function() { });
  });
  t.throws(function() {
    bindexOf(b, {});
  });
  t.throws(function() {
    bindexOf(b, []);
  });

  // All code for handling encodings is shared between Buffer.indexOf and
  // Buffer.lastIndexOf, so only testing the separate lastIndexOf semantics.

  // Test lastIndexOf basic functionality; Buffer b contains 'abcdef'.
  // lastIndexOf string:
  t.equal(b.lastIndexOf('a'), 0);
  t.equal(b.lastIndexOf('a', 1), 0);
  t.equal(b.lastIndexOf('b', 1), 1);
  t.equal(b.lastIndexOf('c', 1), -1);
  t.equal(b.lastIndexOf('a', -1), 0);
  t.equal(b.lastIndexOf('a', -4), 0);
  t.equal(b.lastIndexOf('a', -b.length), 0);
  t.equal(b.lastIndexOf('a', -b.length - 1), -1);
  t.equal(b.lastIndexOf('a', NaN), 0);
  // t.equal(b.lastIndexOf('a', -Infinity), -1);
  // t.equal(b.lastIndexOf('a', Infinity), 0);
  // lastIndexOf Buffer:
  t.equal(b.lastIndexOf(buf_a), 0);
  t.equal(b.lastIndexOf(buf_a, 1), 0);
  t.equal(b.lastIndexOf(buf_a, -1), 0);
  t.equal(b.lastIndexOf(buf_a, -4), 0);
  t.equal(b.lastIndexOf(buf_a, -b.length), 0);
  t.equal(b.lastIndexOf(buf_a, -b.length - 1), -1);
  t.equal(b.lastIndexOf(buf_a, NaN), 0);
  // t.equal(b.lastIndexOf(buf_a, -Infinity), -1);
  // t.equal(b.lastIndexOf(buf_a, Infinity), 0);
  t.equal(b.lastIndexOf(buf_bc), 1);
  t.equal(b.lastIndexOf(buf_bc, 2), 1);
  t.equal(b.lastIndexOf(buf_bc, -1), 1);
  t.equal(b.lastIndexOf(buf_bc, -3), 1);
  t.equal(b.lastIndexOf(buf_bc, -5), 1);
  t.equal(b.lastIndexOf(buf_bc, -6), -1);
  t.equal(b.lastIndexOf(buf_bc, NaN), 1);
  // t.equal(b.lastIndexOf(buf_bc, -Infinity), -1);
  // t.equal(b.lastIndexOf(buf_bc, Infinity), 1);
  t.equal(b.lastIndexOf(buf_f), b.length - 1);
  t.equal(b.lastIndexOf(buf_z), -1);
  t.equal(b.lastIndexOf(buf_empty), -1);
  t.equal(b.lastIndexOf(buf_empty, 1), -1);
  t.equal(b.lastIndexOf(buf_empty, b.length + 1), -1);
  // t.equal(b.lastIndexOf(buf_empty, Infinity), -1);
  // lastIndexOf number:
  t.equal(b.lastIndexOf(0x61), 0);
  t.equal(b.lastIndexOf(0x61, 1), 0);
  t.equal(b.lastIndexOf(0x61, -1), 0);
  t.equal(b.lastIndexOf(0x61, -4), 0);
  t.equal(b.lastIndexOf(0x61, -b.length), 0);
  t.equal(b.lastIndexOf(0x61, -b.length - 1), -1);
  t.equal(b.lastIndexOf(0x61, NaN), 0);
  // t.equal(b.lastIndexOf(0x61, -Infinity), -1);
  // t.equal(b.lastIndexOf(0x61, Infinity), 0);
  t.equal(b.lastIndexOf(0x0), -1);

  // Test weird offset arguments.
  // Behaviour should match String.lastIndexOf:
  t.equal(b.lastIndexOf('b', 0), -1);
  t.equal(b.lastIndexOf('b', undefined), 1);
  t.equal(b.lastIndexOf('b', null), -1);
  t.equal(b.lastIndexOf('b', {}), 1);
  t.equal(b.lastIndexOf('b', []), -1);
  t.equal(b.lastIndexOf('b', [2]), 1);

  // Test needles longer than the haystack.
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 'ucs2'), -1);
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 'utf8'), -1);
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 'latin1'), -1);
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 'binary'), -1);
  t.equal(b.lastIndexOf(new Buffer('aaaaaaaaaaaaaaa')), -1);
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 2, 'ucs2'), -1);
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 3, 'utf8'), -1);
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 5, 'latin1'), -1);
  t.equal(b.lastIndexOf('aaaaaaaaaaaaaaa', 5, 'binary'), -1);
  t.equal(b.lastIndexOf(new Buffer('aaaaaaaaaaaaaaa'), 7), -1);

  // 你好 expands to a total of 6 bytes using UTF-8 and 4 bytes using UTF-16
  t.equal(buf_bc.lastIndexOf('你好', 'ucs2'), -1);
  t.equal(buf_bc.lastIndexOf('你好', 'utf8'), -1);
  t.equal(buf_bc.lastIndexOf('你好', 'latin1'), -1);
  t.equal(buf_bc.lastIndexOf('你好', 'binary'), -1);
  t.equal(buf_bc.lastIndexOf(new Buffer('你好')), -1);
  t.equal(buf_bc.lastIndexOf('你好', 2, 'ucs2'), -1);
  t.equal(buf_bc.lastIndexOf('你好', 3, 'utf8'), -1);
  t.equal(buf_bc.lastIndexOf('你好', 5, 'latin1'), -1);
  t.equal(buf_bc.lastIndexOf('你好', 5, 'binary'), -1);
  t.equal(buf_bc.lastIndexOf(new Buffer('你好'), 7), -1);

  // Test lastIndexOf on a longer buffer:
  var bufferString = new Buffer('a man a plan a canal panama');
  t.equal(15, bufferString.lastIndexOf('canal'));
  t.equal(21, bufferString.lastIndexOf('panama'));
  t.equal(0, bufferString.lastIndexOf('a man a plan a canal panama'));
  t.equal(-1, bufferString.lastIndexOf('a man a plan a canal mexico'));
  t.equal(-1, bufferString.lastIndexOf('a man a plan a canal mexico city'));
  t.equal(-1, bufferString.lastIndexOf(new Buffer('a'.repeat(1000))));
  t.equal(0, bufferString.lastIndexOf('a man a plan', 4));
  t.equal(13, bufferString.lastIndexOf('a '));
  t.equal(13, bufferString.lastIndexOf('a ', 13));
  t.equal(6, bufferString.lastIndexOf('a ', 12));
  t.equal(0, bufferString.lastIndexOf('a ', 5));
  t.equal(13, bufferString.lastIndexOf('a ', -1));
  t.equal(0, bufferString.lastIndexOf('a ', -27));
  t.equal(-1, bufferString.lastIndexOf('a ', -28));

  // Test lastIndexOf for the case that the first character can be found,
  // but in a part of the buffer that does not make search to search
  // due do length constraints.
  var abInUCS2 = new Buffer('ab', 'ucs2');
  t.equal(-1, new Buffer('µaaaa¶bbbb', 'latin1').lastIndexOf('µ'));
  t.equal(-1, new Buffer('µaaaa¶bbbb', 'binary').lastIndexOf('µ'));
  t.equal(-1, new Buffer('bc').lastIndexOf('ab'));
  t.equal(-1, new Buffer('abc').lastIndexOf('qa'));
  t.equal(-1, new Buffer('abcdef').lastIndexOf('qabc'));
  t.equal(-1, new Buffer('bc').lastIndexOf(new Buffer('ab')));
  t.equal(-1, new Buffer('bc', 'ucs2').lastIndexOf('ab', 'ucs2'));
  t.equal(-1, new Buffer('bc', 'ucs2').lastIndexOf(abInUCS2));

  t.equal(0, new Buffer('abc').lastIndexOf('ab'));
  t.equal(0, new Buffer('abc').lastIndexOf('ab', 1));
  t.equal(0, new Buffer('abc').lastIndexOf('ab', 2));
  t.equal(0, new Buffer('abc').lastIndexOf('ab', 3));

  // The above tests test the LINEAR and SINGLE-CHAR strategies.
  // Now, we test the BOYER-MOORE-HORSPOOL strategy.
  // Test lastIndexOf on a long buffer w multiple matches:
  pattern = 'JABACABADABACABA';
  t.equal(1535, longBufferString.lastIndexOf(pattern));
  t.equal(1535, longBufferString.lastIndexOf(pattern, 1535));
  t.equal(511, longBufferString.lastIndexOf(pattern, 1534));

  // Finally, give it a really long input to trigger fallback from BMH to
  // regular BOYER-MOORE (which has better worst-case complexity).

  // Generate a really long Thue-Morse sequence of 'yolo' and 'swag',
  // "yolo swag swag yolo swag yolo yolo swag" ..., goes on for about 5MB.
  // This is hard to search because it all looks similar, but never repeats.

  // countBits returns the number of bits in the binary representation of n.
  function countBits(n) {
    for (var count = 0; n > 0; count++) {
      n = n & (n - 1); // remove top bit
    }
    return count;
  }
  var parts = [];
  for (var i = 0; i < 1000000; i++) {
    parts.push((countBits(i) % 2 === 0) ? 'yolo' : 'swag');
  }
  var reallyLong = new Buffer(parts.join(' '));
  t.equal('yolo swag swag yolo', reallyLong.slice(0, 19).toString());

  // Expensive reverse searches. Stress test lastIndexOf:
  pattern = reallyLong.slice(0, 100000);  // First 1/50th of the pattern.
  t.equal(4751360, reallyLong.lastIndexOf(pattern));
  t.equal(3932160, reallyLong.lastIndexOf(pattern, 4000000));
  t.equal(2949120, reallyLong.lastIndexOf(pattern, 3000000));
  pattern = reallyLong.slice(100000, 200000);  // Second 1/50th.
  t.equal(4728480, reallyLong.lastIndexOf(pattern));
  pattern = reallyLong.slice(0, 1000000);  // First 1/5th.
  t.equal(3932160, reallyLong.lastIndexOf(pattern));
  pattern = reallyLong.slice(0, 2000000);  // first 2/5ths.
  t.equal(0, reallyLong.lastIndexOf(pattern));

  // test truncation of Number arguments to uint8
  {
    var buf = new Buffer('this is a test');
    t.equal(buf.indexOf(0x6973), 3);
    t.equal(buf.indexOf(0x697320), 4);
    t.equal(buf.indexOf(0x69732069), 2);
    t.equal(buf.indexOf(0x697374657374), 0);
    t.equal(buf.indexOf(0x69737374), 0);
    t.equal(buf.indexOf(0x69737465), 11);
    t.equal(buf.indexOf(0x69737465), 11);
    t.equal(buf.indexOf(-140), 0);
    t.equal(buf.indexOf(-152), 1);
    t.equal(buf.indexOf(0xff), -1);
    t.equal(buf.indexOf(0xffff), -1);
  }

  t.end();
});
