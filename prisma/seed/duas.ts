import { PrismaClient } from '@prisma/client';

export async function seedDuas(prisma: PrismaClient) {
  console.log('🤲 Seeding des duas...');

  // Créer les catégories de duas avec leurs couleurs spécifiques
  const duaCategories = [
    { name: 'Maison', color: '#3498db' },
    { name: 'Toilettes', color: '#e74c3c' },
    { name: 'Sommeil', color: '#9b59b6' },
    { name: 'Repas', color: '#2c3e50' },
    { name: 'Transport', color: '#8e44ad' },
    { name: 'Météo', color: '#17a2b8' },
    { name: 'Études', color: '#3498db' },
    { name: 'Vêtements', color: '#e67e22' },
    { name: 'Santé', color: '#e74c3c' },
    { name: 'Épreuves', color: '#8e44ad' },
    { name: 'Mort', color: '#2c3e50' },
    { name: 'Famille', color: '#27ae60' },
    { name: 'Mariage', color: '#e91e63' },
    { name: 'Voyage', color: '#f39c12' },
    { name: 'Vendredi', color: '#17a2b8' },
  ];

  const createdDuaCategories = [];
  for (const categoryData of duaCategories) {
    let category = await prisma.duaCategory.findFirst({
      where: { name: categoryData.name },
    });

    if (!category) {
      category = await prisma.duaCategory.create({
        data: {
          name: categoryData.name,
          color: categoryData.color,
        },
      });
      console.log(`✅ Catégorie dua créée: ${category.name}`);
    } else {
      // Mettre à jour la couleur si elle est différente
      if (category.color !== categoryData.color) {
        category = await prisma.duaCategory.update({
          where: { uuid: category.uuid },
          data: { color: categoryData.color },
        });
        console.log(`🎨 Couleur dua mise à jour pour: ${category.name}`);
      } else {
        console.log(`ℹ️ Catégorie dua existante: ${category.name}`);
      }
    }

    createdDuaCategories.push(category);
  }

  // Créer les duas
  const duas = [
    {
      title: 'En entrant à la maison',
      category: 'Maison',
      arabic:
        'بِسْمِ اللهِ وَلَجْنَا، وَبِسْمِ اللهِ خَرَجْنَا، وَعَلَى اللهِ رَبِّنَا تَوَكَّلْنَا',
      transliteration:
        "Bismi allahi walajna, wa bismi allahi kharajna, wa 'ala allahi rabbina tawakkalna",
      translation:
        "Au nom d'Allah nous entrons, au nom d'Allah nous sortons, et nous plaçons notre confiance en Allah, notre Seigneur.",
      reference: 'Abou Dawoud',
      color: '#3498db',
      image: 'en-entrant-maison',
    },
    {
      title: 'En sortant de la maison',
      category: 'Maison',
      arabic:
        'بِسْمِ اللهِ، تَوَكَّلْتُ عَلَى اللهِ، وَلَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللهِ',
      transliteration:
        "Bismi allahi, tawakkaltu 'ala allahi, wa la hawla wa la quwwata illa billah",
      translation:
        "Au nom d'Allah, je place ma confiance en Allah, et il n'y a de force ni de puissance qu'en Allah.",
      reference: 'Abou Dawoud, At-Tirmidhi',
      color: '#27ae60',
      image: 'en-sortant-maison',
    },
    {
      title: 'En entrant aux toilettes',
      category: 'Toilettes',
      arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
      transliteration:
        "Allahumma inni a'udhu bika min al-khubuthi wa al-khaba'ith",
      translation:
        'Ô Allah, je cherche refuge auprès de Toi contre les démons mâles et femelles.',
      reference: 'Al-Bukhari, Muslim',
      color: '#e74c3c',
      image: 'entrer-toilettes',
    },
    {
      title: 'En sortant des toilettes',
      category: 'Toilettes',
      arabic: 'غُفْرَانَكَ',
      transliteration: 'Ghufranaka',
      translation: 'Je demande Ton pardon.',
      reference: 'Abou Dawoud, At-Tirmidhi',
      color: '#f39c12',
      image: 'sortir-toilettes',
    },
    {
      title: 'Avant de dormir',
      category: 'Sommeil',
      arabic: 'بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا',
      transliteration: 'Bismika Allahumma amutu wa ahya',
      translation: 'En Ton nom, ô Allah, je meurs et je vis.',
      reference: 'Al-Bukhari',
      color: '#9b59b6',
      image: 'avant-dormir',
    },
    {
      title: 'Au réveil',
      category: 'Sommeil',
      arabic:
        'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
      transliteration:
        "Al-hamdu lillahi alladhi ahyana ba'da ma amatana wa ilayhi an-nushur",
      translation:
        'Louange à Allah qui nous a redonné la vie après nous avoir fait mourir, et vers Lui est la résurrection.',
      reference: 'Al-Bukhari',
      color: '#16a085',
      image: 'au-reveil',
    },
    {
      title: 'Avant de manger',
      category: 'Repas',
      arabic: 'بِسْمِ اللهِ',
      transliteration: 'Bismi Allah',
      translation: "Au nom d'Allah.",
      reference: 'Abou Dawoud, At-Tirmidhi',
      color: '#2c3e50',
      image: 'avant-manger',
    },
    {
      title: 'Après avoir mangé',
      category: 'Repas',
      arabic:
        'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مُسْلِمِينَ',
      transliteration:
        "Al-hamdu lillahi alladhi at'amana wa saqana wa ja'alana muslimin",
      translation:
        'Louange à Allah qui nous a nourris, abreuvés et nous a fait musulmans.',
      reference: 'Abou Dawoud, At-Tirmidhi',
      color: '#34495e',
      image: 'apres-manger',
    },
    {
      title: 'En montant en voiture',
      category: 'Transport',
      arabic:
        'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَى رَبِّنَا لَمُنْقَلِبُونَ',
      transliteration:
        'Subhan alladhi sakhkhara lana hadha wa ma kunna lahu muqrinin, wa inna ila rabbina la-munqalibun',
      translation:
        "Gloire à Celui qui a mis ceci à notre service alors que nous n'étions pas capables de les dompter. Et c'est vers notre Seigneur que nous retournerons.",
      reference: 'Abou Dawoud, At-Tirmidhi',
      color: '#8e44ad',
      image: 'en-voiture',
    },
    {
      title: 'Quand il pleut',
      category: 'Météo',
      arabic: 'اللَّهُمَّ صَيِّبًا نَافِعًا',
      transliteration: "Allahumma sayyiban nafi'an",
      translation: 'Ô Allah, (fais que ce soit) une pluie bénéfique.',
      reference: 'Al-Bukhari',
      color: '#17a2b8',
      image: 'pluie',
    },
    {
      title: 'Avant un examen',
      category: 'Études',
      arabic:
        'اللَّهُمَّ لَا سَهْلَ إِلَّا مَا جَعَلْتَهُ سَهْلًا وَأَنْتَ تَجْعَلُ الْحَزْنَ إِذَا شِئْتَ سَهْلًا',
      transliteration:
        "Allahumma la sahla illa ma ja'altahu sahlan, wa anta taj'alu al-hazna idha shi'ta sahlan",
      translation:
        "Ô Allah, rien n'est facile sauf ce que Tu rends facile, et Tu rends la tristesse facile si Tu veux.",
      reference: 'Ibn Hibban',
      color: '#3498db',
      image: 'avant-examen',
    },
    {
      title: 'Pour la concentration dans les études',
      category: 'Études',
      arabic:
        'رَبِّ اشْرَحْ لِي صَدْرِي وَيَسِّرْ لِي أَمْرِي وَاحْلُلْ عُقْدَةً مِنْ لِسَانِي يَفْقَهُوا قَوْلِي',
      transliteration:
        "Rabbi ashrah li sadri wa yassir li amri wahlul 'uqdatan min lisani yafqahu qawli",
      translation:
        "Mon Seigneur, ouvre-moi ma poitrine, facilite-moi ma mission, délie ma langue pour qu'ils comprennent ma parole.",
      reference: 'Coran 20:25-28',
      color: '#2980b9',
      image: 'concentration-etudes',
    },
    {
      title: "En s'habillant",
      category: 'Vêtements',
      arabic:
        'الْحَمْدُ لِلَّهِ الَّذِي كَسَانِي هَذَا وَرَزَقَنِيهِ مِنْ غَيْرِ حَوْلٍ مِنِّي وَلَا قُوَّةٍ',
      transliteration:
        'Al-hamdu lillahi alladhi kasani hadha wa razaqanihi min ghayri hawlin minni wa la quwwah',
      translation:
        "Louange à Allah qui m'a vêtu de ceci et me l'a accordé sans force ni puissance de ma part.",
      reference: 'Abou Dawoud, At-Tirmidhi',
      color: '#e67e22',
      image: 'en-shabillant',
    },
    {
      title: 'En enlevant ses vêtements',
      category: 'Vêtements',
      arabic: 'بِسْمِ اللهِ',
      transliteration: 'Bismi Allah',
      translation: "Au nom d'Allah.",
      reference: 'At-Tirmidhi',
      color: '#d35400',
      image: 'enlever-vetements',
    },
  ];

  for (const duaData of duas) {
    // Trouver la catégorie correspondante
    const category = createdDuaCategories.find(
      (cat) => cat.name === duaData.category,
    );

    if (!category) {
      console.error(`❌ Catégorie dua non trouvée: ${duaData.category}`);
      continue;
    }

    let dua = await prisma.dua.findFirst({
      where: { title: duaData.title },
    });

    if (!dua) {
      dua = await prisma.dua.create({
        data: {
          title: duaData.title,
          arabic: duaData.arabic,
          transliteration: duaData.transliteration,
          translation: duaData.translation,
          reference: duaData.reference,
          color: duaData.color,
          image: duaData.image,
          duaCategoryUuid: category.uuid,
        },
      });
      console.log(`✅ Dua créée: ${dua.title}`);
    } else {
      // Mettre à jour le dua existant
      dua = await prisma.dua.update({
        where: { uuid: dua.uuid },
        data: {
          arabic: duaData.arabic,
          transliteration: duaData.transliteration,
          translation: duaData.translation,
          reference: duaData.reference,
          color: duaData.color,
          image: duaData.image,
          duaCategoryUuid: category.uuid,
        },
      });
      console.log(`🔄 Dua mise à jour: ${dua.title}`);
    }
  }

  console.log('🤲 Seeding des duas terminé!');
}
