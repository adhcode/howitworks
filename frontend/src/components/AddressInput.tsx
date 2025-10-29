'use client'

import React, { useState, useEffect } from 'react';
import { FiMapPin, FiChevronDown } from 'react-icons/fi';

// Nigerian states with their Local Government Areas (LGAs)
const NIGERIAN_STATES_LGAS = {
  'Abia': [
    'Aba North', 'Aba South', 'Arochukwu', 'Bende', 'Ikwuano', 'Isiala Ngwa North', 
    'Isiala Ngwa South', 'Isuikwuato', 'Obi Ngwa', 'Ohafia', 'Osisioma', 'Ugwunagbo', 
    'Ukwa East', 'Ukwa West', 'Umuahia North', 'Umuahia South', 'Umu Nneochi'
  ],
  'Adamawa': [
    'Demsa', 'Fufure', 'Ganye', 'Gayuk', 'Gombi', 'Grie', 'Hong', 'Jada', 'Lamurde', 
    'Madagali', 'Maiha', 'Mayo Belwa', 'Michika', 'Mubi North', 'Mubi South', 'Numan', 
    'Shelleng', 'Song', 'Toungo', 'Yola North', 'Yola South'
  ],
  'Akwa Ibom': [
    'Abak', 'Eastern Obolo', 'Eket', 'Esit Eket', 'Essien Udim', 'Etim Ekpo', 'Etinan', 
    'Ibeno', 'Ibesikpo Asutan', 'Ibiono-Ibom', 'Ika', 'Ikono', 'Ikot Abasi', 'Ikot Ekpene', 
    'Ini', 'Itu', 'Mbo', 'Mkpat-Enin', 'Nsit-Atai', 'Nsit-Ibom', 'Nsit-Ubium', 'Obot Akara', 
    'Okobo', 'Onna', 'Oron', 'Oruk Anam', 'Udung-Uko', 'Ukanafun', 'Uruan', 'Urue-Offong/Oruko', 'Uyo'
  ],
  'Anambra': [
    'Aguata', 'Anambra East', 'Anambra West', 'Anaocha', 'Awka North', 'Awka South', 
    'Ayamelum', 'Dunukofia', 'Ekwusigo', 'Idemili North', 'Idemili South', 'Ihiala', 
    'Njikoka', 'Nnewi North', 'Nnewi South', 'Ogbaru', 'Onitsha North', 'Onitsha South', 
    'Orumba North', 'Orumba South', 'Oyi'
  ],
  'Bauchi': [
    'Alkaleri', 'Bauchi', 'Bogoro', 'Damban', 'Darazo', 'Dass', 'Gamawa', 'Ganjuwa', 
    'Giade', 'Itas/Gadau', 'Jama\'are', 'Katagum', 'Kirfi', 'Misau', 'Ningi', 'Shira', 
    'Tafawa Balewa', 'Toro', 'Warji', 'Zaki'
  ],
  'Bayelsa': [
    'Brass', 'Ekeremor', 'Kolokuma/Opokuma', 'Nembe', 'Ogbia', 'Sagbama', 'Southern Ijaw', 'Yenagoa'
  ],
  'Benue': [
    'Ado', 'Agatu', 'Apa', 'Buruku', 'Gboko', 'Guma', 'Gwer East', 'Gwer West', 'Katsina-Ala', 
    'Konshisha', 'Kwande', 'Logo', 'Makurdi', 'Obi', 'Ogbadibo', 'Ohimini', 'Oju', 'Okpokwu', 
    'Otukpo', 'Tarka', 'Ukum', 'Ushongo', 'Vandeikya'
  ],
  'Borno': [
    'Abadam', 'Askira/Uba', 'Bama', 'Bayo', 'Biu', 'Chibok', 'Damboa', 'Dikwa', 'Gubio', 
    'Guzamala', 'Gwoza', 'Hawul', 'Jere', 'Kaga', 'Kala/Balge', 'Konduga', 'Kukawa', 
    'Kwaya Kusar', 'Mafa', 'Magumeri', 'Maiduguri', 'Marte', 'Mobbar', 'Monguno', 'Ngala', 
    'Nganzai', 'Shani'
  ],
  'Cross River': [
    'Abi', 'Akamkpa', 'Akpabuyo', 'Bakassi', 'Bekwarra', 'Biase', 'Boki', 'Calabar Municipal', 
    'Calabar South', 'Etung', 'Ikom', 'Obanliku', 'Obubra', 'Obudu', 'Odukpani', 'Ogoja', 
    'Yakuur', 'Yala'
  ],
  'Delta': [
    'Aniocha North', 'Aniocha South', 'Bomadi', 'Burutu', 'Ethiope East', 'Ethiope West', 
    'Ika North East', 'Ika South', 'Isoko North', 'Isoko South', 'Ndokwa East', 'Ndokwa West', 
    'Okpe', 'Oshimili North', 'Oshimili South', 'Patani', 'Sapele', 'Udu', 'Ughelli North', 
    'Ughelli South', 'Ukwuani', 'Uvwie', 'Warri North', 'Warri South', 'Warri South West'
  ],
  'Ebonyi': [
    'Abakaliki', 'Afikpo North', 'Afikpo South', 'Ebonyi', 'Ezza North', 'Ezza South', 
    'Ikwo', 'Ishielu', 'Ivo', 'Izzi', 'Ohaozara', 'Ohaukwu', 'Onicha'
  ],
  'Edo': [
    'Akoko-Edo', 'Egor', 'Esan Central', 'Esan North-East', 'Esan South-East', 'Esan West', 
    'Etsako Central', 'Etsako East', 'Etsako West', 'Igueben', 'Ikpoba Okha', 'Oredo', 
    'Orhionmwon', 'Ovia North-East', 'Ovia South-West', 'Owan East', 'Owan West', 'Uhunmwonde'
  ],
  'Ekiti': [
    'Ado Ekiti', 'Efon', 'Ekiti East', 'Ekiti South-West', 'Ekiti West', 'Emure', 'Gbonyin', 
    'Ido Osi', 'Ijero', 'Ikere', 'Ikole', 'Ilejemeje', 'Irepodun/Ifelodun', 'Ise/Orun', 
    'Moba', 'Oye'
  ],
  'Enugu': [
    'Aninri', 'Awgu', 'Enugu East', 'Enugu North', 'Enugu South', 'Ezeagu', 'Igbo Etiti', 
    'Igbo Eze North', 'Igbo Eze South', 'Isi Uzo', 'Nkanu East', 'Nkanu West', 'Nsukka', 
    'Oji River', 'Udenu', 'Udi', 'Uzo Uwani'
  ],
  'FCT': [
    'Abaji', 'Bwari', 'Gwagwalada', 'Kuje', 'Municipal Area Council', 'Kwali'
  ],
  'Gombe': [
    'Akko', 'Balanga', 'Billiri', 'Dukku', 'Funakaye', 'Gombe', 'Kaltungo', 'Kwami', 
    'Nafada', 'Shongom', 'Yamaltu/Deba'
  ],
  'Imo': [
    'Aboh Mbaise', 'Ahiazu Mbaise', 'Ehime Mbano', 'Ezinihitte', 'Ideato North', 'Ideato South', 
    'Ihitte/Uboma', 'Ikeduru', 'Isiala Mbano', 'Isu', 'Mbaitoli', 'Ngor Okpala', 'Njaba', 
    'Nkwerre', 'Nwangele', 'Obowo', 'Oguta', 'Ohaji/Egbema', 'Okigwe', 'Orlu', 'Orsu', 
    'Oru East', 'Oru West', 'Owerri Municipal', 'Owerri North', 'Owerri West', 'Unuimo'
  ],
  'Jigawa': [
    'Auyo', 'Babura', 'Biriniwa', 'Birnin Kudu', 'Buji', 'Dutse', 'Gagarawa', 'Garki', 
    'Gumel', 'Guri', 'Gwaram', 'Gwiwa', 'Hadejia', 'Jahun', 'Kafin Hausa', 'Kazaure', 
    'Kiri Kasama', 'Kiyawa', 'Kaugama', 'Maigatari', 'Malam Madori', 'Miga', 'Ringim', 
    'Roni', 'Sule Tankarkar', 'Taura', 'Yankwashi'
  ],
  'Kaduna': [
    'Birnin Gwari', 'Chikun', 'Giwa', 'Igabi', 'Ikara', 'Jaba', 'Jema\'a', 'Kachia', 
    'Kaduna North', 'Kaduna South', 'Kagarko', 'Kajuru', 'Kaura', 'Kauru', 'Kubau', 
    'Kudan', 'Lere', 'Makarfi', 'Sabon Gari', 'Sanga', 'Soba', 'Zangon Kataf', 'Zaria'
  ],
  'Kano': [
    'Ajingi', 'Albasu', 'Bagwai', 'Bebeji', 'Bichi', 'Bunkure', 'Dala', 'Dambatta', 'Dawakin Kudu', 
    'Dawakin Tofa', 'Doguwa', 'Fagge', 'Gabasawa', 'Garko', 'Garun Mallam', 'Gaya', 'Gezawa', 
    'Gwale', 'Gwarzo', 'Kabo', 'Kano Municipal', 'Karaye', 'Kibiya', 'Kiru', 'Kumbotso', 'Kunchi', 
    'Kura', 'Madobi', 'Makoda', 'Minjibir', 'Nasarawa', 'Rano', 'Rimin Gado', 'Rogo', 'Shanono', 
    'Sumaila', 'Takai', 'Tarauni', 'Tofa', 'Tsanyawa', 'Tudun Wada', 'Ungogo', 'Warawa', 'Wudil'
  ],
  'Katsina': [
    'Bakori', 'Batagarawa', 'Batsari', 'Baure', 'Bindawa', 'Charanchi', 'Dandume', 'Danja', 
    'Dan Musa', 'Daura', 'Dutsi', 'Dutsin Ma', 'Faskari', 'Funtua', 'Ingawa', 'Jibia', 
    'Kafur', 'Kaita', 'Kankara', 'Kankia', 'Katsina', 'Kurfi', 'Kusada', 'Mai\'Adua', 
    'Malumfashi', 'Mani', 'Mashi', 'Matazu', 'Musawa', 'Rimi', 'Sabuwa', 'Safana', 
    'Sandamu', 'Zango'
  ],
  'Kebbi': [
    'Aleiro', 'Arewa Dandi', 'Argungu', 'Augie', 'Bagudo', 'Birnin Kebbi', 'Bunza', 'Dandi', 
    'Fakai', 'Gwandu', 'Jega', 'Kalgo', 'Koko/Besse', 'Maiyama', 'Ngaski', 'Sakaba', 
    'Shanga', 'Suru', 'Wasagu/Danko', 'Yauri', 'Zuru'
  ],
  'Kogi': [
    'Adavi', 'Ajaokuta', 'Ankpa', 'Bassa', 'Dekina', 'Ibaji', 'Idah', 'Igalamela Odolu', 
    'Ijumu', 'Kabba/Bunu', 'Kogi', 'Lokoja', 'Mopa Muro', 'Ofu', 'Ogori/Magongo', 
    'Okehi', 'Okene', 'Olamaboro', 'Omala', 'Yagba East', 'Yagba West'
  ],
  'Kwara': [
    'Asa', 'Baruten', 'Edu', 'Ekiti', 'Ifelodun', 'Ilorin East', 'Ilorin South', 'Ilorin West', 
    'Irepodun', 'Isin', 'Kaiama', 'Moro', 'Offa', 'Oke Ero', 'Oyun', 'Pategi'
  ],
  'Lagos': [
    'Agege', 'Ajeromi-Ifelodun', 'Alimosho', 'Amuwo-Odofin', 'Apapa', 'Badagry', 'Epe', 
    'Eti Osa', 'Ibeju-Lekki', 'Ifako-Ijaiye', 'Ikeja', 'Ikorodu', 'Kosofe', 'Lagos Island', 
    'Lagos Mainland', 'Mushin', 'Ojo', 'Oshodi-Isolo', 'Shomolu', 'Surulere'
  ],
  'Nasarawa': [
    'Akwanga', 'Awe', 'Doma', 'Karu', 'Keana', 'Keffi', 'Kokona', 'Lafia', 'Nasarawa', 
    'Nasarawa Egon', 'Obi', 'Toto', 'Wamba'
  ],
  'Niger': [
    'Agaie', 'Agwara', 'Bida', 'Borgu', 'Bosso', 'Chanchaga', 'Edati', 'Gbako', 'Gurara', 
    'Katcha', 'Kontagora', 'Lapai', 'Lavun', 'Magama', 'Mariga', 'Mashegu', 'Mokwa', 
    'Moya', 'Paikoro', 'Rafi', 'Rijau', 'Shiroro', 'Suleja', 'Tafa', 'Wushishi'
  ],
  'Ogun': [
    'Abeokuta North', 'Abeokuta South', 'Ado-Odo/Ota', 'Egbado North', 'Egbado South', 
    'Ewekoro', 'Ifo', 'Ijebu East', 'Ijebu North', 'Ijebu North East', 'Ijebu Ode', 
    'Ikenne', 'Imeko Afon', 'Ipokia', 'Obafemi Owode', 'Odeda', 'Odogbolu', 'Ogun Waterside', 
    'Sagamu', 'Remo North'
  ],
  'Ondo': [
    'Akoko North-East', 'Akoko North-West', 'Akoko South-West', 'Akoko South-East', 'Akure North', 
    'Akure South', 'Ese Odo', 'Idanre', 'Ifedore', 'Ilaje', 'Ile Oluji/Okeigbo', 'Irele', 
    'Odigbo', 'Okitipupa', 'Ondo East', 'Ondo West', 'Ose', 'Owo'
  ],
  'Osun': [
    'Atakunmosa East', 'Atakunmosa West', 'Aiyedaade', 'Aiyedire', 'Boluwaduro', 'Boripe', 
    'Ede North', 'Ede South', 'Egbedore', 'Ejigbo', 'Ife Central', 'Ife East', 'Ife North', 
    'Ife South', 'Ifedayo', 'Ifelodun', 'Ila', 'Ilesa East', 'Ilesa West', 'Irepodun', 
    'Irewole', 'Isokan', 'Iwo', 'Obokun', 'Odo Otin', 'Ola Oluwa', 'Olorunda', 'Oriade', 
    'Orolu', 'Osogbo'
  ],
  'Oyo': [
    'Afijio', 'Akinyele', 'Atiba', 'Atisbo', 'Egbeda', 'Ibadan North', 'Ibadan North-East', 
    'Ibadan North-West', 'Ibadan South-East', 'Ibadan South-West', 'Ibarapa Central', 
    'Ibarapa East', 'Ibarapa North', 'Ido', 'Irepo', 'Iseyin', 'Itesiwaju', 'Iwajowa', 
    'Kajola', 'Lagelu', 'Ogbomoso North', 'Ogbomoso South', 'Ogo Oluwa', 'Olorunsogo', 
    'Oluyole', 'Ona Ara', 'Orelope', 'Ori Ire', 'Oyo East', 'Oyo West', 'Saki East', 
    'Saki West', 'Surulere'
  ],
  'Plateau': [
    'Barkin Ladi', 'Bassa', 'Jos East', 'Jos North', 'Jos South', 'Kanam', 'Kanke', 
    'Langtang North', 'Langtang South', 'Mangu', 'Mikang', 'Pankshin', 'Qua\'an Pan', 
    'Riyom', 'Shendam', 'Wase', 'Bokkos'
  ],
  'Rivers': [
    'Abua/Odual', 'Ahoada East', 'Ahoada West', 'Akuku-Toru', 'Andoni', 'Asari-Toru', 
    'Bonny', 'Degema', 'Eleme', 'Emuoha', 'Etche', 'Gokana', 'Ikwerre', 'Khana', 
    'Obio/Akpor', 'Ogba/Egbema/Ndoni', 'Ogu/Bolo', 'Okrika', 'Omuma', 'Opobo/Nkoro', 
    'Oyigbo', 'Port Harcourt', 'Tai'
  ],
  'Sokoto': [
    'Binji', 'Bodinga', 'Dange Shuni', 'Gada', 'Goronyo', 'Gudu', 'Gwadabawa', 'Illela', 
    'Isa', 'Kebbe', 'Kware', 'Rabah', 'Sabon Birni', 'Shagari', 'Silame', 'Sokoto North', 
    'Sokoto South', 'Tambuwal', 'Tangaza', 'Tureta', 'Wamako', 'Wurno', 'Yabo'
  ],
  'Taraba': [
    'Ardo Kola', 'Bali', 'Donga', 'Gashaka', 'Gassol', 'Ibi', 'Jalingo', 'Karim Lamido', 
    'Kumi', 'Lau', 'Sardauna', 'Takum', 'Ussa', 'Wukari', 'Yorro', 'Zing'
  ],
  'Yobe': [
    'Bade', 'Bursari', 'Damaturu', 'Fika', 'Fune', 'Geidam', 'Gujba', 'Gulani', 'Jakusko', 
    'Karasuwa', 'Machina', 'Nangere', 'Nguru', 'Potiskum', 'Tarmuwa', 'Yunusari', 'Yusufari'
  ],
  'Zamfara': [
    'Anka', 'Bakura', 'Birnin Magaji/Kiyaw', 'Bukkuyum', 'Bungudu', 'Gummi', 'Gusau', 
    'Kaura Namoda', 'Maradun', 'Maru', 'Shinkafi', 'Talata Mafara', 'Chafe', 'Zurmi'
  ]
};

