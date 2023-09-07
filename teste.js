const http = require('http');
const fs = require('fs');
const { SENHA_SECRETA } = process.env;

const server = http.createServer((req, res) => {
  fs.readFile('pagina.html', 'utf8', (err, data) => {
    if (err) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Erro interno do servidor.');
      return;
    }
    
    // Substituir a string '{{senha}}' no HTML pelo valor da variável de ambiente
    const paginaComSenha = data.replace('{{senha}}', SENHA_SECRETA);

    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(paginaComSenha);
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
