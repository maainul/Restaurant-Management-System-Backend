
class EmailService implements IMessagingService {
    async sendOtp(to: string, message: string): Promise<string> {
        // Implement email logic with nodemailer, SendGrid, etc.
        return ""
    }
}

export default EmailService