import { useForm, type Resolver } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Page, PageCreate } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';

const pageSchema = z.object({
  path: z.string().min(1, 'Requerido').startsWith('/', 'Debe comenzar con /'),
  pageComponent: z.string().min(1, 'Requerido'),
  metaTitle: z.string().min(1, 'Requerido'),
  metaDescription: z.string().min(1, 'Requerido'),
  sortOrder: z.coerce.number().min(0).default(0),
});

type PageFormData = z.infer<typeof pageSchema>;

interface PageFormProps {
  defaultValues?: Partial<Page>;
  onSubmit: (data: PageCreate) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export function PageForm({ defaultValues, onSubmit, onCancel, isLoading }: PageFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PageFormData>({
    resolver: zodResolver(pageSchema) as Resolver<PageFormData>,
    defaultValues: {
      path: defaultValues?.path || '/',
      pageComponent: defaultValues?.pageComponent || '',
      metaTitle: defaultValues?.metaTitle || '',
      metaDescription: defaultValues?.metaDescription || '',
      sortOrder: defaultValues?.sortOrder ?? 0,
    },
  });

  const handleFormSubmit = async (data: PageFormData) => {
    await onSubmit({ ...data, content: defaultValues?.content || {} });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Ruta (path)"
          placeholder="/"
          error={errors.path?.message}
          {...register('path')}
        />
        <Input
          label="Componente"
          placeholder="HomePage"
          error={errors.pageComponent?.message}
          {...register('pageComponent')}
        />
      </div>
      <Input
        label="Meta título"
        placeholder="Título SEO de la página"
        error={errors.metaTitle?.message}
        {...register('metaTitle')}
      />
      <Input
        label="Meta descripción"
        placeholder="Descripción SEO de la página"
        error={errors.metaDescription?.message}
        {...register('metaDescription')}
      />
      <Input
        label="Orden"
        type="number"
        {...register('sortOrder')}
      />
      <div className="flex gap-3 justify-end">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancelar
        </Button>
        <Button type="submit" loading={isLoading}>
          Guardar
        </Button>
      </div>
    </form>
  );
}
