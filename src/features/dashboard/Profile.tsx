import React from 'react';
import { Switch } from '@headlessui/react';
import { useDonor } from '../../context/DonorContext';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object({
  firstName: yup.string().required(),
  lastName: yup.string().required(),
  email: yup.string().email().required(),
});

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  commEmail: boolean;
  commSms: boolean;
  commPhone: boolean;
  avatar: string;
};

const Profile: React.FC = () => {
  const { donor } = useDonor();
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      firstName: donor.firstName,
      lastName: donor.lastName,
      email: donor.email,
      phone: donor.phone,
      address: donor.address,
      commEmail: donor.commPrefs.email,
      commSms: donor.commPrefs.sms,
      commPhone: donor.commPrefs.phone,
      avatar: donor.avatar,
    },
    resolver: yupResolver(schema as any),
  });

  const onSubmit = (data: any) => {
    console.log(data);
    alert('Profil sauvegardé (mock)');
  };

  return (
    <form className="p-6 max-w-3xl mx-auto space-y-8" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex items-center gap-6">
        <div className="relative group">
          <img src={donor.avatar} alt="avatar" className="h-28 w-28 rounded-full object-cover ring-2 ring-indigo-500" />
          <label className="absolute inset-0 flex items-center justify-center bg-black/50 text-white text-xs opacity-0 group-hover:opacity-100 cursor-pointer rounded-full">
            Changer
            <input type="file" accept="image/*" {...register('avatar')} className="sr-only" />
          </label>
        </div>

      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium">Prénom</label>
          <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register('firstName')} />
          {errors.firstName && <p className="text-red-600 text-sm">{errors.firstName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register('lastName')} />
          {errors.lastName && <p className="text-red-600 text-sm">{errors.lastName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium">Téléphone</label>
          <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register('phone')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Adresse</label>
          <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register('address')} />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Email</label>
          <input className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" {...register('email')} disabled />
        </div>
      </div>

      {/* Communication prefs */}
      <div className="bg-white shadow rounded-xl p-6 space-y-4">
        <h3 className="font-semibold text-lg">Préférences de communication</h3>
        <div className="flex items-center justify-between">
          <span>Email</span>
          <Switch
            checked={watch('commEmail')}
            onChange={(val: boolean) => setValue('commEmail', val)}
            className={`${watch('commEmail') ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Activer email</span>
            <span
              className={`${watch('commEmail') ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span>SMS</span>
          <Switch
            checked={watch('commSms')}
            onChange={(val: boolean) => setValue('commSms', val)}
            className={`${watch('commSms') ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Activer SMS</span>
            <span
              className={`${watch('commSms') ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
            />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span>Téléphone</span>
          <Switch
            checked={watch('commPhone')}
            onChange={(val: boolean) => setValue('commPhone', val)}
            className={`${watch('commPhone') ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Activer téléphone</span>
            <span
              className={`${watch('commPhone') ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`}
            />
          </Switch>
        </div>
      </div>

      <div className="text-right">
        <button type="submit" className="bg-indigo-600 text-white rounded px-6 py-2 hover:bg-indigo-700 transition">Sauvegarder</button>
      </div>
    </form>
  );
};

export default Profile;
