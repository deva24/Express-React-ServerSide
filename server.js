import options from './webpack.config';
import webpack from 'webpack';
import express from 'express';
import path from 'path';
import fs from 'fs';
import StarterApp from './src/App';

import React from 'react';
import ReactDomServer from 'react-dom/server'

const compiler = webpack(options);
const app = express();

console.log("Compiling...");
compiler.run((err, stat) =>
{
    if (err)
        console.error("Error in compilation " + err);
    else
    {
        console.log("Compilation complete.");
        app.listen(3001, (err) =>
        {
            if (err)
                console.error("Error in express listen : " + err);
            else
                console.log("Express listening on 3001");
        });
    }
})

app.use((req, res, nxt) =>
{
    console.log("Requested : " + req.url);

    if (req.url === '/dist/bundle.js')
    {
        let resolvedPath = path.resolve(__dirname, "dist/bundle.js")
        console.log("Sent : " + resolvedPath);
        res.sendFile(resolvedPath);
        return;
    }

    let url1 = 'public' + req.url;
    let resolvedPath = path.resolve(__dirname, url1);

    fs.stat(resolvedPath, (err, stat) =>
    {
        if (err)
        {
            // if no file then send the usual index.html
            resolvedPath = path.resolve(__dirname, 'public/index.html');
            fs.readFile(resolvedPath, { encoding: "UTF8" }, (err, data) =>
            {
                if (err)
                {
                    throw err;
                }
                console.log('Sending renderedFile');
                res.setHeader('Content-Type', 'text/html');
                let renderedReactApp = ReactDomServer.renderToString(<StarterApp/>);
                data = data.replace('<div id="root"></div>', `<div id="root">${renderedReactApp}</div>`);
                
                console.log(`ReactApp '${renderedReactApp}'`);

                res.end(data);
            });

            return;
        }

        if (stat.isDirectory())
        {
            resolvedPath = path.resolve(resolvedPath, "index.html");
            console.log("Sent : " + resolvedPath);
            res.sendFile(resolvedPath);
        }
        else if (stat.isFile())
        {
            console.log("Sent : " + resolvedPath);
            res.sendFile(resolvedPath);
        }

    });
});

app.use(express.static("./public"));


