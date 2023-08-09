// Dependencies
const gm = require('gm');
const Minio = require('minio');

// Config
let srcBucket = process.env.MINIO_RESIZER_SOURCE;
let dstBucket = process.env.MINIO_RESIZER_DESTINATION;

let maxWidth = parseInt(process.env.MINIO_RESIZER_MAX_WIDTH || "2560");
let maxHeight = parseInt(process.env.MINIO_RESIZER_MAX_HEIGHT || "1600");
let startupSync = process.env.MINIO_RESIZER_STARTUP_SYNC === "true";

let minioConfig = {
    endPoint: process.env.MINIO_ENDPOINT,
    port: parseInt(process.env.MINIO_PORT),
    secure: process.env.MINIO_SECURITY === "true",

    accessKey: process.env.MINIO_ACCESS_KEY,
    secretKey: process.env.MINIO_SECRET_KEY
};

// Utils
function join(...arguments) {
    return "'" + arguments.join(":") + "'";
}

function urlDecode(str) {
	return decodeURIComponent((str+'').replace(/\+/g, '%20'));
}

// Main
const mc = new Minio.Client(minioConfig);
const listener = mc.listenBucketNotification(srcBucket, "", "", ["s3:ObjectCreated:*"]);
console.log(`Listening on ${join(srcBucket)} for events`);

function resize(src, dst, objectPath) {
  mc.getObject(srcBucket, objectPath,
      function (err, dataStream) {
          console.log(`Processing ${join(dstBucket, objectPath)}`);
          if (err) {
              return console.log(`Error retrieving ${join(srcBucket, objectPath)}: ${join(err)}`);
          }

          mc.statObject(srcBucket, objectPath, function (err, stat) {
            if (err) {
              return console.log(err)
            }

            let outputStream = gm(dataStream).resize(maxWidth, maxHeight, ">").stream();

            mc.putObject(dstBucket,
                objectPath,
                outputStream,
                stat.metaData,
                (err, etag) => {
                    if (err) {
                        return console.log(`Error saving ${join(dstBucket, objectPath)}: ${join(err)}`);
                    }
                    console.log(`Successfully uploaded ${join(dstBucket, objectPath)} with md5sum ${join(etag)}`);
                });
          })
      });
}

listener.on('notification', record => resize(srcBucket, dstBucket, urlDecode(record.s3.object.key)));

if (startupSync) {
  mc.listObjects(srcBucket, '', true).on('data', obj => {
    let objectPath = obj.name;
    mc.statObject(dstBucket, objectPath, (err, stat) => {
      if (err) {
        console.log(`Path ${join(dstBucket, objectPath)} does not exist - resizing from ${join(srcBucket)}`);
        resize(srcBucket, dstBucket, objectPath);
      }
    });
  });
}

process.on("SIGINT", function () {
    listener.stop();
    process.exit();
});
