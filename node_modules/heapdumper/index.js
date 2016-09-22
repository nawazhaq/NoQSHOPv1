var heapdump = require("heapdump");

process.on("SIGUSR2", function () {
  console.log("USR2 received - creating .heapdump file in " + process.cwd());
  heapdump.writeSnapshot();
});
