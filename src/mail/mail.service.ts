import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private readonly logger = new Logger(MailService.name);
  private transporter: nodemailer.Transporter;

  constructor(private configService: ConfigService) {
    this.transporter = nodemailer.createTransport({
      host: this.configService.get('MAIL_HOST'),
      port: parseInt(this.configService.get('MAIL_PORT')),
      secure: this.configService.get('MAIL_SECURE') === 'true',
      auth: {
        user: this.configService.get('MAIL_USER'),
        pass: this.configService.get('MAIL_PASS'),
      },
    });
  }

  async sendPasswordResetEmail(email: string, otpCode: string): Promise<void> {
    const htmlContent = this.getPasswordResetEmailTemplate(otpCode);

    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: email,
        subject: '🔐 Code de vérification - Build & Baraka',
        html: htmlContent,
      });

      this.logger.log(`Password reset email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send password reset email to ${email}`,
        error,
      );
      throw new Error('Failed to send password reset email');
    }
  }

  async sendPasswordChangeConfirmationEmail(email: string): Promise<void> {
    const htmlContent = this.getPasswordChangeConfirmationTemplate();

    try {
      await this.transporter.sendMail({
        from: this.configService.get('MAIL_FROM'),
        to: email,
        subject: '✅ Mot de passe modifié avec succès - Build & Baraka',
        html: htmlContent,
      });

      this.logger.log(`Password change confirmation email sent to ${email}`);
    } catch (error) {
      this.logger.error(
        `Failed to send password change confirmation email to ${email}`,
        error,
      );
      // Don't throw error here as password was already changed successfully
      this.logger.warn('Password was changed but confirmation email failed');
    }
  }

  private getPasswordResetEmailTemplate(otpCode: string): string {
    return `
    <!DOCTYPE html>
    <html lang="fr" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Code de vérification - Build & Baraka</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #00a1a7 0%, #008b91 100%); padding: 40px 30px; text-align: center; color: white; }
            .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 24px; color: #00a1a7; margin-bottom: 20px; font-weight: 600; }
            .message { font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 30px; }
            .otp-code { display: inline-block; background: linear-gradient(135deg, #00a1a7 0%, #008b91 100%); color: white; padding: 20px 40px; font-size: 32px; font-weight: bold; letter-spacing: 8px; border-radius: 15px; margin: 30px 0; font-family: 'Courier New', monospace; box-shadow: 0 8px 16px rgba(0, 161, 167, 0.3); }
            .security-note { background: #f8f9fa; border-left: 4px solid #00a1a7; padding: 20px; margin: 30px 0; border-radius: 0 10px 10px 0; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; }
            .islamic-decoration { font-size: 24px; color: #00a1a7; margin: 20px 0; }
            .verse { font-style: italic; color: #00a1a7; margin: 20px 0; padding: 15px; background: #e6f7f8; border-radius: 10px; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🕌 Build & Baraka</div>
                <div class="subtitle">Votre compagnon spirituel islamique</div>
            </div>
            
            <div class="content">
                <div class="islamic-decoration">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
                
                <div class="greeting">As-salāmu ʿalaykum wa-raḥmatu -llāhi wa-barakātuh 🤲</div>
                
                <div class="message">
                    Nous avons reçu une demande de réinitialisation de mot de passe pour votre compte Build & Baraka.
                    <br><br>
                    Si vous êtes à l'origine de cette demande, utilisez le code de vérification ci-dessous dans votre application mobile :
                </div>
                
                <div style="text-align: center;">
                    <div class="otp-code">${otpCode}</div>
                </div>
                
                <div class="verse">
                    "Et quiconque craint Allah, Il lui donnera une issue favorable"
                    <br><strong>- Sourate At-Talaq (65:2)</strong>
                </div>
                
                <div class="security-note">
                    <strong>🛡️ Note de sécurité :</strong>
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li>Ce code est valable pendant 1 heure uniquement</li>
                        <li>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email</li>
                        <li>Ne partagez jamais ce code avec qui que ce soit</li>
                        <li>Saisissez ce code dans votre application mobile pour continuer</li>
                    </ul>
                </div>
                
                <div class="message">
                    <strong>Instructions :</strong>
                    <br>
                    1. Ouvrez votre application Build & Baraka
                    <br>
                    2. Allez dans "Mot de passe oublié"
                    <br>
                    3. Saisissez ce code de vérification : <strong>${otpCode}</strong>
                    <br>
                    4. Créez votre nouveau mot de passe
                </div>
            </div>
            
            <div class="footer">
                <div class="islamic-decoration">☪️ ✨ 🤲</div>
                <p><strong>Build & Baraka</strong> - Votre compagnon spirituel islamique</p>
                <p>Que la paix et les bénédictions d'Allah soient sur vous</p>
                <br>
                <p style="font-size: 12px; color: #999;">
                    Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
  }

  private getPasswordChangeConfirmationTemplate(): string {
    const currentDate = new Date().toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

    return `
    <!DOCTYPE html>
    <html lang="fr" dir="ltr">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Mot de passe modifié - Build & Baraka</title>
        <style>
            * { margin: 0; padding: 0; box-sizing: border-box; }
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 20px; }
            .container { max-width: 600px; margin: 0 auto; background: white; border-radius: 20px; overflow: hidden; box-shadow: 0 20px 40px rgba(0,0,0,0.1); }
            .header { background: linear-gradient(135deg, #00a1a7 0%, #008b91 100%); padding: 40px 30px; text-align: center; color: white; }
            .logo { font-size: 32px; font-weight: bold; margin-bottom: 10px; }
            .subtitle { font-size: 16px; opacity: 0.9; }
            .content { padding: 40px 30px; }
            .greeting { font-size: 24px; color: #00a1a7; margin-bottom: 20px; font-weight: 600; }
            .message { font-size: 16px; line-height: 1.6; color: #555; margin-bottom: 30px; }
            .success-icon { font-size: 64px; text-align: center; margin: 30px 0; }
            .security-note { background: #e6f7f8; border-left: 4px solid #00a1a7; padding: 20px; margin: 30px 0; border-radius: 0 10px 10px 0; }
            .footer { background: #f8f9fa; padding: 30px; text-align: center; color: #666; font-size: 14px; }
            .islamic-decoration { font-size: 24px; color: #00a1a7; margin: 20px 0; }
            .verse { font-style: italic; color: #00a1a7; margin: 20px 0; padding: 15px; background: #e6f7f8; border-radius: 10px; }
            .date-info { background: #f8f9fa; padding: 15px; border-radius: 10px; margin: 20px 0; text-align: center; font-weight: 600; color: #495057; }
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <div class="logo">🕌 Build & Baraka</div>
                <div class="subtitle">Votre compagnon spirituel islamique</div>
            </div>
            
            <div class="content">
                <div class="islamic-decoration">بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</div>
                
                <div class="greeting">As-salāmu ʿalaykum wa-raḥmatu -llāhi wa-barakātuh 🤲</div>
                
                <div class="success-icon">✅</div>
                
                <div class="message">
                    <strong>Excellente nouvelle !</strong> Votre mot de passe a été modifié avec succès sur votre compte Build & Baraka.
                </div>
                
                <div class="date-info">
                    📅 Modification effectuée le : ${currentDate}
                </div>
                
                <div class="verse">
                    "Et Allah est le meilleur des protecteurs, et Il est le plus miséricordieux des miséricordieux"
                    <br><strong>- Sourate Yusuf (12:64)</strong>
                </div>
                
                <div class="security-note">
                    <strong>🛡️ Sécurité de votre compte :</strong>
                    <ul style="margin-top: 10px; padding-left: 20px;">
                        <li>Votre nouveau mot de passe est maintenant actif</li>
                        <li>Si vous n'êtes pas à l'origine de cette modification, contactez-nous immédiatement</li>
                        <li>Nous vous recommandons d'utiliser un mot de passe unique et sécurisé</li>
                        <li>Ne partagez jamais vos identifiants avec qui que ce soit</li>
                    </ul>
                </div>
                
                <div class="message">
                    Vous pouvez maintenant vous connecter à votre application Build & Baraka avec votre nouveau mot de passe.
                    <br><br>
                    <strong>Qu'Allah vous protège et vous bénisse ! 🤲</strong>
                </div>
            </div>
            
            <div class="footer">
                <div class="islamic-decoration">☪️ ✨ 🤲</div>
                <p><strong>Build & Baraka</strong> - Votre compagnon spirituel islamique</p>
                <p>Que la paix et les bénédictions d'Allah soient sur vous</p>
                <br>
                <p style="font-size: 12px; color: #999;">
                    Cet email a été envoyé automatiquement, merci de ne pas y répondre.
                    <br>
                    Si vous avez des questions, contactez notre support.
                </p>
            </div>
        </div>
    </body>
    </html>
    `;
  }
}
