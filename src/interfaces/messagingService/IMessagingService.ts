interface IMessagingService {
    sendOtp(to: string, message: string): Promise<string>
}

export default IMessagingService