import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import helmet from 'helmet';
import * as compression from 'compression';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          styleSrc: [
            "'self'",
            "'unsafe-inline'",
            'https://fonts.googleapis.com',
          ],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'https:'],
          scriptSrc: ["'self'"],
          connectSrc: ["'self'"],
        },
      },
      hsts: {
        maxAge: 31536000,
        includeSubDomains: true,
        preload: true,
      },
    }),
  );

  app.use(compression());

  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || [
    'https://buildbaraka.com',
    'https://www.buildbaraka.com',
    'https://www.panel.buildbaraka.com',
    'https://panel.buildbaraka.com',
    'http://localhost:3000',
  ];

  // Custom CORS middleware
  app.use((req, res, next) => {
    const origin = req.headers.origin;

    // Check if origin is allowed
    let isAllowed = false;

    if (!origin) {
      // Allow requests with no origin (Postman, mobile apps, etc.)
      isAllowed = true;
    } else if (process.env.NODE_ENV === 'development') {
      // In development, allow localhost origins
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        isAllowed = true;
      }
    }

    if (!isAllowed && allowedOrigins.includes(origin)) {
      isAllowed = true;
    }

    if (isAllowed) {
      res.header('Access-Control-Allow-Origin', origin || '*');
      res.header('Access-Control-Allow-Credentials', 'true');
      res.header(
        'Access-Control-Allow-Methods',
        'GET,POST,PUT,PATCH,DELETE,OPTIONS',
      );
      res.header(
        'Access-Control-Allow-Headers',
        'Origin,X-Requested-With,Content-Type,Accept,Authorization,Cache-Control',
      );
      res.header('Access-Control-Expose-Headers', 'X-Total-Count');
      res.header('Access-Control-Max-Age', '86400');
    }

    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    next();
  });

  // Enable CORS with simple configuration as fallback
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      forbidUnknownValues: true,
      disableErrorMessages: process.env.NODE_ENV === 'production',
      validationError: {
        target: false,
        value: false,
      },
    }),
  );

  if (
    process.env.NODE_ENV !== 'production' ||
    process.env.ENABLE_SWAGGER === 'true'
  ) {
    const config = new DocumentBuilder()
      .setTitle('API Build & Baraka')
      .setDescription(
        "API du projet Build & Baraka développé avec NestJS et l'ORM Prisma par Sammy.",
      )
      .setVersion('1.0')
      .addBearerAuth()
      .build();

    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, documentFactory);
    console.log(`📚 Swagger UI disponible sur /api`);
  }

  if (process.env.NODE_ENV === 'production') {
    app.use((req, res, next) => {
      if (req.header('x-forwarded-proto') !== 'https') {
        res.redirect(`https://${req.header('host')}${req.url}`);
      } else {
        next();
      }
    });
  }

  // Global prefix
  app.setGlobalPrefix('api');

  const port = process.env.PORT || 4001;
  await app.listen(port, '0.0.0.0');

  console.log(
    `🕌 Build & Baraka API is running on: http://localhost:${port}/api`,
  );
  console.log(`📚 Swagger documentation: http://localhost:${port}/api/docs`);
  console.log(`🌍 Environment: ${process.env.NODE_ENV}`);
}

bootstrap().catch((error) => {
  console.error('💥 Failed to start application:', error);
  process.exit(1);
});
