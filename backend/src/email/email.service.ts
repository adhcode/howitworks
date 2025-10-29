import { Injectable, Logger } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private readonly logger = new Logger(EmailService.name);
  private resend: Resend;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      this.logger.warn('RESEND_API_KEY not found in environment variables');
      return;
    }
    
    this.resend = new Resend(apiKey);
  }

  async sendRealtorInvitation(
    email: string,
    firstName: string,
    lastName: string,
    invitationToken: string
  ): Promise<boolean> {
    if (!this.resend) {
      this.logger.error('Resend not initialized. Check RESEND_API_KEY environment variable.');
      return false;
    }

    try {
      const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:3000';
      const invitationUrl = `${frontendUrl}/auth/realtor-signup/${invitationToken}`;
      
      const { data, error } = await this.resend.emails.send({
        from: process.env.FROM_EMAIL || 'HowItWorks <noreply@howitworks.com>',
        to: [email],
        subject: 'You\'ve been invited to join HowItWorks as a Realtor',
        html: this.getRealtorInvitationTemplate(firstName, lastName, invitationUrl),
      });

      if (error) {
        this.logger.error('Failed to send realtor invitation email:', error);
        return false;
      }

      this.logger.log(`Realtor invitation email sent successfully to ${email}. Message ID: ${data?.id}`);
      return true;
    } catch (error) {
      this.logger.error('Error sending realtor invitation email:', error);
      return false;
    }
  }

  async sendWelcomeEmail(
    email: string,
    firstName: string,
    lastName: string,
    referralLink: string
  ): Promise<boolean> {
    if (!this.resend) {
      this.logger.error('Resend not initialized. Check RESEND_API_KEY environment variable.');
      return false;
    }

    try {
      const { data, error } = await this.resend.emails.send({
        from: process.env.FROM_EMAIL || 'HowItWorks <noreply@howitworks.com>',
        to: [email],
        subject: 'Welcome to HowItWorks - Your Realtor Account is Ready!',
        html: this.getWelcomeTemplate(firstName, lastName, referralLink),
      });

      if (error) {
        this.logger.error('Failed to send welcome email:', error);
        return false;
      }

      this.logger.log(`Welcome email sent successfully to ${email}. Message ID: ${data?.id}`);
      return true;
    } catch (error) {
      this.logger.error('Error sending welcome email:', error);
      return false;
    }
  }



  private getRealtorInvitationTemplate(
    firstName: string,
    lastName: string,
    invitationUrl: string
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Join HowItWorks as a Realtor</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Logo/Header -->
                        <tr>
                            <td style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 1px solid #e0e0e0;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1A2A52;">HowItWorks</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #202124;">Hi ${firstName},</p>
                                
                                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #202124;">
                                    You've been invited to join HowItWorks as a realtor. Complete your registration to start managing leads and earning commissions.
                                </p>
                                
                                <!-- CTA Button -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                                    <tr>
                                        <td align="center">
                                            <a href="${invitationUrl}" style="display: inline-block; padding: 14px 32px; background-color: #1FD2AF; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">Complete Registration</a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 20px; color: #5f6368;">
                                    This invitation expires in 7 days. If you didn't expect this invitation, you can safely ignore this email.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
                                <p style="margin: 0; font-size: 12px; line-height: 18px; color: #5f6368; text-align: center;">
                                    HowItWorks &copy; 2024. All rights reserved.
                                </p>
                                <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 18px; color: #5f6368; text-align: center;">
                                    This email was sent to ${firstName} ${lastName}
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
  }

  private getWelcomeTemplate(
    firstName: string,
    lastName: string,
    referralLink: string
  ): string {
    return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Welcome to HowItWorks</title>
    </head>
    <body style="margin: 0; padding: 0; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif; background-color: #f5f5f5;">
        <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f5f5f5; padding: 40px 0;">
            <tr>
                <td align="center">
                    <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
                        <!-- Logo/Header -->
                        <tr>
                            <td style="padding: 40px 40px 30px 40px; text-align: center; border-bottom: 1px solid #e0e0e0;">
                                <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #1A2A52;">HowItWorks</h1>
                            </td>
                        </tr>
                        
                        <!-- Content -->
                        <tr>
                            <td style="padding: 40px;">
                                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #202124;">Hi ${firstName},</p>
                                
                                <p style="margin: 0 0 24px 0; font-size: 16px; line-height: 24px; color: #202124;">
                                    Welcome to HowItWorks! Your realtor account has been successfully created.
                                </p>
                                
                                <!-- Referral Link Box -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 24px 0; background-color: #f8f9fa; border-radius: 6px; border: 1px solid #e0e0e0;">
                                    <tr>
                                        <td style="padding: 20px;">
                                            <p style="margin: 0 0 12px 0; font-size: 14px; font-weight: 600; color: #202124;">Your Referral Link</p>
                                            <p style="margin: 0 0 12px 0; font-size: 14px; line-height: 20px; color: #5f6368;">
                                                Share this link with clients to track leads and earn commissions:
                                            </p>
                                            <p style="margin: 0; padding: 12px; background-color: #ffffff; border-radius: 4px; font-size: 13px; color: #1FD2AF; word-break: break-all; font-family: monospace;">
                                                ${referralLink}
                                            </p>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 24px 0 16px 0; font-size: 16px; font-weight: 500; color: #202124;">Getting Started</p>
                                
                                <ul style="margin: 0 0 24px 0; padding-left: 20px; font-size: 14px; line-height: 24px; color: #5f6368;">
                                    <li style="margin-bottom: 8px;">Login to your dashboard</li>
                                    <li style="margin-bottom: 8px;">Complete your profile</li>
                                    <li style="margin-bottom: 8px;">Share your referral link</li>
                                    <li style="margin-bottom: 8px;">Manage leads and earn commissions</li>
                                </ul>
                                
                                <!-- CTA Button -->
                                <table width="100%" cellpadding="0" cellspacing="0" style="margin: 32px 0;">
                                    <tr>
                                        <td align="center">
                                            <a href="${process.env.FRONTEND_URL || 'http://localhost:3000'}/auth/login" style="display: inline-block; padding: 14px 32px; background-color: #1FD2AF; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 16px; font-weight: 500;">Go to Dashboard</a>
                                        </td>
                                    </tr>
                                </table>
                                
                                <p style="margin: 24px 0 0 0; font-size: 14px; line-height: 20px; color: #5f6368;">
                                    If you have any questions, feel free to reach out to our support team.
                                </p>
                            </td>
                        </tr>
                        
                        <!-- Footer -->
                        <tr>
                            <td style="padding: 24px 40px; background-color: #f8f9fa; border-top: 1px solid #e0e0e0;">
                                <p style="margin: 0; font-size: 12px; line-height: 18px; color: #5f6368; text-align: center;">
                                    HowItWorks &copy; 2024. All rights reserved.
                                </p>
                                <p style="margin: 8px 0 0 0; font-size: 12px; line-height: 18px; color: #5f6368; text-align: center;">
                                    This email was sent to ${firstName} ${lastName}
                                </p>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
        </table>
    </body>
    </html>
    `;
  }


}