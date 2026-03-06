import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { Tenant, TenantCreate, Template } from '../../types';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { ColorPicker } from './ColorPicker';

const tenantSchema = z.object({
  slug: z.string().min(1, 'Requerido').regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  subdomain: z.string().min(1, 'Requerido').regex(/^[a-z0-9-]+$/, 'Solo letras minúsculas, números y guiones'),
  templatePath: z.string().min(1, 'Selecciona una plantilla'),
  brandName: z.string().min(1, 'Requerido'),
  logo: z.string().url('URL inválida').optional().or(z.literal('')),
  primaryColor: z.string().regex(/^#[0-9A-Fa-f]{6}$/, 'Color hex inválido'),
  whatsapp: z.string().optional(),
  footerText: z.string().min(1, 'Requerido'),
});

type TenantFormData = z.infer<typeof tenantSchema>;

interface TenantFormProps {
  defaultValues?: Partial<Tenant>;
  templates?: Template[];
  onSubmit: (data: TenantCreate) => Promise<void>;
  isLoading?: boolean;
}

export function TenantForm({ defaultValues, templates = [], onSubmit, isLoading }: TenantFormProps) {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TenantFormData>({
    resolver: zodResolver(tenantSchema),
    defaultValues: {
      slug: defaultValues?.slug || '',
      subdomain: defaultValues?.subdomain || '',
      templatePath: defaultValues?.templatePath || '',
      brandName: defaultValues?.brandName || '',
      logo: defaultValues?.logo || '',
      primaryColor: defaultValues?.primaryColor || '#7c3aed',
      whatsapp: defaultValues?.whatsapp || '',
      footerText: defaultValues?.footerText || '',
    },
  });

  const primaryColor = watch('primaryColor');

  const handleFormSubmit = async (data: TenantFormData) => {
    await onSubmit({
      ...data,
      navbarLinks: defaultValues?.navbarLinks || [],
      footerLinks: defaultValues?.footerLinks || [],
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          label="Nombre de marca"
          placeholder="Mi Empresa"
          error={errors.brandName?.message}
          {...register('brandName')}
        />
        <Input
          label="Slug (URL)"
          placeholder="mi-empresa"
          error={errors.slug?.message}
          {...register('slug')}
        />
        <Input
          label="Subdominio"
          placeholder="mi-empresa"
          error={errors.subdomain?.message}
          {...register('subdomain')}
        />
        <Input
          label="WhatsApp"
          placeholder="+1234567890"
          {...register('whatsapp')}
        />
        <Input
          label="Logo URL"
          placeholder="https://example.com/logo.png"
          error={errors.logo?.message}
          className="col-span-full"
          {...register('logo')}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">Plantilla</label>
        <select
          className="block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-violet-500"
          {...register('templatePath')}
        >
          <option value="">Selecciona una plantilla</option>
          {templates.map((t) => (
            <option key={t.id} value={t.path}>{t.name} ({t.category})</option>
          ))}
        </select>
        {errors.templatePath && <p className="text-xs text-red-600 mt-1">{errors.templatePath.message}</p>}
      </div>

      <ColorPicker
        label="Color principal"
        value={primaryColor}
        onChange={(color) => setValue('primaryColor', color)}
        error={errors.primaryColor?.message}
      />

      <Input
        label="Texto del footer"
        placeholder="© 2025 Mi Empresa. Todos los derechos reservados."
        error={errors.footerText?.message}
        {...register('footerText')}
      />

      <div className="flex justify-end">
        <Button type="submit" loading={isLoading}>
          Guardar
        </Button>
      </div>
    </form>
  );
}
