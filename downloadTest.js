#!/usr/bin/env node

const https = require('https');
const fs = require('fs');

const downlaodURL = new URL('https://file-examples-com.github.io/uploads/2017/10/file_example_JPG_100kB.jpg');
const outPath = '/home/nathanael/tmp/test.jpg';
let fileSize = 0;
if (fs.existsSync(outPath)) {
	fileSize = fs.statSync(outPath).size;
}
console.log(fileSize);
let requestOptions = {
	host: downlaodURL.host,
	path: downlaodURL.pathname,
	port: downlaodURL.port,
	headers: {
		Range: `bytes=${fileSize}-`,
	},
	method: 'GET',
};

intermediate = (response) => {
	console.log('intermediate');
	total = 0;
	let counter = 0;
	// let buffer = new Buffer();
	let fileWriteStream = fs.createWriteStream(outPath, { flags: 'a' });
	response.on('data', (data) => {
		total += data.length;
		// buffer.pipe(data);
		console.log(`====> chunk ${data.length} = ${total}`);
		counter++;
		fileWriteStream.write(data);
		if (counter >= 3) {
			// response.pause();
			response.destroy();
		}
	});

	response.on('error', (err) => {
		console.log('!!!!!');
		console.log(err);
	});

	response.on('end', (res) => {
		fileWriteStream.end();
		console.log('XXXXX');
	});
};

let request = https.request(requestOptions, intermediate);
request.on('error', (error) => {
	console.log('!!!!!!!!!!');
	console.log(error);
});

console.log(request.getRawHeaderNames());
console.log(request.getHeader('Range'));
request.end();
