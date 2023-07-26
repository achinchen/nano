import { app } from './app';
import { dataSource } from './data-source';

async function main() {
  try {
    await dataSource.initialize();
    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/`);
    });
    server.on('error', console.error);
  } catch (error) {
    console.error(error);
  }
}

main();
