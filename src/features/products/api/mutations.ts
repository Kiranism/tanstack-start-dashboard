import { mutationOptions } from '@tanstack/react-query';
import { createProduct, updateProduct, deleteProduct } from './service';
import { productKeys } from './queries';
import type { ProductMutationPayload } from './types';

export const createProductMutation = mutationOptions({
  mutationFn: (data: ProductMutationPayload) => createProduct(data),
  onSuccess: (_data, _variables, _onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: productKeys.all })
});

export const updateProductMutation = mutationOptions({
  mutationFn: ({ id, values }: { id: number; values: ProductMutationPayload }) =>
    updateProduct(id, values),
  onSuccess: (_data, _variables, _onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: productKeys.all })
});

export const deleteProductMutation = mutationOptions({
  mutationFn: (id: number) => deleteProduct(id),
  onSuccess: (_data, _variables, _onMutateResult, context) =>
    context.client.invalidateQueries({ queryKey: productKeys.all })
});
