import { Field, FieldDescription, FieldLabel } from '@/components/ui/field';
import { Slider } from '@/components/ui/slider';
import { useFieldContext, type BaseFieldProps } from '@/lib/form-context';

export function SliderField({
  label,
  description,
  min = 0,
  max = 100,
  step = 1
}: Omit<BaseFieldProps, 'required'> & {
  min?: number;
  max?: number;
  step?: number;
}) {
  const field = useFieldContext<number>();
  const labelId = `${field.name}-label`;

  return (
    <Field>
      <FieldLabel id={labelId}>{label}</FieldLabel>
      <div className='px-1'>
        <Slider
          min={min}
          max={max}
          step={step}
          value={[field.state.value]}
          onValueChange={(v) => field.handleChange(Array.isArray(v) ? v[0] : v)}
          onBlur={field.handleBlur}
          aria-labelledby={labelId}
        />
        <div className='mt-1 flex justify-between text-xs text-muted-foreground tabular-nums'>
          <span>{min}</span>
          <span className='font-medium text-foreground'>{field.state.value}</span>
          <span>{max}</span>
        </div>
      </div>
      {description && <FieldDescription>{description}</FieldDescription>}
    </Field>
  );
}
