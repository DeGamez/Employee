import { Module } from '@nestjs/common';
import { ApiKeyStrategy } from './api-key.strategy';
import { ApiKeyGuard } from './api-key.guard';

@Module({
  providers: [ApiKeyStrategy, ApiKeyGuard],
  exports: [ApiKeyGuard],
})
export class AuthModule {}