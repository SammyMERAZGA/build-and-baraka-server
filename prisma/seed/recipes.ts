import { PrismaClient } from '@prisma/client';

export async function seedRecipes(prisma: PrismaClient) {
  console.log('🍯 Seeding des recettes...');

  // Créer les catégories de recettes avec leurs couleurs spécifiques
  const categories = [
    { name: 'Guérison générale', color: '#4CAF50' }, // Vert - santé générale
    { name: 'Immunité', color: '#FF9800' }, // Orange - énergie et vitalité
    { name: 'Protection', color: '#2196F3' }, // Bleu - protection et sécurité
    { name: 'Guérison spirituelle', color: '#9C27B0' }, // Violet - spiritualité
    { name: 'Purification', color: '#00BCD4' }, // Cyan - purification et nettoyage
    { name: 'Soins externes', color: '#E91E63' }, // Rose - beauté et soins
    { name: 'Condiment médicinal', color: '#795548' }, // Marron - épices et condiments
    { name: 'Nutrition thérapeutique', color: '#FFC107' }, // Jaune doré - nutrition
  ];

  const createdCategories = [];
  for (const categoryData of categories) {
    let category = await prisma.recipeCategory.findFirst({
      where: { name: categoryData.name },
    });

    if (!category) {
      category = await prisma.recipeCategory.create({
        data: {
          name: categoryData.name,
          color: categoryData.color,
        },
      });
      console.log(`✅ Catégorie recette créée: ${category.name}`);
    } else {
      // Mettre à jour la couleur si elle est différente
      if (category.color !== categoryData.color) {
        category = await prisma.recipeCategory.update({
          where: { uuid: category.uuid },
          data: { color: categoryData.color },
        });
        console.log(`🎨 Couleur recette mise à jour pour: ${category.name}`);
      } else {
        console.log(`ℹ️ Catégorie recette existante: ${category.name}`);
      }
    }

    createdCategories.push(category);
  }

  // Créer les recettes
  const recipes = [
    {
      name: 'Miel',
      arabicName: 'عَسَل',
      category: 'Guérison générale',
      description:
        'Le miel est une guérison pour toutes les maladies selon le Coran et la Sunnah.',
      ingredients: ['Miel pur et naturel'],
      preparations: [
        'Prendre une cuillère à soupe de miel pur',
        'À consommer à jeun le matin',
        "Peut être dilué dans de l'eau tiède",
      ],
      hadithSource: 'Sahih al-Bukhari 5684',
      hadithText:
        "D'après Abou Said Al Khoudri (qu'Allah l'agrée), un homme est venu vers le Prophète (ﷺ) et a dit: Certes mon frère se plaint d'un mal de ventre. Le Prophète (ﷺ) lui a dit: « Fait lui boire du miel ». L'homme est revenu une deuxième fois alors le Prophète (ﷺ) lui a dit: « Fait lui boire du miel ». L'homme est revenu une troisième fois alors le Prophète (ﷺ) lui a dit: « Fait lui boire du miel ». Alors il est revenu et le Prophète (ﷺ) lui a dit: « Allah a dit vrai et le ventre de ton frère a menti. Fait lui boire du miel ». Alors il lui a donné du miel et il a guéri.",
      usage: ['À jeun le matin ou selon les besoins'],
      icon: 'water',
    },
    {
      name: 'Graines de nigelle',
      arabicName: 'حَبَّة البَرَكَة',
      category: 'Immunité',
      description:
        'La graine de nigelle (habba sawda) est un remède pour toutes les maladies sauf la mort.',
      ingredients: [
        '1 cuillère à café de graines de nigelle moulues',
        '1 cuillère à soupe de miel',
        'Eau tiède (optionnel)',
      ],
      preparations: [
        'Moudre finement les graines de nigelle',
        'Mélanger avec le miel',
        "Consommer directement ou diluer dans l'eau tiède",
      ],
      hadithSource: 'Sahih al-Bukhari 5688',
      hadithText:
        "Le Prophète (ﷺ) a dit : 'Dans la graine de nigelle, il y a une guérison pour toute maladie sauf as-sam (la mort).'",
      usage: ['1 fois par jour, de préférence le matin'],
      icon: 'leaf',
    },
    {
      name: "Dattes 'Ajwa",
      arabicName: 'تَمْر عَجْوَة',
      category: 'Protection',
      description:
        "Les dattes d'Ajwa de Médine offrent une protection contre la magie et le poison.",
      ingredients: ["7 dattes 'Ajwa de Médine"],
      preparations: [
        "Consommer 7 dattes 'Ajwa à jeun",
        'De préférence le matin',
        'Bien mastiquer et invoquer Allah',
      ],
      hadithSource: 'Sahih al-Bukhari 5445',
      hadithText:
        "Le Prophète (ﷺ) a dit : 'Celui qui mange le matin sept dattes d'Ajwa, rien ne pourra lui nuire ce jour-là, ni poison ni magie.'",
      usage: ['7 dattes chaque matin à jeun'],
      icon: 'nutrition',
    },
    {
      name: 'Eau de Zamzam',
      arabicName: 'مَاء زَمْزَم',
      category: 'Guérison spirituelle',
      description:
        "L'eau bénie de Zamzam est une guérison et une nourriture qui rassasie.",
      ingredients: ['Eau de Zamzam authentique'],
      preparations: [
        "Boire avec l'intention de guérison",
        'Réciter des invocations',
        'Faire face à la Qibla si possible',
      ],
      hadithSource: 'Sunan Ibn Majah 3062',
      hadithText:
        "Le Prophète (ﷺ) a dit : 'L'eau de Zamzam est efficace pour ce pour quoi elle est bue.'",
      usage: ['Selon les besoins avec une bonne intention'],
      icon: 'water-outline',
    },
    {
      name: 'Senna et Sanout',
      arabicName: 'سَنَا وسَنُّوت',
      category: 'Purification',
      description:
        'Mélange traditionnel pour la purification intestinale et la guérison.',
      ingredients: [
        'Feuilles de Senna séchées',
        'Graines de Sanout (fenouil)',
        'Eau chaude',
      ],
      preparations: [
        "Infuser les feuilles de Senna dans l'eau chaude",
        'Ajouter les graines de Sanout',
        'Laisser infuser 10-15 minutes',
        'Filtrer et boire tiède',
      ],
      hadithSource: 'Sunan at-Tirmidhi 2081',
      hadithText:
        "Le Prophète (ﷺ) a dit : 'Utilisez ces deux remèdes guérisseurs : le Senna et le Sanout.'",
      usage: ['En cure ponctuelle, ne pas dépasser 3 jours consécutifs'],
      icon: 'leaf-outline',
    },
    {
      name: 'Henné',
      arabicName: 'حِنَّاء',
      category: 'Soins externes',
      description:
        'Le henné est bénéfique pour les cheveux, les ongles et certains soins de la peau.',
      ingredients: [
        'Poudre de henné pure',
        'Eau tiède',
        "Huile d'olive (optionnel)",
      ],
      preparations: [
        "Mélanger la poudre de henné avec l'eau tiède",
        'Former une pâte lisse',
        "Ajouter quelques gouttes d'huile d'olive",
        "Appliquer selon l'usage souhaité",
      ],
      hadithSource: 'Sunan Abi Dawud 4166',
      hadithText:
        "D'après Aicha (qu'Allah l'agrée), une femme a tendu un livre qu'elle avait dans sa main au Prophète (ﷺ) depuis derrière un rideau. Le Prophète (ﷺ) a alors attrapé sa propre main et a dit: « Je ne sais pas si c'est la main d'un homme ou la main d'une femme ». Elle a dit: Plutôt d'une femme. Le Prophète (ﷺ) a dit: « Si tu étais une femme tu aurais changé la couleur de tes ongles ».",
      usage: ['Application externe selon les besoins'],
      icon: 'color-palette',
    },
    {
      name: 'Vinaigre',
      arabicName: 'خَلّ',
      category: 'Condiment médicinal',
      description:
        'Le vinaigre est un excellent condiment avec des propriétés thérapeutiques.',
      ingredients: [
        'Vinaigre de pomme naturel',
        'Eau (pour dilution si nécessaire)',
      ],
      preparations: [
        'Utiliser comme condiment avec les repas',
        "Peut être dilué dans l'eau",
        '1-2 cuillères à soupe par utilisation',
      ],
      hadithSource: 'Sahih Muslim 2052',
      hadithText:
        "Le Prophète (ﷺ) a dit : 'Quel excellent condiment que le vinaigre!'",
      usage: ["Avec les repas ou dilué dans l'eau"],
      icon: 'beaker',
    },
    {
      name: 'Lait de chamelle',
      arabicName: 'لَبَن النَّاقَة',
      category: 'Nutrition thérapeutique',
      description:
        'Le lait de chamelle est nutritif et possède des propriétés curatives uniques.',
      ingredients: ['Lait de chamelle frais'],
      preparations: [
        'Consommer frais si possible',
        'Peut être bu directement',
        'Conserver au frais',
      ],
      hadithSource: 'Sahih al-Bukhari 5686',
      hadithText:
        "Le Prophète (ﷺ) leur a ordonné de boire du lait de chamelle et de l'urine de chamelle, et ils ont été guéris.",
      usage: ['Selon la disponibilité et les besoins'],
      icon: 'beaker-outline',
    },
  ];

  for (const recipeData of recipes) {
    // Trouver la catégorie correspondante
    const category = createdCategories.find(
      (cat) => cat.name === recipeData.category,
    );

    if (!category) {
      console.error(`❌ Catégorie recette non trouvée: ${recipeData.category}`);
      continue;
    }

    let recipe = await prisma.recipe.findFirst({
      where: { name: recipeData.name },
    });

    if (!recipe) {
      recipe = await prisma.recipe.create({
        data: {
          name: recipeData.name,
          arabicName: recipeData.arabicName,
          description: recipeData.description,
          ingredients: recipeData.ingredients,
          preparations: recipeData.preparations,
          hadithSource: recipeData.hadithSource,
          hadithText: recipeData.hadithText,
          usage: recipeData.usage,
          icon: recipeData.icon,
          recipeCategoryUuid: category.uuid,
        },
      });
      console.log(`✅ Recette créée: ${recipe.name}`);
    } else {
      console.log(`ℹ️ Recette existante: ${recipe.name}`);
    }
  }

  console.log('🍯 Seeding des recettes terminé!');
}
