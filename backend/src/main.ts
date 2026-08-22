import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Enable CORS
    const allowedOrigins = process.env.FRONTEND_URL 
        ? process.env.FRONTEND_URL.split(',').map(url => url.trim())
        : ['http://localhost:3000'];
    
    console.log('🌐 CORS enabled for origins:', allowedOrigins);
    
    app.enableCors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps, curl, Postman)
            if (!origin) return callback(null, true);
            
            // Check if origin matches allowed origins
            const isAllowed = allowedOrigins.some(allowedOrigin => origin === allowedOrigin);
            
            // Allow Vercel deployment URLs (*.vercel.app)
            const isVercelDomain = origin.endsWith('.vercel.app');
            
            // Allow howitworks.com.ng domains (all subdomains including www)
            const isHowitworksDomain = origin === 'https://howitworks.com.ng' || 
                                       origin === 'https://www.howitworks.com.ng' ||
                                       origin === 'https://app.howitworks.com.ng' ||
                                       origin === 'http://howitworks.com.ng' ||
                                       origin === 'http://www.howitworks.com.ng' ||
                                       origin === 'http://app.howitworks.com.ng' ||
                                       origin.endsWith('.howitworks.com.ng');
            
            if (isAllowed || isVercelDomain || isHowitworksDomain || process.env.NODE_ENV === 'development') {
                callback(null, true);
            } else {
                console.warn(`⚠️  CORS blocked origin: ${origin}`);
                callback(new Error('Not allowed by CORS'));
            }
        },
        credentials: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
    });

    // Global validation pipe
    app.useGlobalPipes(new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));

    // API prefix
    app.setGlobalPrefix('api');

    // Swagger documentation
    const config = new DocumentBuilder()
        .setTitle('Real Estate API')
        .setDescription('API for real estate platform')
        .setVersion('1.0')
        .addBearerAuth()
        .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api/docs', app, document);

    const port = process.env.PORT || 3004;
    await app.listen(port, '0.0.0.0');

    console.log(`🚀 Server running on http://0.0.0.0:${port}`);
    console.log(`📚 API Documentation: http://localhost:${port}/api/docs`);
    console.log(`✅ CORS: Multiple domains enabled`);
    console.log(`   - *.vercel.app (Vercel deployments)`);
    console.log(`   - *.howitworks.com.ng (Production domains)`);
    console.log(`   - Configured origins: ${allowedOrigins.join(', ')}`);
}

bootstrap();