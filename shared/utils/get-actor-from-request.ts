// import { ActorEntity } from '../../../entities/ActorEntity.js';

export const getActorFromRequest = (request) => {
  const id = request.headers['x-actor-id'] as string;
  const type = (request.headers['x-actor-type'] ?? 'guest') as string;
  // return new ActorEntity({ id, type });
};
