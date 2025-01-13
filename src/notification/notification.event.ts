export default class NotificationEvent {
  constructor(
    public readonly userId: string,
    public readonly content: string
  ) {}
}
