import * as fs from 'fs';
import * as path from 'path';

// Manual .env loader to avoid external dependencies
function loadEnv() {
  const envPath = path.resolve(process.cwd(), '.env');
  console.log('[DEBUG-ENV] process.cwd():', process.cwd());
  console.log('[DEBUG-ENV] envPath:', envPath);
  console.log('[DEBUG-ENV] envPath exists:', fs.existsSync(envPath));
  if (fs.existsSync(envPath)) {
    const envContent = fs.readFileSync(envPath, 'utf-8');
    envContent.split(/\r?\n/).forEach((line) => {
      const trimmed = line.trim();
      if (trimmed && !trimmed.startsWith('#')) {
        const index = trimmed.indexOf('=');
        if (index > 0) {
          const key = trimmed.substring(0, index).trim();
          let value = trimmed.substring(index + 1).trim();
          if (value.startsWith('"') && value.endsWith('"')) {
            value = value.substring(1, value.length - 1);
          } else if (value.startsWith("'") && value.endsWith("'")) {
            value = value.substring(1, value.length - 1);
          }
          process.env[key] = value;
        }
      }
    });
  }
  console.log('[DEBUG-ENV] process.env.DATABASE_URL:', process.env.DATABASE_URL);
}
loadEnv();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable global CORS for our local frontend origins
  app.enableCors({
    origin: ['http://localhost:3000', 'http://localhost:5173'],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    credentials: true,
  });

  // Set the global routing prefix
  app.setGlobalPrefix('api');

  // Explicitly listen on port 3001 (or process.env.PORT if configured)
  const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3001;
  await app.listen(port);
  console.log(`NestJS Backend server running on http://localhost:${port}/api`);
}
bootstrap();

