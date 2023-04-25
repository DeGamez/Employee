import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-http-bearer';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(Strategy, 'api-key') {
  constructor() {
    super();
  }

  async validate(token: string): Promise<any> {
    const apiKey = process.env.API_KEY; // Replace this with the method you use to store and retrieve API keys

    if (token === apiKey) {
      return { apiKey: token };
    } else {
      throw new UnauthorizedException();
    }
  }
}