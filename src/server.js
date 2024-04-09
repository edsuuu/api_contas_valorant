import App from './app'

const port = process.env.PORT;

App.listen(port, () => {
     console.log();
     console.log(`Server rodando em http://localhost:${port}`);
});