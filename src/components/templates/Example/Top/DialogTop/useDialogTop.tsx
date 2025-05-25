import { useFormCustom } from '@/lib/form'
import { zodResolver } from '@hookform/resolvers/zod'
import { PostInput, PostInputSchema } from './schema'

export const useDialogTop = () => {
  const { register, handleSubmit, watch, setError, control, formState } =
    useFormCustom<PostInput>({
      defaultValues: {
        name: '',
        age: 1,
        test: 'a',
        isActive: false,
        isStatus: false,
        radio1: 'radio1',
        radio2: 'radio2',
        textEditor: 'text editor',
      },
      resolver: zodResolver(PostInputSchema),
    })

  const onSubmit = handleSubmit(async (input) => {
   // console.log('submit input', input)
  })

  return [
    {
      register,
      handleSubmit,
      watch,
      setError,
      control,
      formState,
    },
    { onSubmit },
  ] as const
}
