import { Twilio } from "twilio";
import IMessagingService from "../interfaces/messagingService/IMessagingService";

class TwilioSmsService implements IMessagingService {

    private client: Twilio;
    private from: string;

    constructor() {
        this.client = new Twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);
        this.from = process.env.TWILIO_PHONE_NUMBER!
    }

    async sendOtp(to: string, message: string): Promise<string> {
        try {
            const result = await this.client.messages.create({
                body: message,
                from: this.from,
                to
            })
            console.log(`Twilio Sms send. Sid:${result.sid}`)
            return result.sid
        } catch (error: any) {
            console.error("Failed to send OTP via Twilio:", error.message || error);
            throw new Error("Failed to send OTP message")
        }
    }

}

export default TwilioSmsService