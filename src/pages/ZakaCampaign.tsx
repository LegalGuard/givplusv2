import React from 'react';
import { Heart, Calendar, Users, CheckCircle } from 'lucide-react';

const ZakaCampaign = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative">
        <div className="h-96 w-full bg-gray-800 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1469571486292-0ba58a3f068b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=80" 
            alt="ZAKA - Repérage et Secours" 
            className="w-full h-full object-cover opacity-70"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/70 to-transparent"></div>
          <div className="absolute inset-0 flex items-center">
            <div className="container mx-auto px-6">
              <div className="max-w-3xl">
                <div className="mb-6 flex items-center">
                  <img 
                    src="https://via.placeholder.com/80?text=ZAKA" 
                    alt="ZAKA Logo" 
                    className="h-20 w-20 mr-4 bg-white p-1 rounded-full"
                  />
                  <h1 className="text-white text-4xl font-bold">URGENCE ISRAËL</h1>
                </div>
                <h2 className="text-white text-2xl font-medium mb-6">
                  Soutenez les équipes de secouristes de ZAKA en Israël
                </h2>
                <div className="flex flex-wrap gap-3">
                  <a href="/zaka-donation" className="bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium flex items-center">
                    <Heart className="mr-2" size={20} />
                    Faire un don
                  </a>
                  <button className="bg-white hover:bg-gray-100 text-primary-600 py-3 px-6 rounded-md font-medium flex items-center">
                    En savoir plus
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="bg-white py-8 border-b">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-1">Collectés</p>
              <p className="text-3xl font-bold text-primary-600">€100,500</p>
              <div className="w-full bg-gray-200 rounded-full h-2.5 mt-3">
                <div className="bg-primary-600 h-2.5 rounded-full" style={{ width: "67%" }}></div>
              </div>
              <p className="text-sm text-gray-500 mt-1">Objectif: €150,000</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-1">Donateurs</p>
              <p className="text-3xl font-bold text-gray-800">542</p>
              <p className="text-sm text-gray-500 mt-1">personnes ont contribué</p>
            </div>
            <div className="flex flex-col items-center">
              <p className="text-gray-600 mb-1">Temps restant</p>
              <p className="text-3xl font-bold text-gray-800">23 jours</p>
              <p className="text-sm text-gray-500 mt-1">Fin le 31 juillet 2023</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col lg:flex-row gap-12">
          {/* Left Column - Campaign Information */}
          <div className="lg:w-2/3">
            <h2 className="text-2xl font-bold mb-6">Urgence Israël - Votre aide est vitale</h2>
            <div className="prose max-w-none mb-8">
              <p className="mb-4">
                ZAKA est une organisation de secours israélienne composée principalement de volontaires, reconnue par l'ONU. Ses équipes interviennent sur les lieux des attentats, des catastrophes naturelles et des accidents graves pour porter secours aux victimes et assurer le respect des défunts selon la tradition juive.
              </p>

              <p className="mb-4">
                Depuis les attaques du 7 octobre, les équipes de ZAKA travaillent sans relâche pour:
              </p>

              <ul className="list-disc pl-6 mb-4">
                <li>Porter secours aux blessés dans les zones touchées</li>
                <li>Rechercher les disparus dans les zones de combat</li>
                <li>Récupérer et identifier les victimes</li>
                <li>Apporter une assistance logistique aux forces de défense</li>
                <li>Soutenir les familles des victimes</li>
              </ul>

              <p className="mb-4">
                Vos dons permettront:
              </p>

              <ol className="list-decimal pl-6 mb-4">
                <li>D'équiper nos bénévoles en matériel de secours (gilets, casques, brancards)</li>
                <li>D'acheter des équipements médicaux d'urgence</li>
                <li>De financer les déplacements des équipes de secours</li>
                <li>De soutenir les familles des victimes</li>
              </ol>

              <p className="mb-4">
                <strong>Chaque don compte et contribue directement à sauver des vies en Israël.</strong>
              </p>

              <div className="my-8">
                <h3 className="text-xl font-bold mb-4">Les actions récentes de ZAKA</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="border rounded-lg overflow-hidden">
                    <img 
                      src="/zaka-action1.jpg" 
                      alt="Équipes ZAKA en action" 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=ZAKA+en+action";
                      }}
                    />
                    <div className="p-4">
                      <h4 className="font-semibold">Intervention dans les kibboutz du sud</h4>
                      <p className="text-gray-600">Les secouristes ZAKA interviennent dans les communautés touchées</p>
                    </div>
                  </div>
                  <div className="border rounded-lg overflow-hidden">
                    <img 
                      src="/zaka-action2.jpg" 
                      alt="Équipes ZAKA en action" 
                      className="w-full h-48 object-cover"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/400x300?text=ZAKA+en+action";
                      }}
                    />
                    <div className="p-4">
                      <h4 className="font-semibold">Sauvetage de civils</h4>
                      <p className="text-gray-600">Nos équipes formées aux situations d'urgence</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-10">
              <h3 className="text-xl font-bold mb-4">Témoignages</h3>
              <div className="bg-gray-50 p-6 rounded-lg border">
                <div className="italic text-gray-700 mb-4">
                  "J'ai vu les secouristes de ZAKA travailler sans relâche pendant des jours. Leur dévouement est incroyable et leur aide a été inestimable pour notre communauté touchée par les attaques."
                </div>
                <div className="font-semibold">
                  - David Cohen, résident de Sdérot
                </div>
              </div>
            </div>
            
            <div>
              <h3 className="text-xl font-bold mb-4">Qui sommes-nous?</h3>
              <p className="mb-4">
                ZAKA (acronyme hébreu pour "Identification des victimes de catastrophes") est une organisation israélienne fondée en 1995. Elle compte aujourd'hui plus de 3,000 volontaires à travers Israël et dans le monde, prêts à intervenir 24h/24 et 7j/7.
              </p>
              <p>
                Reconnue internationalement, ZAKA a participé aux opérations de secours lors de nombreuses catastrophes majeures dans le monde, comme le tsunami en Asie du Sud-Est, les tremblements de terre en Haïti et au Népal, ou encore l'ouragan Katrina aux États-Unis.
              </p>
            </div>
          </div>
          
          {/* Right Column - Donation Options */}
          <div className="lg:w-1/3">
            <div className="bg-gray-50 rounded-xl border p-6 sticky top-8">
              <h3 className="text-xl font-bold text-center mb-6">Faire un don</h3>
              
              <div className="grid grid-cols-3 gap-3 mb-6">
                <button className="bg-white hover:bg-primary-50 border border-gray-300 hover:border-primary-300 text-gray-800 py-3 rounded-md text-center transition-colors">
                  €18
                </button>
                <button className="bg-white hover:bg-primary-50 border border-gray-300 hover:border-primary-300 text-gray-800 py-3 rounded-md text-center transition-colors">
                  €36
                </button>
                <button className="bg-white hover:bg-primary-50 border border-gray-300 hover:border-primary-300 text-gray-800 py-3 rounded-md text-center transition-colors">
                  €54
                </button>
                <button className="bg-white hover:bg-primary-50 border border-gray-300 hover:border-primary-300 text-gray-800 py-3 rounded-md text-center transition-colors">
                  €108
                </button>
                <button className="bg-white hover:bg-primary-50 border border-gray-300 hover:border-primary-300 text-gray-800 py-3 rounded-md text-center transition-colors">
                  €180
                </button>
                <button className="bg-primary-100 hover:bg-primary-200 border border-primary-300 text-primary-800 py-3 rounded-md text-center transition-colors font-medium">
                  Autre
                </button>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Montant personnalisé
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <span className="text-gray-500">€</span>
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-12 py-3 border border-gray-300 rounded-md focus:ring-primary-500 focus:border-primary-500"
                    placeholder="Montant"
                  />
                </div>
              </div>
              
              <div className="mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="h-4 w-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded" />
                  <span className="ml-2 text-gray-700">Don mensuel récurrent</span>
                </label>
              </div>

              <a href="/zaka-donation" className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3 px-6 rounded-md font-medium flex items-center justify-center mb-4">
                <Heart className="mr-2" size={20} />
                Faire un don
              </a>
              
              <a href="/zaka-donation" className="w-full bg-white hover:bg-gray-50 text-primary-600 border border-primary-600 py-3 px-6 rounded-md font-medium text-center block">
                Voir toutes les options de don
              </a>

              <div className="mt-6 text-sm text-gray-600">
                <div className="flex items-start mb-3">
                  <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Don sécurisé par cryptage SSL</p>
                </div>
                <div className="flex items-start mb-3">
                  <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>66% de réduction d'impôt sur votre don (France)</p>
                </div>
                <div className="flex items-start">
                  <CheckCircle size={18} className="text-primary-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p>Reçu fiscal envoyé par email</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-primary-600 py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Votre aide est vitale</h2>
          <p className="text-white text-lg opacity-90 max-w-3xl mx-auto mb-8">
            Ensemble, nous pouvons équiper nos bénévoles pour sauver des vies en Israël. Chaque contribution fait une différence.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="/zaka-donation" className="bg-white hover:bg-gray-100 text-primary-600 py-3 px-8 rounded-md font-medium">
              Faire un don
            </a>
            <button className="bg-transparent hover:bg-primary-700 text-white border border-white py-3 px-8 rounded-md font-medium">
              Devenir bénévole
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZakaCampaign;
