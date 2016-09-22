Utility to debug memory usage of NodeJS processes.

Based on [heapdump](https://github.com/bnoordhuis/node-heapdump).

# Usage

Requiring the module will activate it.  It has no functions.

```
require("heapdumper");
```

Now, your process will dump a `.heapsnapshot` file to its current directory
if you send it the `USR2` signal.

Example use, where the program `myserverthing.js` uses `heapdumper`:

```
$ node myserverthing.js &
[1] 4955
$ kill -s USR2 4955
USR2 received - creating .heapdump file in /home/helge/proj/heapdumper
$ ls
heapdump-3808509.864648.heapsnapshot
heapdump-3808509.864648.log
myserverthing.js
node_modules 
$
```

# Install

The module is available via NPM.

```
npm install heapdumper
```

# Inspecting the `.heapsnapshot` files

Chrome/Chromium has a profiling tool to visually inspect the heap: [Chrome heap profiling](https://developers.google.com/chrome-developer-tools/docs/heap-profiling)

Quick recipe: Open Chrome, open dev tools, go to "profiles tab", right click in the tool area and select "Load profile".  Navigate to the generated `.heapsnapshot` file and open it.  Enjoy.
