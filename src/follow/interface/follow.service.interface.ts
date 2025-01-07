export default interface IFollowService {
  create(dreamerId: string, makerId: string): Promise<null>;
  delete(dreamerId: string, makerId: string): Promise<null>;
}
