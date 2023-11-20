import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import {yupResolver} from '@hookform/resolvers/yup';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db } from '../../config/firebase';
import userEvent from '@testing-library/user-event';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

export const Createform = () => {

  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  interface CreateFormData {
    title: string,
    description: string,
  }

  const schema = yup.object().shape({
    title: yup.string().required('You must add a title.'),
    description: yup.string().required('You must add a description.'),
  });
  
  const {register, handleSubmit, formState: {errors},} = useForm<CreateFormData>({
    resolver: yupResolver(schema),
  })

  const postsRef = collection(db, 'posts');

  const onCreatePost = async (data: CreateFormData) => {
    await addDoc(postsRef, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate('/');
  }

  return (
    <form onSubmit={handleSubmit(onCreatePost)}>
      <input placeholder='Title...' {...register('title')}/>
      <p style={{color: 'red'}}>{errors.title?.message}</p>
      <textarea placeholder='Description...' {...register('description')}/>
      <p style={{color: 'red'}}>{errors.description?.message}</p>
      <input type='submit'/>
    </form>
  )
}