const http = require("http")
const { json } = require("stream/consumers")

// const server = http.createServer((req, res)=>{
//     console.log(req.url, res.method);
//     res.end("welcome to ToDo App server")
// })

const path = require("path")
const fs = require("fs")

const filePath = path.join(__dirname, "./db/todo.json")

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const pathname = url.pathname;
    // console.log(url, 'url');
    const data = fs.readFileSync(filePath, { encoding: "utf-8" })
    // get all todos
    if (req.url === '/todos' && req.method === 'GET') {
        res.writeHead(200, {
            "content-type": "application/json",
            // "email": "m@gmail.com"
        })

        // res.setHeader("content-type", "text/plain");
        // res.setHeader("email", "mo@gmail.com");
        // res.statusCode = 201;
        res.end(data)
    }
    // post a todo
    else if (req.url === '/create-todos' && req.method === "POST") {
        let data = ""
        req.on("data", (chunk) => {
            data = data + chunk
        })
        req.on("end", () => {
            const { title, body } = JSON.parse(data)
            console.log({ title, body });
            const createdAt = new Date().toLocaleString();
            const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" })
            const parseAllTodos = JSON.parse(allTodos)
            parseAllTodos.push({ title, body, createdAt })
            fs.writeFileSync(filePath, JSON.stringify(parseAllTodos, null, 2), { encoding: "utf-8" })
            res.end(JSON.stringify({ title, body, createdAt }, null, 2))
        })
        // const allTodos = fs.readFileSync(filePath, {encoding: "utf-8"})
    } else if (pathname === "/todo" && req.method === "GET") {
        const title = url.searchParams.get("title");
        //   console.log(title);
        const data = fs.readFileSync(filePath, { encoding: "utf-8" });
        const parsedData = JSON.parse(data);

        const todo = parsedData.find((todo) => todo.title === title);

        const stringifiedTodo = JSON.stringify(todo);
        res.writeHead(200, {
            "content-type": "application/json",
        });

        res.end(stringifiedTodo);
    } else if (pathname === "/update-todo" && req.method === "PATCH") {
        const title = url.searchParams.get("title");
        let data = "";

        req.on("data", (chunk) => {
            data = data + chunk;
        });

        req.on("end", () => {
            const { body } = JSON.parse(data);

            const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
            const parsedAllTodos = JSON.parse(allTodos);

            const todoIndex = parsedAllTodos.findIndex(
                (todo) => todo.title === title
            );

            parsedAllTodos[todoIndex].body = body;

            fs.writeFileSync(filePath, JSON.stringify(parsedAllTodos, null, 2), {
                encoding: "utf-8",
            });

            res.end(
                JSON.stringify(
                    { title, body, createdAt: parsedAllTodos[todoIndex].createdAt },
                    null,
                    2
                )
            );
        });
    } else if (pathname === "/delete-todo" && req.method === "DELETE") {
        const title = url.searchParams.get("title");
        if (!title) {
            res.writeHead(400, { "content-type": "application/json" });
            return res.end(JSON.stringify({ error: "Title query parameter is required" }));
        }

        const allTodos = fs.readFileSync(filePath, { encoding: "utf-8" });
        const parsedTodos = JSON.parse(allTodos);

        const index = parsedTodos.findIndex((todo) => todo.title === title);

        if (index === -1) {
            res.writeHead(404, { "content-type": "application/json" });
            return res.end(JSON.stringify({ error: "Todo not found" }));
        }

        const deletedTodo = parsedTodos.splice(index, 1)[0]; // remove and store the deleted todo

        fs.writeFileSync(filePath, JSON.stringify(parsedTodos, null, 2), {
            encoding: "utf-8",
        });

        res.writeHead(200, { "content-type": "application/json" });
        res.end(JSON.stringify({ message: "Todo deleted successfully", deletedTodo }, null, 2));

    }
    else {
        res.end("Route Not Found")
    }
})

server.listen(5000, "127.0.0.1", () => {
    console.log("Server listening to port 5000");
})