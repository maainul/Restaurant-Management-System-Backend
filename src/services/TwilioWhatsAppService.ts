import { Twilio } from "twilio";

class TwilioWhatsAppService implements IMessagingService {

    private client: Twilio

    constructor() {
        this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
    }

    async sendOtp(to: string, message: string): Promise<string> {
        await this.client.messages.create({
            from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_NUMBER!,
            to: 'whatsapp:' + to,
            body: message,
        })
        return ""
    }

}
export default TwilioWhatsAppService