const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
let port = '';

let server = http.createServer(function(request, response){
    //获取输入的url解析后的对象
    let pathObj = url.parse(request.url, true);
    //static文件夹的绝对路径,请求静态资源
    let staticPath = path.resolve(__dirname, 'static')
    //获取资源文件绝对路径
    let filePath = path.join(staticPath, pathObj.pathname)
	
    //异步读取file
	if(request.url == '/' || request.url == ''){
		fs.readFile('./static/html/index.html', function(err, data){
          if(!err){
            response.writeHead(200, {"Content-Type": "text/html;charset=UTF-8"});
            response.end(data)
          }else{
              throw err;
          }
        });
	}else{
		fs.readFile(filePath, 'binary', function(err, fileContent){
			if(err){
				console.log('404')
				response.writeHead(404, 'not found')
				response.end('<h1>404 Not Found</h1>')
			}else{
				console.log('ok')
				response.write(fileContent, 'binary')
				response.end()
			}
		})
	}
		
    
});
port = 3000;
server.listen(port);
console.log('view http://localhost:'+ port)