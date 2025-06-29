import React, { useState } from 'react';
import { useDonor } from '../../context/DonorContext';
import { PauseCircle, Bell, KeyRound, MessageCircle, Phone, Calendar } from 'lucide-react';
import { Switch, Dialog, Transition } from '@headlessui/react';

// Types pour les langues disponibles
type Language = 'fr' | 'en' | 'he';

// Traductions
const translations = {
  fr: {
    settings: 'Paramètres',
    recurringDonations: 'Dons récurrents',
    noRecurringDonations: 'Aucun don récurrent.',
    amount: 'Montant (€)',
    nextPayment: 'Prochain prélèvement',
    actions: 'Actions',
    edit: 'Modifier',
    suspend: 'Suspendre',
    notifications: 'Notifications',
    email: 'Email',
    sms: 'SMS',
    security: 'Sécurité',
    changePassword: 'Changer le mot de passe',
    twoFactorAuth: 'Authentification à deux facteurs',
    editRecurringDonation: 'Modifier le don récurrent',
    save: 'Enregistrer',
    cancel: 'Annuler',
    communicationPrefs: 'Préférences de communication',
    automatedCalls: 'Appels automatisés',
    frequency: 'Fréquence',
    never: 'Jamais',
    monthly: 'Mensuel',
    quarterly: 'Trimestriel',
    schedule: 'Programmer',
  },
  en: {
    settings: 'Settings',
    recurringDonations: 'Recurring Donations',
    noRecurringDonations: 'No recurring donations.',
    amount: 'Amount (€)',
    nextPayment: 'Next payment',
    actions: 'Actions',
    edit: 'Edit',
    suspend: 'Suspend',
    notifications: 'Notifications',
    email: 'Email',
    sms: 'SMS',
    security: 'Security',
    changePassword: 'Change password',
    twoFactorAuth: 'Two-factor authentication',
    editRecurringDonation: 'Edit recurring donation',
    save: 'Save',
    cancel: 'Cancel',
    communicationPrefs: 'Communication preferences',
    automatedCalls: 'Automated calls',
    frequency: 'Frequency',
    never: 'Never',
    monthly: 'Monthly',
    quarterly: 'Quarterly',
    schedule: 'Schedule',
  },
  he: {
    settings: 'הגדרות',
    recurringDonations: 'תרומות קבועות',
    noRecurringDonations: 'אין תרומות קבועות.',
    amount: 'סכום (€)',
    nextPayment: 'התשלום הבא',
    actions: 'פעולות',
    edit: 'ערוך',
    suspend: 'השהה',
    notifications: 'התראות',
    email: 'אימייל',
    sms: 'מסרון',
    security: 'אבטחה',
    changePassword: 'שנה סיסמה',
    twoFactorAuth: 'אימות דו-שלבי',
    editRecurringDonation: 'ערוך תרומה קבועה',
    save: 'שמור',
    cancel: 'בטל',
    communicationPrefs: 'העדפות תקשורת',
    automatedCalls: 'שיחות אוטומטיות',
    frequency: 'תדירות',
    never: 'לעולם לא',
    monthly: 'חודשי',
    quarterly: 'רבעוני',
    schedule: 'תזמן',
  },
};

