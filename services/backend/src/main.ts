import { app } from './app';
import { AppDataSource } from './data-source';

async function main() {
  try {
    await AppDataSource.initialize();
    const port = process.env.PORT || 3333;
    const server = app.listen(port, () => {
      console.log(`Listening at http://localhost:${port}/api`);
    });
    server.on('error', console.error);
  } catch (error) {
    console.error(error);
  }
}

main();