interface AddressData {
  street: string;
  lga: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  fullAddress: string;
}

interface AddressInputProps {
  value?: AddressData;
  onChange: (address: AddressData) => void;
  placeholder?: string;
  required?: boolean;
  className?: string;
  label?: string;
}

export default function AddressInput({
  value,
  onChange,
  placeholder = "Enter your address",
  required = false,
  className = "",
  label = "Address"
}: AddressInputProps) {
  const [formData, setFormData] = useState<AddressData>({
    street: '',
    lga: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'Nigeria',
    fullAddress: ''
  });

  const [showDropdown, setShowDropdown] = useState(false);
  const [showLgaDropdown, setShowLgaDropdown] = useState(false);
  const [filteredStates, setFilteredStates] = useState<string[]>([]);
  const [filteredLgas, setFilteredLgas] = useState<string[]>([]);
  const [filteredCities, setFilteredCities] = useState<string[]>([]);

  // Initialize form data from value prop
  useEffect(() => {
    if (value) {
      setFormData(value);
    }
  }, [value]);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.address-dropdown-container')) {
        setShowDropdown(false);
        setShowLgaDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Update full address when components change
  useEffect(() => {
    const fullAddress = [
      formData.street,
      formData.lga,
      formData.city,
      formData.state,
      formData.zipCode,
      formData.country
    ].filter(Boolean).join(', ');

    const updatedData = { ...formData, fullAddress };
    setFormData(updatedData);
    onChange(updatedData);
  }, [formData.street, formData.lga, formData.city, formData.state, formData.zipCode, formData.country]);

  const handleInputChange = (field: keyof AddressData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));

    // Filter states when typing
    if (field === 'state') {
      const filtered = Object.keys(NIGERIAN_STATES_LGAS).filter(state =>
        state.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredStates(filtered);
      setShowDropdown(true);
    }

    // Filter LGAs when typing
    if (field === 'lga' && formData.state) {
      const stateLgas = NIGERIAN_STATES_LGAS[formData.state as keyof typeof NIGERIAN_STATES_LGAS] || [];
      const filtered = stateLgas.filter(lga =>
        lga.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredLgas(filtered);
      setShowLgaDropdown(true);
    }

    // Filter cities when LGA is selected (for now, we'll use a simple city list)
    if (field === 'city' && formData.lga) {
      // For simplicity, we'll provide common city names
      const commonCities = ['Central', 'North', 'South', 'East', 'West', 'Main Town', 'Urban', 'Rural'];
      const filtered = commonCities.filter(city =>
        city.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCities(filtered);
    }
  };

  const selectState = (state: string) => {
    setFormData(prev => ({
      ...prev,
      state,
      lga: '', // Reset LGA when state changes
      city: '' // Reset city when state changes
    }));
    setShowDropdown(false);
    setFilteredLgas(NIGERIAN_STATES_LGAS[state as keyof typeof NIGERIAN_STATES_LGAS] || []);
    setFilteredCities([]);
  };

  const selectLga = (lga: string) => {
    setFormData(prev => ({
      ...prev,
      lga,
      city: '' // Reset city when LGA changes
    }));
    setShowLgaDropdown(false);
    setFilteredLgas([]);
    // Set common cities for the selected LGA
    setFilteredCities(['Central', 'North', 'South', 'East', 'West', 'Main Town']);
  };

  const selectCity = (city: string) => {
    setFormData(prev => ({
      ...prev,
      city
    }));
    setFilteredCities([]);
  };

  // Generate zip code based on state (simplified Nigerian postal code system)
  const generateZipCode = (state: string) => {
    const stateCodes: { [key: string]: string } = {
      'Lagos': '100001',
      'FCT': '900001',
      'Kano': '700001',
      'Rivers': '500001',
      'Oyo': '200001',
      'Kaduna': '800001',
      'Ogun': '110001',
      'Anambra': '420001',
      'Imo': '460001',
      'Plateau': '930001',
      'Cross River': '540001',
      'Abia': '440001',
      'Ondo': '340001',
      'Osun': '230001',
      'Delta': '320001',
      'Edo': '300001',
      'Akwa Ibom': '520001',
      'Enugu': '400001',
      'Bayelsa': '560001',
      'Nasarawa': '950001',
      'Kebbi': '860001',
      'Borno': '600001',
      'Niger': '920001',
      'Kwara': '240001',
      'Gombe': '760001',
      'Sokoto': '840001',
      'Zamfara': '880001',
      'Jigawa': '720001',
      'Bauchi': '740001',
      'Katsina': '820001',
      'Yobe': '620001',
      'Taraba': '660001',
      'Adamawa': '640001',
      'Kogi': '260001',
      'Benue': '970001',
      'Ebonyi': '480001',
      'Ekiti': '360001'
    };
    return stateCodes[state] || '000001';
  };

  useEffect(() => {
    if (formData.state) {
      const zipCode = generateZipCode(formData.state);
      setFormData(prev => ({
        ...prev,
        zipCode
      }));
    }
  }, [formData.state]);

  return (
    <div className={`space-y-4 ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}

      {/* Street Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Street Address <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          value={formData.street}
          onChange={(e) => handleInputChange('street', e.target.value)}
          placeholder="Enter street address (e.g., 123 Main Street, Apartment 4B)"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors"
          required={required}
        />
      </div>

      {/* State, LGA and City Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* State */}
        <div className="relative address-dropdown-container">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            State <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.state}
              onChange={(e) => handleInputChange('state', e.target.value)}
              placeholder="Select state"
              className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors"
              required={required}
              onFocus={() => {
                setFilteredStates(Object.keys(NIGERIAN_STATES_LGAS));
                setShowDropdown(true);
              }}
            />
            <FiChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-transform ${showDropdown ? 'rotate-180' : ''}`} />
          </div>
          
          {/* State Dropdown */}
          {showDropdown && filteredStates.length > 0 && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-y-auto">
              {filteredStates.map((state) => (
                <button
                  key={state}
                  type="button"
                  onClick={() => selectState(state)}
                  className="w-full px-3 py-2 text-left hover:bg-[#703BF7] hover:text-white focus:bg-[#703BF7] focus:text-white focus:outline-none transition-colors text-sm"
                >
                  {state}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* LGA */}
        <div className="relative address-dropdown-container">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Local Government Area <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              value={formData.lga}
              onChange={(e) => handleInputChange('lga', e.target.value)}
              placeholder={formData.state ? "Select LGA" : "Select state first"}
              className={`w-full px-3 py-2 pr-8 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors ${!formData.state ? 'bg-gray-50 cursor-not-allowed' : ''}`}
              required={required}
              disabled={!formData.state}
              onFocus={() => {
                if (formData.state) {
                  setFilteredLgas(NIGERIAN_STATES_LGAS[formData.state as keyof typeof NIGERIAN_STATES_LGAS] || []);
                  setShowLgaDropdown(true);
                }
              }}
            />
            <FiChevronDown className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 transition-transform ${showLgaDropdown ? 'rotate-180' : ''}`} />
          </div>
          
          {/* LGA Suggestions */}
          {filteredLgas.length > 0 && showLgaDropdown && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredLgas.map((lga) => (
                <button
                  key={lga}
                  type="button"
                  onClick={() => selectLga(lga)}
                  className="w-full px-3 py-2 text-left hover:bg-[#703BF7] hover:text-white focus:bg-[#703BF7] focus:text-white focus:outline-none transition-colors text-sm"
                >
                  {lga}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* City */}
        <div className="relative">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            City/Town <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={formData.city}
            onChange={(e) => handleInputChange('city', e.target.value)}
            placeholder={formData.lga ? "Enter city/town" : "Select LGA first"}
            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent transition-colors ${!formData.lga ? 'bg-gray-50 cursor-not-allowed' : ''}`}
            required={required}
            disabled={!formData.lga}
          />
          
          {/* City Suggestions */}
          {filteredCities.length > 0 && formData.city && (
            <div className="absolute z-20 w-full mt-1 bg-white border border-gray-300 rounded-md shadow-lg max-h-40 overflow-y-auto">
              {filteredCities.map((city) => (
                <button
                  key={city}
                  type="button"
                  onClick={() => selectCity(city)}
                  className="w-full px-3 py-2 text-left hover:bg-[#703BF7] hover:text-white focus:bg-[#703BF7] focus:text-white focus:outline-none transition-colors text-sm"
                >
                  {city}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Zip Code and Country Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Zip Code */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Postal Code
          </label>
          <input
            type="text"
            value={formData.zipCode}
            onChange={(e) => handleInputChange('zipCode', e.target.value)}
            placeholder="Postal Code"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#703BF7] focus:border-transparent bg-gray-50 transition-colors"
            readOnly
          />
          <p className="text-xs text-gray-500 mt-1">Auto-generated based on selected state</p>
        </div>

        {/* Country */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Country
          </label>
          <input
            type="text"
            value={formData.country}
            className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-600 transition-colors"
            readOnly
          />
        </div>
      </div>

      {/* Full Address Preview */}
      {formData.fullAddress && (
        <div className="p-4 bg-gradient-to-r from-[#703BF7]/5 to-[#703BF7]/10 border border-[#703BF7]/20 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-[#703BF7] rounded-full flex items-center justify-center flex-shrink-0">
              <FiMapPin className="w-4 h-4 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-gray-800 mb-1">Complete Address Preview:</p>
              <p className="text-sm text-gray-700 leading-relaxed break-words">{formData.fullAddress}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}