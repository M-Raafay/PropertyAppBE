import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';


@Injectable()
export class MailerService {
    private transporter;

  constructor(private configService: ConfigService) {
    
    const email = this.configService.get('APP_EMAIL');
    const emailPassword = this.configService.get('APP_EMAIL_PASSWORD');

    this.transporter = nodemailer.createTransport({
      service: 'gmail', 
      auth: {
        user: email,
        pass: emailPassword,
      },
    });
  }
    
  async sendEmail(to: string,subject:string, html: string) {
    try {
      const info = await this.transporter.sendMail({
        to,
        subject,
        html,
      });
      console.log('check email', info);
      
      return true;
    } catch (error) {
      console.error('Error sending email:', error);
      return false;
    }
  }
}