const Settings: React.FC = () => {
  const { recurring } = useDonor();
  const [language, setLanguage] = useState<Language>('fr');
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifSms, setNotifSms] = useState(false);
  const [automatedCalls, setAutomatedCalls] = useState(false);
  const [callFrequency, setCallFrequency] = useState('never');
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<typeof recurring[0] | null>(null);
  const [editAmount, setEditAmount] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editFrequency, setEditFrequency] = useState('monthly');
  
  // Accès aux traductions selon la langue sélectionnée
  const t = translations[language];
  
  // Fonction pour sauvegarder les modifications d'un don récurrent
  const handleSaveEdit = () => {
    // Ici, on simule la sauvegarde des modifications
    // Dans une vraie application, on enverrait ces données au backend
    console.log('Saving changes for donation:', {
      id: selected?.id,
      amount: editAmount,
      nextDate: editDate,
      frequency: editFrequency
    });
    setOpen(false);
  };

  return (
    <div className="p-6 space-y-8 max-w-4xl mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{t.settings}</h2>
        <div className="flex border rounded-md overflow-hidden">
          <button 
            onClick={() => setLanguage('fr')} 
            className={`px-2 py-1 text-xs ${language === 'fr' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}
          >
            FR
          </button>
          <button 
            onClick={() => setLanguage('en')} 
            className={`px-2 py-1 text-xs ${language === 'en' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}
          >
            EN
          </button>
          <button 
            onClick={() => setLanguage('he')} 
            className={`px-2 py-1 text-xs ${language === 'he' ? 'bg-indigo-100 text-indigo-700' : 'bg-white'}`}
          >
            HE
          </button>
        </div>
      </div>

      {/* Dons récurrents */}
      <section className="bg-white rounded-xl shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><PauseCircle size={18}/> {t.recurringDonations}</h3>
        {recurring.length === 0 ? (
          <p className="text-sm text-gray-500">{t.noRecurringDonations}</p>
        ) : (
          <table className="w-full text-sm divide-y">
            <thead className="text-left">
              <tr>
                <th className="py-2">{t.amount}</th><th>{t.nextPayment}</th><th>{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {recurring.map(r => (
                <tr key={r.id} className="border-t">
                  <td className="py-2">{r.amount}</td>
                  <td>{r.nextDate}</td>
                  <td className="space-x-2">
                    <button onClick={() => {setSelected(r); setEditAmount(r.amount.toString()); setEditDate(r.nextDate); setOpen(true);}} className="bg-indigo-50 text-indigo-700 rounded px-3 py-1 text-xs hover:bg-indigo-100 transition">{t.edit}</button>
                    <button className="bg-red-50 text-red-600 rounded px-3 py-1 text-xs hover:bg-red-100 transition">{t.suspend}</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </section>

      {/* Notifications */}
      <section className="bg-white rounded-xl shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><Bell size={18}/> {t.notifications}</h3>
        <div className="flex items-center justify-between">
          <span>{t.email}</span>
          <Switch
            checked={notifEmail}
            onChange={setNotifEmail}
            className={`${notifEmail ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Toggle Email</span>
            <span className={`${notifEmail ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
          </Switch>
        </div>
        <div className="flex items-center justify-between">
          <span>SMS</span>
          <Switch
            checked={notifSms}
            onChange={setNotifSms}
            className={`${notifSms ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
          >
            <span className="sr-only">Toggle SMS</span>
            <span className={`${notifSms ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
          </Switch>
        </div>
      </section>
      
      {/* Communication automatisée - Nouvelle section */}
      <section className="bg-white rounded-xl shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><MessageCircle size={18}/> {t.communicationPrefs}</h3>
        
        <div className="space-y-4">
          {/* Appels automatisés */}
          <div className="border-b pb-4">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Phone size={16} className="text-indigo-600" />
                <span>{t.automatedCalls}</span>
              </div>
              <Switch
                checked={automatedCalls}
                onChange={setAutomatedCalls}
                className={`${automatedCalls ? 'bg-indigo-600' : 'bg-gray-200'} relative inline-flex h-6 w-11 items-center rounded-full`}
              >
                <span className="sr-only">Toggle Automated Calls</span>
                <span className={`${automatedCalls ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white`} />
              </Switch>
            </div>
            
            {automatedCalls && (
              <div className="mt-3 pl-6 space-y-3">
                <div>
                  <label className="block text-sm text-gray-600 mb-1">{t.frequency}</label>
                  <select 
                    value={callFrequency} 
                    onChange={(e) => setCallFrequency(e.target.value)}
                    className="w-full border rounded-md px-3 py-1.5 text-sm focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500"
                  >
                    <option value="never">{t.never}</option>
                    <option value="monthly">{t.monthly}</option>
                    <option value="quarterly">{t.quarterly}</option>
                  </select>
                </div>
                
                <button className="flex items-center gap-1 bg-indigo-50 text-indigo-700 rounded px-3 py-1.5 text-sm hover:bg-indigo-100 transition">
                  <Calendar size={14} />
                  {t.schedule}
                </button>
              </div>
            )}
          </div>
          
          {/* Autres options de communication pourraient être ajoutées ici */}
        </div>
      </section>

      <Transition appear show={open} as={React.Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => setOpen(false)}>
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300" enterFrom="opacity-0" enterTo="opacity-100"
            leave="ease-in duration-200" leaveFrom="opacity-100" leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300" enterFrom="opacity-0 scale-95" enterTo="opacity-100 scale-100"
                leave="ease-in duration-200" leaveFrom="opacity-100 scale-100" leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
                    {t.editRecurringDonation}
                  </Dialog.Title>
                  <div className="mt-4 space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.amount}</label>
                      <input 
                        type="number" 
                        value={editAmount} 
                        onChange={(e) => setEditAmount(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.nextPayment}</label>
                      <input 
                        type="date" 
                        value={editDate} 
                        onChange={(e) => setEditDate(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      />
                    </div>
                    
                    {/* Nouvelle option: Fréquence */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">{t.frequency}</label>
                      <select 
                        value={editFrequency}
                        onChange={(e) => setEditFrequency(e.target.value)}
                        className="w-full border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      >
                        <option value="monthly">{t.monthly}</option>
                        <option value="quarterly">{t.quarterly}</option>
                      </select>
                    </div>
                  </div>

                  <div className="mt-6 flex justify-end space-x-3">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-100 px-4 py-2 text-sm font-medium text-indigo-900 hover:bg-indigo-200 focus:outline-none"
                      onClick={() => setOpen(false)}
                    >
                      {t.cancel}
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none"
                      onClick={handleSaveEdit}
                    >
                      {t.save}
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>

      {/* Sécurité */}
      <section className="bg-white rounded-xl shadow p-6 space-y-4">
        <h3 className="text-lg font-semibold flex items-center gap-2"><KeyRound size={18}/> {t.security}</h3>
        <div className="space-y-3">
          <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-lg text-sm transition">{t.changePassword}</button>
          <button className="w-full bg-indigo-50 hover:bg-indigo-100 text-indigo-700 py-2 rounded-lg text-sm transition">{t.twoFactorAuth}</button>
        </div>
      </section>
    </div>
  );
};

export default Settings;
