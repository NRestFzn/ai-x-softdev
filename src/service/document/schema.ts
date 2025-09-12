import * as yup from 'yup'

export const documentSchema = yup.object().shape({
  filename: yup.string().required('Filename is required'),
  path: yup.string().required('Path is required'),
  ext: yup.string().required('Extention is required'),
})
