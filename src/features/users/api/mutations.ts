import { mutationOptions } from '@tanstack/react-query';
import { createUser, updateUser, deleteUser } from './service';
import { userKeys } from './queries';
import type { UserMutationPayload } from './types';

export const createUserMutation = mutationOptions({
  mutationFn: (data: UserMutationPayload) => createUser({ data }),
  onSuccess: (_data, _variables, _onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: userKeys.all })
});

export const updateUserMutation = mutationOptions({
  mutationFn: (data: { id: number; values: UserMutationPayload }) => updateUser({ data }),
  onSuccess: (_data, _variables, _onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: userKeys.all })
});

export const deleteUserMutation = mutationOptions({
  mutationFn: (id: number) => deleteUser({ data: id }),
  onSuccess: (_data, _variables, _onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: userKeys.all })
});
