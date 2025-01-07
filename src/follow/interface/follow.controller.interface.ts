export default interface IFollowController {
  follow(dreamerId: string, makerId: string): Promise<null>;
  unfollow(dreamerId: string, makerId: string): Promise<null>;
}
