import App from './app';

const port = process.env.PORT;

App.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
